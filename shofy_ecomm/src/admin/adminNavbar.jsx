import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/shofylogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileImage, setProfileImage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Fetch profile image path if user is logged in
            axios.get("http://localhost:3001/profile", { headers: { Authorization: token } })
                .then(response => {
                    setProfileImage(response.data.image);
                })
                .catch(error => {
                    console.error("Error fetching profile image:", error);
                });
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
            setProfileImage('');
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    const renderAuthLink = () => {
        if (isLoggedIn) {
            return (
                <Link className="nav-item nav-link" style={{ paddingRight: "1vw" }} to="/" onClick={handleLogout}>
                    Logout
                </Link>
            );
        } else {
            return (
                <Link className="nav-item nav-link" to="/">
                    <FontAwesomeIcon icon={faUser} />
                </Link>
            );
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow p-3 mb-3 bg-body rounded ">
            <div className="container ">
                <Link className="navbar-brand" to="/">
                    <img src={logo} height="40px" width="80px" alt="Shofy Logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-nav ">
                 <span> Admin panel</span>
                </div>
               
                <div className="navbar-nav ">
                    {renderAuthLink()}
                    {profileImage && <img className="profile-image" src={profileImage} alt="Profile" style={{ paddingLeft: "1vw" }} />}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
