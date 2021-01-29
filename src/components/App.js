import React from "react";
import { Switch, Route } from "react-router-dom";
import { ForgotPassWord } from "../pages/auth/ForgotPassword";
import { Login } from "../pages/auth/Login";
import { SignUp } from "../pages/auth/SignUp";
import { VerifyEmail } from "../pages/auth/VerifyEmail";
import { Dashboard } from "../pages/app/Dashboard";
import { TDashboard } from "../pages/app/TDashboard";
import { WatchCourse } from "../pages/app/WatchCourse";
import "./App.css";
import { EmailVerify } from "../pages/auth/EmailVerify";
import { AddCourses } from "../pages/app/AddCourses";
import { Courses } from "../pages/app/Courses";
import { TutorAddCourse } from "../pages/app/TutorAddCourse";

function App() {
	return (
		<div className="App">
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/forgotpassword" component={ForgotPassWord} />
				<Route path="/verifyemail" component={VerifyEmail} />
				<Route path="/signup" exact component={SignUp} />
				<Route path="/dashboard/tutor/addcourse" exact component={AddCourses} />
				<Route path="/" exact component={Dashboard} />
				<Route path="/tdashboard" exact component={TDashboard} />
				<Route path="/verify-email" component={EmailVerify} />
				<Route path="/watchcourse" component={WatchCourse} />
				<Route path="/login" component={Login} />
				<Route path="/forgotpassword" component={ForgotPassWord} />
				<Route path="/courses" component={Courses} />
				<Route path="/tutoraddcourse" component={TutorAddCourse} />
			</Switch>
		</div>
	);
}

export default App;
