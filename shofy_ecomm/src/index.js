import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { BrowserRouter  } from 'react-router-dom';
import App from './App';
import { CartProvider } from './reducers/CartContext';




ReactDOM.render(
    
    <BrowserRouter>
       < CartProvider>
           <App />
        </CartProvider>
        </BrowserRouter>,
    document.getElementById('root')
);

