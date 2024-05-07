import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null); // State to store the selected image file
  const [role, setRole] = useState("user"); // State to track selected role
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", image); // Append image file to the form data
        formData.append("role", role); // Append selected role to the form data

        const response = await axios.post("http://localhost:3001/register", formData, {
            headers: {
                "Content-Type": "multipart/form-data" // Set content type to multipart/form-data for file upload
            }
        });
        console.log(response.data);

        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          if (role === "admin") {
            navigate("/adminHome"); // Redirect to adminHome if role is admin
          } else {
            navigate("/Home");
          }
        } else {
          navigate("/signin");
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            if (error.response.data === "Email already exists") {
                // If email already exists in the database
                setError("Email already exists. Please choose a different email.");
            } else {
                // Other validation errors
                setError(error.response.data);
            }
        } else {
            console.error(error);
            setError("An error occurred. Please try again later.");
        }
    }
}

  return (
    <section  className="h-100 mt-5" style={{ backgroundColor: 'white' }}>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center ">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: '25px' }}>
              <div className="card-body">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-3 mx-1 mx-md-2 mt-2">Register</p>
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="role" className="form-label">Select Role:</label>
                        <div>
                          <input type="radio" id="user" name="role" value="user" checked={role === "user"} onChange={() => setRole("user")} />
                          <label htmlFor="user">User</label><br/>
                          <input type="radio" id="admin" name="role" value="admin" checked={role === "admin"} onChange={() => setRole("admin")} />
                          <label htmlFor="admin">Admin</label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div data-mdb-input-init className="form-outline flex-fill">
                          <input type="text" id="form3Example1c" className="form-control" onChange={(e) => setName(e.target.value)} />
                          <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div data-mdb-input-init className="form-outline flex-fill">
                          <input type="email" id="form3Example3c" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                          <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div data-mdb-input-init className="form-outline flex-fill">
                          <input type="password" id="form3Example4c" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                          <label className="form-label" htmlFor="form3Example4c">Password</label>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">Choose Profile Image</label>
                        <input className="form-control" type="file" id="formFile" onChange={(e) => setImage(e.target.files[0])} />
                      </div>
                      <div className="form-check d-flex justify-content-center mb-2">
                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                        <label className="form-check-label" htmlFor="form2Example3">
                          I agree all statements in <a href="#!">Terms of service</a>
                        </label>
                      </div>
                      <div className="d-flex justify-content-center mx-2 mb-4 mb-lg-2">
                        <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Register</button>
                      </div>
                    </form>
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <p>Already have an account? <Link to="/signin">Sign in</Link></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
