/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signupImage } from "../../../assets/images";
import { Input } from "../../../components/Input";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "./SignUp.css";
import { Button } from "../../../components/Button";
import { signUpReg } from "../../../api";
import { Loader } from "../../../components/Loader";
import { AuthHeader } from "../../../widgets/AuthHeader";

function SignUp() {
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "learner",
  });
  const [eye2, setEye2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numToogle, setNumToogle] = useState(1);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    let targetText = e.target.innerText;
    targetText === "Tutor" ? setNumToogle(0) : setNumToogle(1);
    setSignUpData({ ...signUpData, role: targetText.toLowerCase() });
    console.log(targetText.toLowerCase());
  };

  const handleSubmit = (e) => {
    signUpReg(e, signUpData, setLoading, setError, setSuccess);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSignUpData({ ...signUpData, [e.target.name]: value });
  };

  const handleEye2 = (e) => {
    setEye2((prevState) => !prevState);
  };
  return (
    <>
      <AuthHeader />
      <main className="container-fluid vh-100 signup-section">
        <section className="row h-100">
          <div className="col-md-7 d-flex justify-content-center align-items-center">
            <div className="card shadow w-c">
              <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && (
                  <div className="alert alert-success">{success}</div>
                )}
                <h2 className="fs-5">Create Account</h2>
                <hr className="mt-n5" />
                <div className="btn-container">
                  <Button
                    className={`btn btn-primary ${
                      numToogle === 0 ? "active" : ""
                    } w-50`}
                    text="Learner"
                    handleClick={handleClick}
                    disabled={loading}
                  />
                  <Button
                    className={`btn btn-primary ${
                      numToogle === 1 ? "active" : ""
                    } w-50`}
                    text="Tutor"
                    handleClick={handleClick}
                    disabled={loading}
                  />
                </div>
                <Input
                  type="text"
                  icon={<FaUser />}
                  placeholder="First Name"
                  name="firstName"
                  onChange={handleChange}
                  value={signUpData.firstName || ""}
                  disabled={loading}
                />
                <Input
                  type="text"
                  icon={<FaUser />}
                  placeholder="Last Name"
                  name="lastName"
                  onChange={handleChange}
                  value={signUpData.lastName || ""}
                  disabled={loading}
                />
                <Input
                  type="email"
                  icon={<FaEnvelope />}
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={signUpData.email || ""}
                  disabled={loading}
                />
                <Input
                  type={eye2 ? "text" : "password"}
                  icon={<FaLock />}
                  icon2={eye2 ? <FaEyeSlash /> : <FaEye />}
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  onEye={handleEye2}
                  value={signUpData.password || ""}
                  disabled={loading}
                />
                <p className="signup-p">
                  Use 8 or more characters with a mix of letters, number &
                  symbols
                </p>
                <Button
                  className="btn btn-primary w-100"
                  text={"Sign Up"}
                  loadingIcon={loading && <Loader />}
                  disabled={loading}
                />
                <p className="signup-p pt-2">
                  By signing up, you agree to our <span>Terms of Use</span> &
                  <span> Privacy Policy.</span>
                </p>
                <hr />
                <p className="signup-p">
                  Already have an account?{" "}
                  <span>
                    <Link to="/auth/login">Log In</Link>
                  </span>
                </p>
              </form>
            </div>
          </div>
          <div
            className="col-5 h-100 signup-image d-none d-md-block"
            style={{
              background: `url(${signupImage})`,
              backgroundRepeat: `no-repeat`,
              backgroundSize: `cover`,
            }}
          ></div>
        </section>
      </main>
    </>
  );
}

export { SignUp };
