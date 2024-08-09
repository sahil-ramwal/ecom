// src/components/FilterDrawer.tsx
import React, { useState } from 'react';
import { Drawer, Button, Slider, Select, Checkbox } from '@mui/material';
import { useDispatch } from 'react-redux';
import { filterProducts } from '../store/productSlice';

const FilterDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [ratingRange, setRatingRange] = useState<number[]>([1, 5]);

  const dispatch = useDispatch();

  const toggleDrawer = () => setOpen(!open);

  const applyFilters = () => {
    dispatch(filterProducts({ categories: selectedCategories, priceRange, ratingRange }));
    setOpen(false);
  };

  return (
    <>
      <Button onClick={toggleDrawer}>Filter</Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <div style={{ width: 250, padding: 20 }}>
          <h3>Filter Products</h3>
          <Select
            multiple
            value={selectedCategories}
            onChange={(e) => setSelectedCategories(e.target.value as string[])}
            displayEmpty
            fullWidth
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            {/* Add more categories */}
          </Select>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue as number[])}
            valueLabelDisplay="auto"
            min={0}
            max={5000}
          />
          <Slider
            value={ratingRange}
            onChange={(e, newValue) => setRatingRange(newValue as number[])}
            valueLabelDisplay="auto"
            min={1}
            max={5}
            step={0.1}
          />
          <Button onClick={applyFilters} variant="contained" color="primary">
            Apply Filter
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default FilterDrawer;
