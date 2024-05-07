

import React, { useState } from 'react';
import Sidebar from '../components/sidebar';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const Sideproducts = () => {
    const [filters, setFilters] = useState({
        categories: ['Category 1', 'Category 2', 'Category 3'],
        sizes: ['Small', 'Medium', 'Large'],
        colors: ['Red', 'Green', 'Blue'],
        brands: ['Brand 1', 'Brand 2', 'Brand 3'],
    });

    const handleFilterChange = (filterType, selectedFilters) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: selectedFilters,
        }));
    };

    return (
        <div className="container-fluid ">
            <div className="row">
                <div className="col-lg-3">
                    <div className='fixed side1'>
                    <Sidebar
                        categories={filters.categories}
                        sizes={filters.sizes}
                        colors={filters.colors}
                        brands={filters.brands}
                        onFilterChange={handleFilterChange}
                        
                    />
                    </div>
                </div>
               
            </div>
        </div>
    );
};

export default Sideproducts;
