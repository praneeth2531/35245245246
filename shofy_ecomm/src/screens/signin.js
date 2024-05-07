import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (alertVisible) {
      timer = setTimeout(() => {
        setAlertVisible(false);
      }, 10000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [alertVisible]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/login", { email, password })
      .then(result => {
        if (result.data.token) {
          setAlertVisible(true);
          localStorage.setItem("token", result.data.token);
          const role = result.data.role; // Get the role from the response
          if (role === "admin") {
              navigate("/adminHome"); // Redirect to adminHome if role is admin
          } else {
              navigate("/Home"); // Redirect to Home for other roles
          }
      } else {
          setError("Invalid email or password. Please try again.");
      }})
      .catch(error => {
        console.error("Error:", error);
        setError("An error occurred. Please try again later.");
      });
  }

  return (
    <section className="vh-100" style={{ backgroundColor: '#eee' }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: '25px' }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    {alertVisible && (
                      <div className="alert alert-success" role="alert">
                        Login successful!
                      </div>
                    )}
                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                        <label className="form-label">Email address</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                        <label className="form-label">Password</label>
                      </div>
                      <div className="pt-1 mb-4">
                        <button className="btn btn-primary btn-lg" type="submit">Login</button>
                      </div>
                    </form>
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <p>Don't have an account? <Link to="/register">Sign up</Link></p>
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

export default Signin;
