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
import Courses from "./pages/student/Courses";
import CourseDetail from "./pages/student/courseDetail";
import CourseProgress from "./pages/student/CourseProgress";
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
      { path: "login", element: <Login /> },
      { path: "my-profile", element: <Profile /> },
      { path: "change-password", element: <Change_password /> },
      { path: "course-detail/:courseId", element: <CourseDetail /> },
      { path: "course-progress/:courseId", element: <CourseProgress /> },
    ],
  },
  {
    path: "/admin",
    element: <Sidebar />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
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
