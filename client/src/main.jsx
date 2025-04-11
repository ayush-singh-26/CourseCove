import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import HeroSection from "./pages/student/HeroSection";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AddCourses from "./pages/admin/Course/AddCourses";
import Sidebar from "./pages/admin/Sidebar";
import CourseTable from "./pages/admin/Course/CourseTable";
import EditCourses from "./pages/admin/Course/EditCourses";
import { Provider } from 'react-redux'
import store from "./app/store";
import Change_password from "./pages/Change_password";
import { PersistGate } from "redux-persist/integration/react";
import AddLecture from "./pages/admin/Lecture/AddLecture";
import EditLecture from "./pages/admin/Lecture/EditLecture";
import Courses from "./pages/student/Courses";
import CourseDetail from "./pages/student/courseDetail";
import CourseProgress from "./pages/student/CourseProgress";
import SearchPage from "./pages/student/SearchPage";
import { AuthenticatedUser, ProtectedRoutes, RoleProtectedRoute } from "./components/ProtectedRoutes";
import DashBoard from "./pages/admin/DashBoard";
import My_Learning from "./pages/student/My_Learning";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, element: (
          <>
            <HeroSection />
            <Courses />
          </>
        )
      },
      { path: "login", element: <AuthenticatedUser><Login /></AuthenticatedUser> },
      { path: "my-profile", element: <ProtectedRoutes><Profile /></ProtectedRoutes> },
      { path: "change-password", element: <ProtectedRoutes><Change_password /></ProtectedRoutes> },
      { path: "course-detail/:courseId", element: <CourseDetail /> },
      { path: "course-progress/:courseId", element: <ProtectedRoutes><CourseProgress /></ProtectedRoutes> },
      { path: "course/search", element: <SearchPage /> },
      { path: "my-learning", element: <ProtectedRoutes><My_Learning /></ProtectedRoutes> },

    ],
  },
  {
    path: "/admin",
    element: (
      <RoleProtectedRoute roles={['Admin', 'Instructor']}>
        <Sidebar />,
      </RoleProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <DashBoard /> },
      { path: "course", element: <CourseTable /> },
      { path: "course/create", element: <AddCourses /> },
      { path: "course/:courseId", element: <EditCourses /> },
      { path: 'course/:courseId/lecture', element: <AddLecture /> },
      { path: 'course/:courseId/lecture/:lectureId', element: <EditLecture /> }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
