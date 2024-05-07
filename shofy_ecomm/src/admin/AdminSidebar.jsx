import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import add_product_icon from './Assets/Product_Cart.svg';
import list_product_icon from './Assets/Product_list_icon.svg';

const AdminSidebar = () => {
  const fetchUsers = async () => {
    // Fetch users here if needed
  };

  return (
    <div className='sidebar mt-0 mb-2 ' >
      <Link to="/AddProduct" className="sidebar-item text-decoration-none">
        <img src={add_product_icon} alt="" />
     <p>Add Product</p> 
     </Link>
      <Link to="/ListProduct" className="sidebar-item text-decoration-none">
        <img src={list_product_icon} alt="" />
        <p>Product List</p>
        </Link>
      <Link to="/users" className="sidebar-item text-decoration-none " onClick={fetchUsers} >
        <FontAwesomeIcon icon={faUser} style={{height:"4vw",width:'4vh',marginLeft:"1px" }}/>
        <p>Users</p>
      </Link>
    </div>
  );
};

export default AdminSidebar;
