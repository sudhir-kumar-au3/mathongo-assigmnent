import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

function Dashboard() {
  const data = {
    name: null,
    role: null,
    email: null,
  };
  const [admin, setAdmin] = useState(data);
  useEffect(() => {
    let adminData = localStorage.getItem("user-details");
    adminData = JSON.parse(adminData);
    setAdmin({ ...adminData });
  }, []);

  const [isLoggedOut, setLoggedOut] = useState({
    logoutUser: false,
  });

  const handleLogout = () => {
    localStorage.clear("user-details");
    setLoggedOut({ ...isLoggedOut, logoutUser: true });
  };
  if (isLoggedOut.logoutUser) {
    return <Redirect to="/login"></Redirect>;
  }
  return (
    <div className="dashboard">
      <h2 className="text-dark text-capitalize font-weight-bolder p-1">
        Welcome {admin.name}
      </h2>
      <hr></hr>
      <ul className="list-group">
        <li className="list-group-item bg-dark text-white font-weight-bolder">
          <img
            src="https://img.icons8.com/officel/24/000000/menu.png"
            alt="menu"
          />
          &nbsp;Menu
        </li>
        <li className="list-group-item">
          <img
            src="https://img.icons8.com/ultraviolet/28/000000/home.png"
            alt="home"
          />
          <Link to="/adminHome">&nbsp;Home</Link>
        </li>
        <li className="list-group-item">
          <Link to="/addUser">&nbsp;Add new user</Link>
        </li>
        <li className="list-group-item">
          <button className="btn text-danger" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Dashboard;
