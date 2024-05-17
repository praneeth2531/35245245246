import React from 'react';
import { Carousel } from 'react-bootstrap';
import image1 from '../images/image11.jpg';
import image2 from '../images/image22.jpg';
import image3 from '../images/image33.jpg';
import { Link } from 'react-router-dom';

function CarouselComponent() {
    return (
        <Carousel>
            <Carousel.Item>
                <div className="container-fluid bg-dark">
                    <div className="row">
                        <div className="col-md-6 d-flex align-items-center justify-content-center">
                            <img
                                className="d-block w-100"
                                src={image1}
                                alt="First slide"
                            />
                        </div>
                        <div className="col-md-6 d-flex align-items-center justify-content-center">
                            <div className="text-light capt text-center">
                                <h1>BEST DISCOUNTS 50%</h1>
                                <h4>"Shop 'til you drop, with discounts that won't stop!"</h4>
                                <Link to="/womens">
                                <button className='btn btn-primary mt-3'>SHOP NOW &rarr;</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="container-fluid bg-dark">
                    <div className="row">
                        <div className="col-md-6 d-flex align-items-center justify-content-center">
                            <img
                                className="d-block w-100"
                                src={image2}
                                alt="Second slide"
                            />
                        </div>
                        <div className="col-md-6 d-flex align-items-center justify-content-center">
                            <div className="text-light capt text-center">
                                <h1>BEST DISCOUNTS %</h1>
                                <h6>&#9827; "Shopping: where every bag holds a little piece of happiness"</h6>
                                <h4>"Scroll, click, buy, repeat: the shopping mantra."</h4>
                                <Link to="/shoes">
                                <button className='btn btn-primary mt-3'>SHOP NOW &rarr;</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="container-fluid bg-dark">
                    <div className="row">
                        <div className="col-md-6 d-flex align-items-center justify-content-center">
                            <img
                                className="d-block w-100"
                                src={image3}
                                alt="Third slide"
                            />
                        </div>
                        <div className="col-md-6 d-flex align-items-center justify-content-center">
                            <div className="text-light capt text-center">
                                <h6>&rarr; start from $200</h6>
                                <h4>"Beauty begins with the brush of confidence"</h4>
                                <h4>Explore endless possibilities in the world of fashion</h4>
                                <Link to="/mens">
                                <button className='btn btn-primary mt-3'>SHOP NOW &rarr;</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Carousel.Item>
        </Carousel>
    );
}

export default CarouselComponent;
