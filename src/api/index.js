import axios from "axios";

export const signUpReg = (e, state, setLoadState) => {
	e.preventDefault();

	setLoadState(true);
	let currentState = state;
	console.log(currentState);

	axios
		.post(`https://cerebrum-v1.herokuapp.com/api/auth/sign-up`, currentState)
		.then((res) => {
			console.log(res.data);
			setLoadState(false);
		})
		.catch(() => {
			console.log("Error Occured");
			setLoadState(false);
		});
};

export const getCategories = (stateFunction) => {
	axios(`https://cerebrum-v1.herokuapp.com/api/category`).then((res) => {
		stateFunction(res.data.data);
	});
};

/// Login Api
export const signIn = (e, user, setUser, setLoadState) => {
	e.preventDefault();
	setLoadState(true);
	const data = {
		email: user.email,
		password: user.password,
	};

	axios
		.post("https://new-cerebrum.herokuapp.com/api/auth/sign-in", data)
		.then((res) => {
			console.log(res.data);
			const token = res.data.token;
			localStorage.setItem("token", token);
			setLoadState(false);
		})
		.catch((err) => {
			console.log("there is an error logging in", err);
			setLoadState(false);
		});
};

//Courses Api
export const getCourses = (courses, setCourses) => {
	const data = courses;
	const course_id = "6012ea1b057ae600157c2902";

	axios
		.get(`https://cerebrum-v1.herokuapp.com/api/course/view/${course_id}`, data)
		.then((res) => {
			courses = res.data.data;
			setCourses(res.data.data);
		})
		.catch((err) => {
			console.log("There is an error loading files", err.response);
		});
};
