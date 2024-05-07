import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./AddProduct.css";
import upload_area from "./Assets/upload_area.svg";
import Navbar from "./adminNavbar";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from "react-bootstrap";

const AddProduct = () => {
  const { category } = useParams();
  const [imagePreview, setImagePreview] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    new_price: "",
    old_price: "",
    category: category // Set initial category value from URL params
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductDetails({ ...productDetails, image: file });
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (e) => {
    setProductDetails({ ...productDetails, category: e.target.value });
  };

  const handleAddProduct = () => {
    const formData = new FormData();
    formData.append("name", productDetails.name);
    formData.append("category", productDetails.category);
    formData.append("new_price", productDetails.new_price);
    formData.append("old_price", productDetails.old_price);
    formData.append("image", productDetails.image);

    axios.post("http://localhost:3001/products", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    .then(response => {
        console.log("Response from backend:", response.data);
        console.log("Product added successfully:", response.data);

        setShowAlert(true);
    })
    .catch(error => {
        console.error("Error adding product:", error);
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
          <div className="col-md-9">
            <div className="addproduct">
              <div className="addproduct-itemfield">
                <p>Product title</p>
                <input type="text" name="name" placeholder="Type here" onChange={(e) => setProductDetails({ ...productDetails, name: e.target.value })} />
              </div>
              <div className="addproduct-price">
                <div className="addproduct-itemfield">
                  <p>New Price</p>
                  <input type="text" name="new_price" placeholder="Type here" onChange={(e) => setProductDetails({ ...productDetails, new_price: e.target.value })} />
                </div>
                <div className="addproduct-itemfield">
                  <p>Old Price</p>
                  <input type="text" name="old_price" placeholder="Type here" onChange={(e) => setProductDetails({ ...productDetails, old_price: e.target.value })} />
                </div>
              </div>
              <div className="addproduct-itemfield">
                <p>Product category</p>
                <select name="category" value={productDetails.category} onChange={handleCategoryChange}>
                <option >select category</option>
                  <option value="women">Women</option>
                  <option value="men">Men</option>
                  <option value="kids">Kids</option>
                  <option value="shoes">shoes</option>
                </select>
              </div>
              <div className="addproduct-itemfield">
                <p>Product Image</p>
                <label htmlFor="file-input">
                  <img
                    className="addproduct-thumbnail-img"
                    src={imagePreview || upload_area}
                    alt=""
                  />
                </label>
                <input
                  type="file"
                  name="image"
                  id="file-input"
                  hidden
                  onChange={handleImageChange}
                />
              </div>
              <Button variant="primary" onClick={handleAddProduct}>ADD</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Modal for displaying success message */}
      <Modal show={showAlert} onHide={() => setShowAlert(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Product added successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowAlert(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddProduct;
