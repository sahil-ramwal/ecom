// src/components/ProductSearch.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchProducts } from '../store/productSlice';

const ProductSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    dispatch(searchProducts(e.target.value));
  };

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleSearchChange}
      placeholder="Search products..."
    />
  );
};

export default ProductSearch;
