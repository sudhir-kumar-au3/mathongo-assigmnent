import React,{useState} from 'react'
import baseApi from '../apiConfig'
const formValid = (formError, formData) => {
    let valid = true;
  
    // validate form errors being empty
    Object.values(formError).forEach(val => {
      val.length > 0 && (valid = false);
    });
  
    // validate the form was filled out
    Object.values(formData).forEach(val => {
      val === null && (valid = false);
    });
  
    return valid;
  };
function AddUser() {
    const userData = {
        name: null,
        email: null,
        password: null,
      };
      const errors = {
        name: "",
        email: "",
        password: "",
      };
      const [formData, setFormData] = useState(userData);
      const [formError, setFormErrors] = useState(errors);
      const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let formError = { ...errors };
    
        switch (name) {
            case "name":
                formError.name = !formData.name ? "Enter a valid name" : "";
                break;
          case "email":
            formError.email = !formData.email ? "invalid email address" : "";
            break;
          case "password":
            formError.password = !formData.password
              ? "Enter a valid password"
              : "";
            break;
          default:
            break;
        }
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formError });
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        if (formValid(formError, formData)) {
          baseApi
            .post("/user/register", formData)
            .then((res) => {
              alert("user added")
            })
            .catch((error) => {
              alert("Unauthorized Attempt!");
            });
        } else {
          alert("Invalid Form!");
        }
      };
    return (
        <div>
             <h1 className='mt-3 p-2'>Add new User</h1><hr></hr>
             <br></br>
          <form onSubmit={handleSubmit}>
          <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                className={
                  formError.email.length > 0
                    ? "form-control is-invalid"
                    : "form-control alert alert-success"
                }
                type="name"
                name="name"
                placeholder="Enter name"
                onChange={handleChange}
                required
              ></input>
            </div>
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
              <button type="submit">Add User</button>
            </div>
          </form>
        </div>
    )
}

export default AddUser
