// Home.js
import React, { useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navBar";
import CarouselComponent from "../components/carousel";
import ProductList from "../components/productsSection";
import Products from "../components/products";
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    

    

    

    return (
        <>
            <div className="container-fluid bg-white sticky mb-0 pb-0">
                <Navbar  />
            </div>
            <div className="mt-1 mb-0">
                <CarouselComponent />
            </div>
            <div className="mt-1 mb-4">
                <Products />
            </div>
            <div className="mt-1 mb-4">
                <ProductList  />
            </div>
           
            <div className="mt-1 mb-4">
                <Footer />
            </div>
        </>
    );
}

export default Home;

