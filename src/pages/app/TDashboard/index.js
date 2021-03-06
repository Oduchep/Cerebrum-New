/** @format */
import { Link, Redirect, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  dashAvater,
  dashboardImg,
  dashImg,
  ellipsesvg1,
  ellipsesvg2,
} from "../../../assets/images";
import { CourseList } from "../../../components/CourseList";
import { DashboardHeader } from "../../../widgets/DashboardHeader";
import { Footer } from "../../../widgets/Footer";
import "./TDashboard.css";
import axios from "axios";

// Api Call to get Authorized User
const TDashboard = () => {
  const history = useHistory();
  const [user, setUser] = useState([]);
  const [role, setRole] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [courses, setCourses] = useState([]);
  const [courseCount, setCourseCount] = useState(0);
  const [data, setData] = useState();
  const [lcourse, setLcourse] = useState({});
  const [lcourseCount, setLcourseCount] = useState();

  // Get login details from Local Storage
  useEffect(() => {
    const data = localStorage.getItem("userDetails");
    if (!data) {
      history.push("/auth/login");
    }
    const userData = JSON.parse(data);
    const token = userData.data.token;
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const userId = userData.data.uid;
    axios
      .get(`https://cerebrum-v1.herokuapp.com/api/user/${userId}`, config)
      .then((res) => {
        console.log("res value", res.data);
        setUser(res.data.data);
        setRole(res.data.data.role);
      })
      .catch((err) => {
        history.push("/auth/login");
      });
  }, []);

  useEffect(async () => {
    if (user.role === "tutor") {
      await axios
        .get(`https://cerebrum-v1.herokuapp.com/api/tutor/course/${user._id}`)
        .then((res) => {
          setCourseCount(res.data.data.length);
          setCourses(res.data.data);
        })
        .catch((err) => console.log(err.response));
    }
  }, []);

  useEffect(() => {
    const learner = JSON.parse(localStorage.getItem("userDetails"));
    // console.log(user)
    axios
      .get(`https://cerebrum-v1.herokuapp.com/api/payment/${learner.data.uid}`)
      .then((res) => {
        console.log(res.data.data);
        const stcourses = res.data.data;
        setLcourseCount(stcourses.length);
        setLcourse(stcourses[0]);
        console.log(stcourses[0]);
      })
      .catch((err) => console.log(err.response));
  }, []);

  const sendToCourse = () => {
    window.location.assign(`/learner/viewcourse/?id=${lcourse.course_id._id}`);
  };

  return (
    <>
      <DashboardHeader />
      <section className="container container-fluid tdashboard">
        <div
          className="row shadow mx-auto mt-4"
          style={{
            width: "80%",
            borderRadius: "15px",
          }}
        >
          <div className="col-md-8 align-items-center">
            <div className="card p-5 border-0">
              <div className="container">
                <header>
                  <h1 className="font-bold">Welcome {user.firstName}</h1>
                </header>
                <article>
                  Welcome to your Cerebrum dashboard. Cerebrum provides you with
                  boundless access to courses if you are a student, and an
                  opportunity to earn as a tutor.
                </article>
                <div className="d-flex flex-wrap justify-content-start my-3">
                  {role === "tutor" ? (
                    <>
                      <button className="btn btn-primary">
                        <Link to="/dashboard/tutor/addcourse">Add Course</Link>
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-primary text-light">
                        <Link
                          to="/courses"
                          // style={{ color: "#f4f4f4", textDecoration: "none" }}
                        >
                          Buy Course
                        </Link>
                      </button>
                      <button className="btn btn-outline-primary ms-3">
                        <a href="https://res.cloudinary.com/codeangelic/image/upload/v1613063242/Cerebrum_WebApp.pdf">
                          Download User Manual
                        </a>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* <div className='col-md-4 align-items-center'> */}

          <div className="col-4 d-none d-md-block d-flex align-items-center mt-5">
            <img
              src={dashImg}
              className="bg-warning rounded-circle shadow img-fluid"
              alt="cerebrum"
            />
          </div>
        </div>
        {/*  SECOND SECTION */}

        <section className="row my-4 mx-auto mt-5 gx-5 container">
          {/* LEARNERS COURSE */}
          {role === "learner" ? (
            <div className="col-md-6 p-4 card shadow mb-sm-5">
              {lcourse.course_id && (
                <div className="row align-items-center gx-5">
                  <div className="col-md-5">
                    <img
                      src={lcourse.course_id.image_url}
                      alt="course Image"
                      className="image-fluid"
                    />
                  </div>
                  <div className="col-md-5 offset-2">
                    <h5 className="font-bold">{lcourse.course_id.name}</h5>
                    <p>By {user.lastName}</p>
                    {/* <p>{lcourse.course_id.description}</p> */}
                    <p>
                      <button
                        className="btn-warning text-light"
                        onClick={sendToCourse}
                      >
                        Continue Course
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            //   TUTORS COURSE
            <div className="col-md-6 card py-5 shadow">
              {courses.length > 0 ? (
                <>
                  {/* IF COURSE IS AVAILABLE */}
                  <div className="row align-items-center">
                    {courses.map((course, index) => (
                      <>
                        <CourseList
                          courseName={course.name}
                          courseDesc={course.description}
                          courseImg={course.image_url}
                          key={index}
                        />
                      </>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {/* IF COURSE IS NOT AVAILABLE */}
                  <div className="d-flex align-items-center justify-content-center mt-5">
                    <p>Number of Courses Uploaded</p>
                  </div>
                </>
              )}
            </div>
          )}
          {/* <div className='col-md-1'>&nbsp;</div> */}
          <div className="col-md-6">
            {/* metrics d-flex flex-wrap flex-column */}
            {role === "tutor" && courses.length === 0 ? (
              <>
                {/* Render If Role is Tutor */}
                <div className="card py-4 h-60 shadow mb-3">
                  <div className="container">
                    <div className="row">
                      {/* mx-auto justify-items-between */}
                      <div className="col-md-6">
                        <div>
                          <h1
                            style={{ fontSize: "50px", fontWeight: "600" }}
                            className="text-primary text-center"
                          >
                            {courses.length}
                          </h1>
                          <p className="text-center">
                            Number Of Courses Uploaded
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="d-flex justify-content-center align-item-center">
                          <img src={ellipsesvg1} alt="ellipse svg images" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card p-4 h-60 shadow">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <div>
                          {role === "tutor" && courses.length > 0 ? (
                            <>
                              <h1
                                style={{ fontSize: "50px", fontWeight: "600" }}
                                className="text-primary text-center"
                              >
                                {courses.length}
                              </h1>
                              <p className="text-center">Courses Uploaded</p>
                            </>
                          ) : (
                            <>
                              {/* Render if role is Student */}
                              <h1
                                style={{ fontSize: "50px", fontWeight: "600" }}
                                className="text-primary text-center"
                              >
                                0
                              </h1>
                              <p className="text-center">
                                Number Of Students Registered
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="d-flex align-item-center justify-content-center">
                          <img src={ellipsesvg2} alt="ellipse svg images" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="card py-4 h-60 shadow mb-3">
                  <div className="container">
                    <div className="row">
                      {/* mx-auto justify-items-between */}
                      <div className="col-md-6">
                        <div>
                          {lcourseCount > 0 ? (
                            <>
                              <h1
                                style={{ fontSize: "50px", fontWeight: "600" }}
                                className="text-primary text-center"
                              >
                                {lcourseCount}
                              </h1>
                              <p className="text-center">
                                Number Of Courses Enrolled
                              </p>
                            </>
                          ) : (
                            <p className="text-center">
                              Number Of Courses Enrolled
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-item-center justify-content-center">
                          <img src={ellipsesvg1} alt="ellipse svg images" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card p-4 h-60 shadow">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <div>
                          <h1
                            style={{ fontSize: "50px", fontWeight: "600" }}
                            className="text-primary text-center"
                          >
                            0
                          </h1>
                          <p className="text-center">
                            Number Of Courses Completed
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="d-flex align-item-center justify-content-center">
                          <img src={ellipsesvg2} alt="ellipse svg images" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
  // } else {
  // return <Redirect to='/login' />;
  // }
};
export { TDashboard };
