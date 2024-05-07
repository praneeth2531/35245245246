import React from 'react';
import ProductDetail from './productsdetails'; 
import { menproducts } from '../screens/mens';
import { womenproducts } from '../screens/womens';


const ProductPage = () => {
    console.log('Men Products:', menproducts);
    console.log('Women Products:', womenproducts);

    return (
        <div>
            <h1>Product Page</h1>
            {/* Pass products data to ProductDetail component */}
            <ProductDetail products={menproducts} />
            <ProductDetail products={womenproducts} />
        </div>
    );
};

export default ProductPage;