/** @format */

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./components/App";
import { Dashboard } from "./pages/app/Dashboard";
import { DashboardHeader } from "./widgets/DashboardHeader";
import { Footer } from "./widgets/Footer";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <App /> */}

      <DashboardHeader />
      <Dashboard />
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
