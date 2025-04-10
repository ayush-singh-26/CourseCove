import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer
} from "recharts";
import { MdAttachMoney, MdShoppingCart, MdPeople, MdTrendingUp } from "react-icons/md";
import { useGetAllUsersQuery } from "../../Feature/api/authApi";
import { useGetPurchasedCoursesQuery } from "../../Feature/api/purchaseApi";

function DashBoard() {
  const [activeUsers, setActiveUsers] = useState(0);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [chartData, setChartData] = useState([]);

  const { data: usersData } = useGetAllUsersQuery();
  const { data: purchasedCourseData } = useGetPurchasedCoursesQuery();
    
  useEffect(() => {
    if (usersData?.data) {
      setActiveUsers(usersData.data.length);
    }

    if (purchasedCourseData?.purchasedCourse) {
      setPurchasedCourses(purchasedCourseData.purchasedCourse);
      setTotalSales(purchasedCourseData.purchasedCourse.length);
      
      // Process data for charts
      processChartData(purchasedCourseData.purchasedCourse);
    }
  }, [usersData, purchasedCourseData]);

  const processChartData = (purchases) => {
    // Group by date and sum amounts for line chart
    const dailySales = purchases.reduce((acc, purchase) => {
      const date = new Date(purchase.createdAt).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += purchase.amount;
      return acc;
    }, {});

    const lineChartData = Object.keys(dailySales).map(date => ({
      date,
      revenue: dailySales[date]
    }));
    

    // Group by course for bar chart
    const courseSales = purchases.reduce((acc, purchase) => {
      const courseName = purchase.courseId?.courseTitle || 'Unknown Course';
      if (!acc[courseName]) {
        acc[courseName] = 0;
      }
      acc[courseName] += 1; // count of purchases
      return acc;
    }, {});
    console.log(courseSales);
    

    const barChartData = Object.keys(courseSales).map(course => ({
      course,
      purchases: courseSales[course]
    }));

    setChartData({
      lineData: lineChartData.slice(-7), // Last 7 days
      barData: barChartData.sort((a, b) => b.purchases - a.purchases).slice(0, 5) // Top 5 courses
    });
  };

  const totalRevenue = purchasedCourses.reduce((acc, element) => acc + element.amount, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Sales</p>
              <p className="text-2xl font-bold text-gray-800">{totalSales}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <MdShoppingCart size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800">${totalRevenue.toFixed(2)}</p>
            </div>
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <MdAttachMoney size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <p className="text-2xl font-bold text-gray-800">{activeUsers}</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <MdPeople size={24} />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <MdTrendingUp className="mr-1" /> 5.7% from last month
          </p>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Revenue Overview</h2>
            <select className="text-sm border rounded-md px-3 py-1 bg-gray-50">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData.lineData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Top Courses</h2>
            <select className="text-sm border rounded-md px-3 py-1 bg-gray-50">
              <option>Top 5</option>
              <option>Top 10</option>
              <option>All</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.barData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="course" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="purchases" fill="#82ca9d" name="Purchases" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;