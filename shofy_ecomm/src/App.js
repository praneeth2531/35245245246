// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import MensList from './screens/mens';
import WomenList from './screens/womens';
import KidsList from './screens/kids';
 import Cart from './reducers/cart';
 import ShoesList from './screens/shoes';
 import ProductDetail from './components/productsdetails';
 import PaymentComponent from './components/payment';
 import Register from './screens/register';
 import Signin from './screens/signin';
 import AdminHome from './admin/AdminHome';
 import Users from './admin/users';
import AddProduct from '../src/admin/AddProduct'
import ListProduct from "../src/admin/ListProduct"


function App() {
    return (
        
            <Routes>
                <Route path="/Home" element={<Home />} />
                <Route path="/mens" element={<MensList />} />
                <Route path="/womens" element={<WomenList />} />
                <Route path="/kids" element={<KidsList />} />
                <Route path="/shoes" element={<ShoesList />} />
                <Route path="/products/:productId" element={<ProductDetail />} />
                <Route path="/mens/:productId" element={<ProductDetail />} />
                <Route path="/womens/:productId" element={<ProductDetail />} />
                <Route path="/shoes/:productId" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/payment" element={<PaymentComponent />} />
                <Route index element={<Signin />} />
                <Route path="/register" element={<Register />} />
                <Route path="/AdminHome" element={<AdminHome />} />
                <Route path="/users" element={<Users />} />
                <Route path="/Addproduct" element={<AddProduct />} />
                <Route path="/Listproduct" element={<ListProduct />} />
            </Routes>
        
    );
}

export default App;
