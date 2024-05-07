import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Bags from '../images/Bags.jpg';
import childsware from '../images/childs.jpg';
import shoes from '../images/shoes.jpg';
import womens from '../images/women.jpg';
import mens from '../images/men.jpg';
import tshirt from '../images/tshirts.jpg';
import shoesoff from '../images/shoesoff.jpg';
import { Link } from 'react-router-dom';
import { useCart } from "../reducers/CartContext";

const Products = () => {
  const { addToCart } = useCart();
  

    const handleAddToCart = (event,product) => { 
        event.preventDefault();
        addToCart(product);
      };
  return (
    <div>
      <h6 className="text-warning text-center text-decoration-underline">Shop By Category</h6>
      <h2 className="text-center">Popular On The Shofy Store</h2>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <div className="col-md-2">
            <div className="card flip-card" style={{height:"250px"}}>
              <div className="flip-card-inner">
              <div className="flip-card-front">
              <img className="card-img-top" src={mens} style={{height:"250px"}} alt="" />
              </div>
              <div class="flip-card-back">
                  <h3 >MENS JEANS</h3>
                 <p className="text-primary">COST: &#8377;1500 </p>
                <button className="btn btn-primary" onClick={(e) => handleAddToCart(e, { id: 1, title: 'MENS JEANS', price: 1500, image: mens })}>ADDCART</button>
             </div>
            </div>
            </div>
          </div>
          <div className="col-md-2">
          <div className="card flip-card" style={{height:"250px"}}>
              <div className="flip-card-inner">
              <div className="flip-card-front">
              <img className="card-img-top" src={womens} style={{height:"250px"}} alt="" />
              </div>
              <div class="flip-card-back">
                <h3 >WOMENS DRESS</h3>
            <p className="text-primary">COST: &#8377;2000 </p>
              <button className="btn btn-primary" onClick={(e) => handleAddToCart(e, { id: 1, title: 'MENS JEANS', price: 2000, image: mens })}>ADDCART</button>
             </div>
            </div>
            </div>
          </div>
          <div className="col-md-2">
          <div className="card flip-card" style={{height:"250px"}}>
              <div className="flip-card-inner">
              <div className="flip-card-front">
              <img className="card-img" src={shoes} style={{height:"250px"}} alt="" />
              </div>
              <div class="flip-card-back">
            <h3 >CAMPUS BRAND</h3>
           <p className="text-primary">COST: &#8377;1000 </p>
            <button className="btn btn-primary" onClick={(e) => handleAddToCart(e, { id: 1, title: 'MENS JEANS', price: 1000, image: mens })}>ADDCART</button>
             </div>
            </div>
            </div>
          </div>
          <div className="col-md-2">
          <div className="card flip-card" style={{height:"250px"}}>
              <div className="flip-card-inner">
              <div className="flip-card-front">
                 <img className="card-img" src={childsware} style={{height:"250px"}} alt="" />
              </div>
              <div class="flip-card-back">
              <h3 >CHILD'S WARE</h3>
           <p className="text-primary">COST: &#8377;800 </p>
            <button className="btn btn-primary" onClick={(e) => handleAddToCart(e, { id: 1, title: 'MENS JEANS', price: 800, image: mens })}>ADDCART</button>
             </div>
            </div>
            </div>
          </div>
          <div className="col-md-2">
          <div className="card flip-card" style={{height:"250px"}}>
              <div className="flip-card-inner">
              <div className="flip-card-front">
              <img className="card-img-top" src={Bags} style={{height:"250px"}} alt="" />
              </div>
              <div class="flip-card-back">
              <h3 >LEATHER BAG</h3>
           <p className="text-primary">COST: &#8377;1000 </p>
            <button  className="btn btn-primary" onClick={(e) => handleAddToCart(e, { id: 1, title: 'MENS JEANS', price: 1000, image: mens })}>ADDCART</button>
             </div>
            </div>
            </div>
          </div>
        </div>
      </div>
  
      <hr className="bt-5" style={{height:"8px"}}/>
      <div>
    <h2 style={{paddingLeft: "100px"}}>
    &#9827;THIS WEEK'S FEATURED
    </h2>
</div>
<div className="container mt-5">
  <div className="row">
    <div className="col-md-6">
      <div className="card" style={{ height: "420px" }}>
        <img src={tshirt} className="card-img-top" style={{ height: "200px" }} alt="image" />
        <div className="card-body">
          <h2 className="card-title">Clothing Collections 2024</h2>
          <p className="card-text">Starting @ &#8377;500</p>
          <div className="rating">
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
          </div>
          <Link to="/mens">
          <button className='btn btn-primary mt-4'>SHOP NOW &rarr;</button>
          </Link>
        </div>
      </div>
    </div>
    <div className="col-md-6">
      <div className="card" style={{ height: "420px" }}>
        <img src={shoesoff} className="card-img" style={{ height: "200px" }} alt="image"/>
        <div className="card-body">
          <h3 className="card-title">Good shoes take you good places</h3>
          <p className="card-text">Starting offer @ &#8377;2000</p>
          <div className="rating">
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
          </div>
          <Link to="/shoes">
          <button className='btn btn-primary mt-4'>SHOP NOW &rarr;</button>
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>
<hr className="bt-5" style={{height:"8px"}}/>
<div>
<h6 className="text-warning text-center text-decoration-underline">ALL PRODUCTS SHOP</h6>
        <h2 className="text-center ">Customer Favorite Style product</h2>
        <ul className="d-flex justify-content-center list-unstyled">
      <li className="nav-item me-3 ms-3">
        <Link className="nav-link" to="">All Products</Link>
      </li>
      <li className="nav-item me-3 ms-3">
        <Link className="nav-link" to="">Shoes</Link>
      </li>
      <li className="nav-item me-3 ms-3">
        <Link className="nav-link" to="">Cosmetics</Link>
      </li>
      <li className="nav-item ms-3">
        <Link className="nav-link" to="">Bags</Link>
      </li>
    </ul>
</div>

        </div>
    )
}

export default Products;
