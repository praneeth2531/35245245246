import React, { useState } from 'react';
import { useCart } from './CartContext';
import './cart.css';
import Navbar from '../components/navBar';
import Footer from '../components/footer';
import axios from 'axios';
import logo1 from '../images/12345.jpg';
import PaymentComponent from '../components/payment';

const Cart = () => {
  const { state, removeFromCart } = useCart();
  const [orderId, setOrderId] = useState(null);
  const totalPrice = state.items.reduce((total, item) => {
    const new_price = typeof item.new_price === 'number' ? item.new_price : 0;
    return total + new_price;
  }, 0);

  const handlePayment = async () => {
    try {
      // Step 1: Create an order
      const orderResponse = await axios.post('http://localhost:3001/createOrder', { 
        amount: totalPrice * 100, // Convert amount to paise
        currency: 'INR',
        receipt: 'receipt#1'
      });
      const { id: orderId } = orderResponse.data;
      setOrderId(orderId);

      // Step 2: Initialize Razorpay payment form
      const options = {
        key: 'rzp_test_TuBdAmrqCbcCVh', // Replace with your Razorpay key
        amount: totalPrice * 100, // Amount in paise
        currency: 'INR',
        name: 'Shopify',
        description: 'Payment for Purchase',
        image: { logo1 }, // URL of your logo
        order_id: orderId,
        handler: function (response) {
          // Step 3: Verify payment after successful payment
          axios.post('http://localhost:3001/verifyPayment', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          }).then(verificationResponse => {
            console.log(verificationResponse.data.status);
            // Send confirmation email after successful payment
            axios.post('http://localhost:3001/confirm-order')
              .then(response => {
                alert('Payment successful! Order confirmed.');
              })
              .catch(error => {
                console.error('Error confirming order:', error);
                alert('Payment successful! Order confirmed..');
              });
          }).catch(error => {
            console.error('Error verifying payment:', error);
            alert('Payment failed. Please try again.');
          });
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#F37254',
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
        <div className="col-md-8">
            <PaymentComponent />
          </div>
          <div className="col-md-4">
            <div className="cart-container">
              <h2 className="cart-heading">Cart</h2>
              <div className="cart-items-container">
                {state.items.length === 0 ? (
                  <p className="empty-cart-message">Your cart is empty</p>
                ) : (
                  <ul className="cart-items-list">
                    {state.items.map(item => (
                      <li key={item.id} className="cart-item">
                        <div className="item-details">
                          <p className="item-name">{item.name}</p>
                          <p className="item-price">{typeof item.new_price === 'number' ? `$${item.new_price.toFixed(2)}` : 'N/A'}</p>
                        </div>
                        <button className="remove-button" onClick={() => removeFromCart(item)}>
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="cart-total">
                <p className="total-text">Total Price:</p>
                <p className="total-price">${totalPrice.toFixed(2)}</p>
              </div>
              <button className="checkout-button" onClick={handlePayment}>Proceed to Checkout</button>
            </div>
          </div>
          
        </div>
      </div>
      <Footer className="footer" />
    </div>
  );
};

export default Cart;
