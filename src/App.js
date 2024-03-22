import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login"
import Signup from "./pages/Signup";
import OpenRoute from "./components/core/Auth/OpenRoute";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from "./pages/Error"
import Setting from "./pages/Setting";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./pages/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import MyCourses from "./pages/MyCourses";
import AddCourse from "./pages/AddCourse";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";

function App() {
  const {user} = useSelector((state)=>state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path ="/" element={<Home/>} />
        <Route path="catalog/:catalogName" element={<Catalog/>} />
        <Route path="courses/:courseId" element={<CourseDetails/>} />

        <Route path="login" element={
          <OpenRoute>
            <Login/>
          </OpenRoute>
        }/>

        <Route path="signup" element={
          <OpenRoute>
            <Signup/>
          </OpenRoute>
        }/>

        <Route path="forgot-password" element={
          <OpenRoute>
            <ForgotPassword/>
          </OpenRoute>
        } />

        <Route path="update-password/:id" element={
          <OpenRoute>
            <UpdatePassword/>
          </OpenRoute>
        } />

        <Route path="verify-email" element={
          <OpenRoute>
            <VerifyEmail/>
          </OpenRoute>
        } />

        <Route path="about" element={<About/>} />

        <Route path="contact" element={<Contact/>} />

        <Route
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile/>} />
          <Route path="dashboard/settings" element={<Setting/>} />

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>} />
                <Route path="dashboard/cart" element={<Cart/>} />
              </>
            )
          }

          {
            user?.accountType ===ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="course/my-courses" element={<MyCourses/>} />
                <Route path="dashboard/add-course" element={<AddCourse/>} />
                <Route path="dashboard/edit-course/:courseId" element={<EditCourse/>} />
              </>
            )
          }
        </Route>

        <Route path="*" element={<Error/>} />
      </Routes>
    </div>
  );
}

export default App;
