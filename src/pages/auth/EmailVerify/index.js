/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
const EmailVerify = () => {
  let url_string = window.location.href;
  let url = new URL(url_string);
  let url_params_uid = url.searchParams.get("uid");
  const url_params_verifyToken = url.searchParams.get("verifyToken");
  const uid = url_params_uid;
  const verifyToken = url_params_verifyToken;
  console.log(uid, verifyToken);
  useEffect(() => {
    axios
      .post(
        `https://cerebrum-v1.herokuapp.com/api/auth/verify-email/?uid=${uid}&verifyToken=${verifyToken}`
      )
      .then((res) => {
        if (res.data.message === "Email verified successfully") {
          window.open("/auth/login?msg=success", "_self");
        }
      })
      .catch((err) => {
        // if (err.response.data.message === "Email is already verified") {
        //   window.open("/login?msg=verified", "_self");
        console.log(err.response);
      });
  }, []);

  return <div>&nbsp;</div>;
};

export { EmailVerify };
