/** @format */

import React, { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { DashboardHeader } from "../DashboardHeader";
import { Footer } from "../Footer";
import "./PaymentOption.css";
import axios from "axios";

function PaymentOption() {
	const [user, setUser] = useState({});
	const [courseImg, setCourseImg] = useState("");
	const [courseId, setCourseId] = useState("");
	const [course, setCourse] = useState("");
	const [price, setPrice] = useState({});

	useEffect(() => {
		const course = JSON.parse(localStorage.getItem("courses"));
		console.log(course);
		course.map((lesson) => {
			console.log(lesson);
			localStorage.setItem("courses", JSON.stringify(course));
			setCourse(lesson);
			setPrice(lesson.price);
			setCourseId(lesson._id);
			setUser(JSON.parse(localStorage.getItem("userDetails")));
			setCourseImg(lesson.image_url);
		});
	}, []);

	const handleOneTime = async () => {
		const { uid, lastName, firstName, email } = user.data;
		const data = {
			user_id: uid,
			lastName: lastName,
			firstName: firstName,
			course_id: courseId,
			email: email,
			paymentType: "one-time",
			amount: price.lifeTime,
		};

		console.log(data);

		// console.log(user);
		await axios
			.post(`https://cerebrum-v1.herokuapp.com/api/payment/new`, data)
			.then((res) => {
				console.log(res.data.data);
				window.location.assign(res.data.data);
			})
			.catch((err) => console.log(err.response));
	};

	const handleMonthly = async () => {
		const { uid, lastName, firstName, email } = user.data;
		const data = {
			user_id: uid,
			lastName: lastName,
			firstName: firstName,
			course_id: courseId,
			email: email,
			paymentType: "subscription",
			amount: price.subscription,
		};

		console.log(data);

		// console.log(user);
		await axios
			.post(`https://cerebrum-v1.herokuapp.com/api/payment/new`, data)
			.then((res) => {
				console.log(res.data.data);
				window.location.assign(res.data.data);
			})
			.catch((err) => console.log(err.response));
	};

	// console.log(user);
	return (
		<>
			<DashboardHeader />
			<main className="container">
				<h1 className="h2 fw-700 my-4"> Payment Options </h1>
				<section className="d-flex justify-content-between mb-5">
					<div className="shadow payment-option-section-div border-radius-12 bg-white">
						<div className="col-12 position-relative payment-option-price-div d-flex justify-content-center">
							<img src={courseImg} alt="dummy" width="100%" />
							<div className="payment-option-overlay position-absolute"></div>
							<h2 className="position-absolute payment-option-price text-white fw-700">₦ {price.lifeTime} </h2>
						</div>

						<div className="p-5 move-buy-btn-div">
							<div>
								<h1 className="h4 fw-700"> One time payment </h1>
								<p className="signup-p my-4 line-height-26">Pay one time and have a lifetime access to your paid courses.</p>
							</div>

							<div className="text-center my-2">
								<Button className="btn payment-option-btn py-2 px-3 fw-700" text={"Buy Course"} handleClick={handleOneTime} />
							</div>
						</div>
					</div>
					<div className="shadow payment-option-section-div border-radius-12 bg-white">
						<div className="position-relative payment-option-price-div d-flex justify-content-center">
							<img src={courseImg} alt="dummy" width="100%" />
							<div className="payment-option-overlay position-absolute"></div>
							<h2 className="position-absolute payment-option-price text-white fw-700">
								₦{price.subscription}/<span className="h3 fw-700">Month</span>
							</h2>
						</div>
						<div className="p-5">
							<h1 className="h4 fw-700"> Monthly Payment </h1>
							<p className="signup-p my-4 line-height-26">
								Easily create different plans and fee structures in more than 100 currencies. Enables customers to easily upgrade, pause, or cancel
								subscriptions and speed through checkout with just a few taps, on almost any device. This gives you access to your course once your
								subscription is active.
							</p>
							<div className="text-center my-2">
								<Button className="btn payment-option-btn py-2 px-3 fw-700" text={"Buy Course"} handleClick={handleMonthly} />
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}

export { PaymentOption };
