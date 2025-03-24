import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import HeroSection from "./pages/student/HeroSection";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AddCourses from "./pages/admin/Course/AddCourses";
import Dashboard from "./pages/admin/Dashboard";
import Sidebar from "./pages/admin/Sidebar";
import CourseTable from "./pages/admin/Course/CourseTable";
import EditCourses from "./pages/admin/Course/EditCourses";
import { Provider } from 'react-redux'
import store from "./app/store";
import Change_password from "./pages/Change_password";
import { PersistGate } from "redux-persist/integration/react";
import AddLecture from "./pages/admin/Lecture/AddLecture";
import EditLecture from "./pages/admin/Lecture/EditLecture";
import courseDetail from "./pages/student/courseDetail";
import Courses from "./pages/student/Courses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <Login /> },
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
