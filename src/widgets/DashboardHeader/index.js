/** @format */

import React, { useState } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { FaSearch, FaRegBell } from "react-icons/fa";
import { RiArrowDownSLine } from "react-icons/ri";
import { dashAvater, logo } from "../../assets/images";
import { Input } from "../../components/Input";
import "./DashboardHeader.css";

function DashboardHeader() {
  let history = useHistory();
  let location = useLocation();
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    history.push("/search/" + search);
  };

  return (
    <header className="dash py-4 mb-5">
      <nav className="dash-nav-container container d-xl-flex justify-content-between">
        <div className="dash-nav-logo">
          <Link to="/dashboard">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="dash-nav-items d-flex align-items-center">
          <h5>Courses</h5>
          <form onSubmit={handleSubmit}>
            <Input
              className="mb-5"
              placeholder="Search"
              icon={<FaSearch />}
              onChange={handleChange}
              value={search}
            />
          </form>
          <span id="dash-bell">
            <FaRegBell />
          </span>
          <div className="dash-user-icon d-flex">
            <span id="dash-toggle">
              <img
                src={dashAvater}
                alt="dash-avatar"
                className="dashimage"
                height="30"
                width="30"
              />
              <select
                name="dash-toogler"
                id="dash-toogler"
                onChange={(e) => {
                  let buttonSpecial = e.target.value;
                  if (buttonSpecial == "dashboard") {
                    history.push("/dashboard");
                  } else if (buttonSpecial == "settings") {
                    history.push("/user/editprofile");
                  } else if (buttonSpecial == "logout") {
                    history.push("/logout");
                  }
                }}
              >
                <option value="dashboard" className="toggle-options">
                  Dashboard
                </option>
                <option value="settings" className="toggle-options">
                  Settings
                </option>
                <option value="logout" className="toggle-options">
                  Logout
                </option>
              </select>
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
}

export { DashboardHeader };
