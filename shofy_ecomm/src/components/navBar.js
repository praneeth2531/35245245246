import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/shofylogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faUser, faSort } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCart } from '../reducers/CartContext';
import axios from "axios";

function Navbar() {
    const { state } = useCart();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileImage, setProfileImage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Fetch profile image path if user is logged in
            axios.get("http://localhost:3001/profile", { headers: { Authorization: token } })
                .then(response => {
                    console.log(response.data.image)
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

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (value.toLowerCase() === 'men') {
            setSuggestions(['Mens Shoes', 'Mens Shirts', 'Mens Pants']);
        } else if (value.toLowerCase() === 'women') {
            setSuggestions(['Womens Shoes', 'Womens Tops', 'Womens Dresses']);
        } else {
            setSuggestions([]);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.toLowerCase() === 'men') {
            window.location.href = '/mens';
        } else if (searchQuery.toLowerCase() === 'women') {
            window.location.href = '/womens';
        } else if (searchQuery.toLowerCase() === 'kids') {
            window.location.href = '/kids';
        } else if (searchQuery.toLowerCase() === 'shoe') {
            window.location.href = '/shoes';
        }
        setSearchQuery('');
        setSuggestions([]);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    const renderAuthLink = () => {
        if (isLoggedIn) {
            return (
                <Link className="nav-item nav-link "style={{paddingRight:"1vw" }} to="/" onClick={handleLogout}>
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
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow p-3 mb-5 bg-body rounded">
            <div className="container ">
                <Link className="navbar-brand" to="/">
                    <img src={logo} height="40px" width="80px" alt="Shofy Logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item dropdown">
                       <Link to="/" className="text-decoration-none">    <a className="nav-link dropdown-toggle hover" href="/Home" id="navbarDropdown"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Home
                            </a>
                            </Link> 
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/mens"> Mens</Link>
                                <Link className="dropdown-item" to="/womens">Womens</Link>
                                <Link className="dropdown-item" to="/kids">kids</Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Shop
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/shoes">Shoes</Link>
                                <Link className="dropdown-item" to="/kids">Kids</Link>
                               
                            </div>
                        </li>
                        <li className="nav-item pr-3">
                            <Link className="nav-link " to="/">products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Coupons</Link>
                        </li>
                        <li className="nav-item pr-3">
                            <Link className="nav-link " to="/">Blog</Link>
                        </li>
                        <li className="nav-item pr-3">
                            <Link className="nav-link " to="/contact">Contact</Link>
                        </li>
                    </ul>
                    <div className='sear'>
                    <form className="d-flex" onSubmit={handleSearchSubmit}>
                            <div className="input-group">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search..." aria-label="Search" value={searchQuery} onChange={handleSearchChange} />
                                <span className="input-group-text searchbu btn"><FontAwesomeIcon icon={faSearch} /></span>
                            </div>
                        </form>
                        {suggestions.length > 0 && (
                            <ul className="list-group suggestion-list">
                                {suggestions.map((suggestion, index) => (
                                    <li className="list-group-item" key={index}>{suggestion}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="navbar-nav ">
                  
                    {renderAuthLink()}
                    {profileImage && <img  className="profile-image" src={profileImage} alt="Profile" style={{ }} />}
                    
                    <Link className="nav-item nav-link"  to="/cart">
                        <FontAwesomeIcon  style={{paddingLeft:"0.5vw" }} icon={faShoppingCart} />
                        <span className="badge bg-secondary">{state.items.length}</span>
                    </Link>
                </div>
            </div>
        </nav>
        
    );
}

export default Navbar;
