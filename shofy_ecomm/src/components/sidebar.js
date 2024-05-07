import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Sidebar = ({ categories = [], sizes = [], colors = [], brands = [], onFilterChange }) => {
    const [selectedFilters, setSelectedFilters] = useState({
        category: [],
        size: [],
        color: [],
        brand: []
    });

    const handleFilterChange = (filterType, value) => {
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: prevFilters[filterType].includes(value)
                ? prevFilters[filterType].filter(item => item !== value)
                : [...prevFilters[filterType], value]
        }));
    };

    const applyFilters = () => {
        onFilterChange(selectedFilters);
    };

    return (
        <div className="sidebar">
            <div className="filter-section">
                <h4>Categories</h4>
                <Form>
                    {categories.map(category => (
                        <Form.Check
                            key={category}
                            type="checkbox"
                            label={category}
                            checked={selectedFilters.category.includes(category)}
                            onChange={() => handleFilterChange('category', category)}
                        />
                    ))}
                </Form>
            </div>
            <div className="filter-section">
                <h4>Sizes</h4>
                <Form>
                    {sizes.map(size => (
                        <Form.Check
                            key={size}
                            type="checkbox"
                            label={size}
                            checked={selectedFilters.size.includes(size)}
                            onChange={() => handleFilterChange('size', size)}
                        />
                    ))}
                </Form>
            </div>
            <div className="filter-section">
                <h4>Colors</h4>
                <Form>
                    {colors.map(color => (
                        <Form.Check
                            key={color}
                            type="checkbox"
                            label={color}
                            checked={selectedFilters.color.includes(color)}
                            onChange={() => handleFilterChange('color', color)}
                        />
                    ))}
                </Form>
            </div>
            <div className="filter-section">
                <h4>Brands</h4>
                <Form>
                    {brands.map(brand => (
                        <Form.Check
                            key={brand}
                            type="checkbox"
                            label={brand}
                            checked={selectedFilters.brand.includes(brand)}
                            onChange={() => handleFilterChange('brand', brand)}
                        />
                    ))}
                </Form>
               <form action="/action_page.php">
                <label for="vol" className='mt-3 mb-3'>Price:</label>
                <input type="range" id="vol" name="vol" min="100" max="1000" /> 
  
</form>
            </div>
            <Button variant="primary" onClick={applyFilters}>Apply Filters</Button>
        </div>
    );
};

export default Sidebar;
