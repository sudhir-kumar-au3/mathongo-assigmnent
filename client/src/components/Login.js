import React, { useState} from "react";
import {useHistory} from "react-router-dom";
import baseApi from "../apiConfig";
const formValid = (formError, loginData) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formError).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(loginData).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};
function Login() {
  const userData = {
    email: "",
    password: "",
  };
  const errors = {
    email: "",
    password: "",
  };
  const [loginData, setLoginData] = useState(userData);
  const [formError, setFormError] = useState(errors);
  const history = useHistory();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formError = { ...errors };

    switch (name) {
      case "email":
        formError.email = !loginData.email ? "invalid email address" : "";
        break;
      case "password":
        formError.password = !loginData.password
          ? "Enter a valid password"
          : "";
        break;
      default:
        break;
    }
    setLoginData({ ...loginData, [name]: value });
    setFormError({ ...formError });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValid(formError, loginData)) {
      baseApi
        .post("/user/login", loginData)
        .then((res) => {
          let user = {
            name: res.data.data.name,
            role: res.data.data.role,
            email: res.data.data.email,
          };
          localStorage.setItem("user-details", JSON.stringify(user));
          if(res.data.data.role === 'admin' ){
              history.push('/adminHome')
          }
          else{
              history.push('/userHome')
          }
        })
        .catch((error) => {
          alert("Unauthorized Login Attempt!");
        });
    } else {
      alert("Invalid Form!");
    }
  };

  return (
    <div className="container-fluid p-5 bg-light" style={{ height: "100vh" }}>
      <div className="row my-3">
        <div className="col-md-3"></div>
        <div className="col-md-6 p-3 mt-5">
          <h1 className="font-weight-bolder text-center">Login</h1>
          <br></br>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className={
                  formError.email.length > 0
                    ? "form-control is-invalid"
                    : "form-control alert alert-success"
                }
                type="email"
                name="email"
                placeholder="Enter Email"
                onChange={handleChange}
                required
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                className={
                  formError.password.length > 0
                    ? "form-control is-invalid"
                    : "form-control alert alert-success"
                }
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
                required
              ></input>
            </div>
            <div className="createAccount">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
}

export default Login;
