import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCart } from '../reducers/CartContext';

function ProductList() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  const handleAddToCart = (event,product) => { 
    event.preventDefault();
    addToCart(product);
  };
  useEffect(() => {
    
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="container">
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-3 mb-4">
            <div className="card" style={{ padding: "20px", height: "450px" }}>
              
       
                <img
                  src={product.image}
                  alt={product.title}
                  className="card-img-top product-card"
                  style={{
                    height: '50%',
                    width: '100%',
                    borderRadius: '5px',
                  }}
                />
        
              <div className="card-body container">
                <h6 className="card-title row h-30">{product.title}</h6>
              </div>
              <div>
                <p className="card-text text-success ml-3">Price: ${product.price}</p>
              </div>
              <div>
                <button onClick={(e) => handleAddToCart(e,product)}   className='btn btn-secondary mb-3 mt-3'>ADD TO CART</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
