import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './navBar';
import Footer from './footer';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCart } from '../reducers/CartContext';

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [productImage, setProductImage] = useState(null);

    useEffect(() => {
        // Fetch product image
        axios.get(`http://localhost:3001/product/image/${productId}`)
            .then(response => {
                setProductImage(response.data.image);
            })
            .catch(error => {
                console.error("Error fetching product image:", error);
            });

        // Fetch complete product details
        axios.get(`http://localhost:3001/product/${productId}`)
            .then(response => {
                console.log("Product Data:", response.data); // Log response data
                setProduct(response.data);
            })
            .catch(error => {
                console.error("Error fetching product details:", error);
            });
    }, [productId]);

    const { addToCart } = useCart();

    const handleAddToCart = (event, product) => {
        event.preventDefault();
        addToCart(product);
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-6">
                        <img src={productImage} alt="Product Image" className="img-fluid" />
                    </div>
                    <div className="col-lg-6">
                        <h2>{product.name}</h2>
                        <p className="lead">Price: ${product.new_price}</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <label htmlFor="size" className="me-2">Select Size:</label>
                                <select id="size" className="form-select w-auto">
                                    <option value="small">Small</option>
                                    <option value="medium">Medium</option>
                                    <option value="large">Large</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="quantity" className="me-2">Quantity:</label>
                                <input type="number" id="quantity" className="form-control w-auto" defaultValue={1} min={1} />
                            </div>
                        </div>
                        <div className="mt-3">
                            <button onClick={(e) => handleAddToCart(e, product)} className="btn btn-primary">Add to Cart</button>
                        </div>
                        <div className="mt-3">
                            <Link to="/payment">
                                <button className="btn btn-success me-3">Buy Now</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                <Footer />
            </div>
        </>
    );
};

export default ProductDetail;
