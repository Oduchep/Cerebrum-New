/** @format */

import React from "react";
import { Switch, Route } from "react-router-dom";
import { LandingPage } from "../pages/app/LandingPage";
import { ForgotPassWord } from "../pages/auth/ForgotPassword";
import { Login } from "../pages/auth/Login";
import { SignUp } from "../pages/auth/SignUp";
import { VerifyEmail } from "../pages/auth/VerifyEmail";
// import { Dashboard } from "../pages/app/Dashboard";
import { TDashboard } from "../pages/app/TDashboard";
import { WatchCourse } from "../pages/app/WatchCourse";
import "./App.css";
import { EmailVerify } from "../pages/auth/EmailVerify";
import { AddCourses } from "../pages/app/AddCourses";
// import { signIn } from "../api/index";
import { Courses } from "../pages/app/Courses";
import { TutorAddCourse } from "../pages/app/TutorAddCourse";
import { Logout } from "../pages/app/Logout";
import { PaymentSuccessful } from "../widgets/PaymentSuccessful";
import { TutorProfileSettings } from "../pages/app/TutorProfileSettings";

function App() {
	return (
		<div className="App">
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/forgotpassword" component={ForgotPassWord} />
				<Route path="/verifyemail" component={VerifyEmail} />
				<Route path="/signup" exact component={SignUp} />
				<Route path="/dashboard/tutor/addcourse" exact component={AddCourses} />
				<Route exact path="/tdashboard" component={TDashboard} />
				<Route path="/verify-email" component={EmailVerify} />
				<Route path="/watchcourse" component={WatchCourse} />
				<Route path="/forgotpassword" component={ForgotPassWord} />
				<Route path="/login" component={Login} />
				<Route path="/signup" component={SignUp} />
				<Route path="/forgotpassword" component={ForgotPassWord} />

				<Route path="/watchcourse" component={WatchCourse} />
				<Route path="/" exact component={LandingPage} />
				<Route path="/tutoraddcourse" component={TutorAddCourse} />
				<Route path="/courses" component={Courses} />
				<Route path="/logout" component={Logout} />
				<Route path="/user/course/payment/success" component={PaymentSuccessful} />
				<Route path="/user/editprofile" component={TutorProfileSettings} />
			</Switch>
		</div>
	);
}

export default App;
