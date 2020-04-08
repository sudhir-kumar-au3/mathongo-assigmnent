import React, {useState,useEffect} from 'react'
import {NavLink, Redirect} from "react-router-dom"
function UserHome() {
    const data = {
        name: null,
        role: null,
        email: null,
      };
      const [user, setUser] = useState(data);
      useEffect(() => {
        let basicUserData = localStorage.getItem("user-details");
        basicUserData = JSON.parse(basicUserData);
        setUser({ ...basicUserData });
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
            Welcome {user.name}
          </h2>
          <hr></hr>
          <ul className="list-group">
            
            <li className="list-group-item">
              <img
                src="https://img.icons8.com/ultraviolet/28/000000/home.png"
                alt="home"
              />
              <NavLink to="/app/userHome">&nbsp;Home</NavLink>
            </li>
            <li className='list-group-item'>
               Email Id:  {user.email}
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

export default UserHome
