import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from './Assets/cross_icon.png';
import Navbar from "./adminNavbar";
import axios from 'axios';
import AdminSidebar from './AdminSidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [productImages, setProductImages] = useState({});

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    axios.get("http://localhost:3001/products")
      .then(response => {
        setAllProducts(response.data); // Update state with fetched data

        // Fetch product images
        const promises = response.data.map(product => getProductImage(product._id));
        Promise.all(promises)
          .then(images => {
            // Combine product IDs with image URLs
            const imageMap = {};
            images.forEach((image, index) => {
              const productId = response.data[index]._id;
              imageMap[productId] = image;
            });
            setProductImages(imageMap);
          })
          .catch(error => {
            console.error("Error fetching product images:", error);
          });
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        // Handle error, show error message to the user, etc.
      });
  }, []);

  const getProductImage = (productId) => {
    // Check if the image for this product has already been fetched
    if (productImages[productId]) {
      return Promise.resolve(productImages[productId]);
    }

    // Fetch product image from backend using the new endpoint
    return axios.get(`http://localhost:3001/product/image/${productId}`)
      .then(response => {
        // Log the image URL
        console.log("Product image URL:", response.data.image);

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

  const handleRemoveProduct = (productId) => {
    axios.delete(`http://localhost:3001/products/${productId}`)
        .then(response => {
            console.log("Product deleted successfully:", response.data);
            // Update state to remove the deleted product from the list
            setAllProducts(allProducts.filter(product => product._id !== productId));
        })
        .catch(error => {
            console.error("Error deleting product:", error);
            // Handle error, display error message, etc.
        });
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-8">
            <h1>All Products List</h1>
            <div className="listproduct-format-main" style={{color:"black"}}>
            <p className="listproduct-header">Product Image</p>
              <p className="listproduct-header itemsname ">Title</p>
              <p className="listproduct-header">New Price</p>
              <p className="listproduct-header">Old Price</p>
              <p className="listproduct-header">Category</p>
              <p className="listproduct-header">Remove</p>
            </div>
            
            {allProducts.map((product) => (
              <div key={product._id} className="listproduct-format-main">
                <img className="listproduct-product-icon" src={productImages[product._id]}  alt="" />
                <p className="listproduct-title itemsname">{product.name}</p>
                <p className="listproduct-price">${product.new_price}</p>
                <p className="listproduct-price">${product.old_price}</p>
                <p className="listproduct-category">{product.category}</p>
                <p>
                  <img
                    className="listproduct-remove-icon"
                    src={cross_icon}
                    alt=""
                    onClick={() => handleRemoveProduct(product._id)}
                  />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
