import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Col } from 'react-bootstrap';
import Navbar from '../components/navBar';
import Sideproducts from './sideproducts';
import { useCart } from '../reducers/CartContext';

const WomenList = () => {
    const [womenProducts, setWomenProducts] = useState([]);
    const [productImages, setProductImages] = useState({});

    useEffect(() => {
        axios.get("http://localhost:3001/products?category=women")
            .then(response => {
                setWomenProducts(response.data);
                // Fetch product images for each product
                response.data.forEach(product => {
                    getProductImage(product._id, "women"); // Pass category as a parameter
                });
            })
            .catch(error => {
                console.error("Error fetching women's products:", error);
            });
    }, []);

    const getProductImage = (productId, category) => {
        // Check if the image for this product has already been fetched
        if (productImages[productId]) {
            return Promise.resolve(productImages[productId]);
        }

        // Fetch product image from backend using the new endpoint
        return axios.get(`http://localhost:3001/product/image/${productId}`)
            .then(response => {
                // Update state with the image URL
                setProductImages(prevState => ({
                    ...prevState,
                    [productId]: response.data.image
                }));

                return response.data.image;
            })
            .catch(error => {
                console.error("Error fetching product image:", error);
                return null;
            });
    };

    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    return (
        <div className="womens-list-container">
            <Navbar className="fixed-top" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3" style={{ overflowY: 'auto', height: '100vh' }}>
                        <Sideproducts />
                    </div>
                    <div className="col-md-9 offset-md-3 side1">
                        <div className="container">
                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
                                {womenProducts.map(product => (
                                    <Col key={product.id} className="mb-4">
                                        <Card className="h-100">
                                            <Link to={`/products/${product._id}`} className="text-decoration-none">
                                                {/* Product Image */}
                                                <div style={{ height: '200px', overflow: 'hidden' }}>
                                                    <Card.Img
                                                        variant="top"
                                                        src={productImages[product._id]}
                                                        style={{ objectFit: 'cover', height: '200px' }} 
                                                    />
                                                </div>
                                                <Card.Body>
                                                    {/* Product Title */}
                                                    <Card.Title>{product.name}</Card.Title>
                                                    {/* Product Prices */}
                                                    <Card.Text>
                                                        <span className="new-price" style={{ color: "black" }}>
                                                            <strong style={{ color: "black", padding: "1vw" }}> Price:</strong> ${product.new_price}
                                                        </span>
                                                        <br />
                                                        {/* Uncomment the below line if you want to display old price */}
                                                        {/* <span className="old-price">${product.old_price}</span> */}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Link>
                                            {/* Add to Cart Button */}
                                            <Card.Footer className="d-flex justify-content-between">
                                                <button onClick={() => handleAddToCart(product)} className="btn btn-secondary">ADD TO CART</button>
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WomenList;
