// Footer.js
import React from 'react';
import logo from '../images/shofylogo.png';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className=" footer bg-light shadow-lg text-dark border border-light">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                    <img src={logo} height="50px" width="150px"  />
                    <h6 className='mt-3'>We are a team of designers and developers that create high quality WordPress</h6>
                    <ul className="list-inline footer-links mt-4  text-dark">
                            <li className="list-inline-item text-dark">
                                <a href="https://www.facebook.com/login.php/">
                                    <i className="fab fa-facebook text-dark"></i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="https://twitter.com/i/flow/login">
                                    <i className="fab fa-twitter text-dark"></i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="https://www.instagram.com/accounts/login/?hl=en">
                                    <i className="fab fa-instagram text-dark"></i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="">
                                    <i className="fab fa-linkedin text-dark"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3 text-dark">
                        <h5>MY ACCOUNT</h5>
                        <ul className=" footer-links text-dark">
                            <li className="mt-2 text-dark">
                                <Link to="#"className=" text-dark" >Track Orders</Link>
                            </li>
                            <li className="mt-3">
                                <Link to="#"className=" text-dark">Shipping</Link>
                            </li>
                            <li className="mt-3">
                                <Link to="#" className=" text-dark">Wishlist</Link>
                            </li>
                            <li className="mt-3">
                                <Link to="#" className=" text-dark">My Account</Link>
                            </li>
                            <li className="mt-3">
                                <Link to="#" className=" text-dark">Order History</Link>
                            </li>
                            <li className="mt-3">
                                <Link to="#" className=" text-dark">Returns</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5>INFORMATION</h5>
                        <ul className=" footer-links">
                            <li className="mt-2">
                                <Link to="#" className=" text-dark">Our Story</Link>
                            </li>
                            <li className="mt-3">
                                <Link to="#"className=" text-dark">Careers</Link>
                            </li>
                            <li className="mt-3">
                                <Link to="#"className=" text-dark">Privacy Policy</Link>
                            </li>
                            <li className="mt-3">
                                <Link to="#"className=" text-dark">Terms & Conditions</Link>
                            </li>
                            <li className="mt-3">
                                <Link to="#"className=" text-dark">Latest News</Link>
                            </li>
                            <li className="mt-3">
                                <Link to="#" className=" text-dark">Contact Us</Link>
                            </li>
                        </ul>
                        
                    </div>
                    <div className="col-md-3">
                        <h5>Talk To Us</h5>
                        <p>Got Questions? Call us</p>
                        <ul className="list-unstyled">
                            <li>Email: info@example.com</li>
                            <li>Phone: +1233567890</li>
                            <li>Address: 123 Street, City, Country</li>
                        </ul>
                    </div>
                   
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-6">
                        <p>© 2024 Your Website. All rights reserved.</p>
                    </div>
                    <div className="col-md-6 text-end">
                        <ul className="list-inline footer-links">
                            <li className="list-inline-item">
                                <a href="#" className=" text-dark">Privacy Policy</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#"className=" text-dark">Terms of Service</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#"className=" text-dark">Sitemap</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
