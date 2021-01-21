import React from "react";
import { loginImage } from "../../../assets/images";
import { Input } from "../../../components/Input";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Button } from "../../../components/Button";
import { useState } from "react";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };
  return (
    <main className="vh-100 container-fluid login-section">
      <section className="row h-100">
        <div className="col-6 d-flex justify-content-center align-items-center">
          <div className="card shadow w-c">
            <form onSubmit={handleSubmit}>
              <h2 className="font-weight-bold text-center">Login</h2>
              <hr className="mt-n5" />
              <Input
                type="email"
                icon={<FaEnvelope />}
                placeholder="Enter Email"
                onChange={handleChange}
                value={user.email}
                name="email"
              />
              <Input
                type="password"
                icon={<FaLock />}
                placeholder="Enter Password"
                onChange={handleChange}
                value={user.password}
                name="password"
              />

              <Button className="btn btn-primary w-100" text="Login" />

              <hr />
              <p className="signup-p">
                New Member? <a href="#">Sign Up</a>
              </p>
            </form>
          </div>
        </div>
        <div
          className="col-6 bg-danger h-100 signup-image"
          style={{ background: `url(${loginImage})` }}
        ></div>
      </section>
    </main>
  );
};
export { Login };
