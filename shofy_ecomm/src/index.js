// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CartProvider } from './reducers/CartContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PE2C6SG7iZJBYVQZTK4QFmKisOVVBbMzLSmsj91uSuYOYFCcVLXpqEOC02BGxGhiy6vHNYkIAy5OJIGIvUIhvVd00ELHiGCG2');

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
