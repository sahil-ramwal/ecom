// src/store/productSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
}

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
}

const initialState: ProductState = {
  products: [], // Load products from an API or static JSON file
  filteredProducts: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    filterProducts(state, action: PayloadAction<{ categories?: string[]; priceRange?: number[]; ratingRange?: number[] }>) {
      const { categories, priceRange, ratingRange } = action.payload;
      state.filteredProducts = state.products.filter(product => {
        const matchesCategory = categories?.length ? categories.includes(product.category) : true;
        const matchesPrice = product.price >= (priceRange?.[0] || 0) && product.price <= (priceRange?.[1] || Infinity);
        const matchesRating = product.rating >= (ratingRange?.[0] || 1) && product.rating <= (ratingRange?.[1] || 5);
        return matchesCategory && matchesPrice && matchesRating;
      });
    },
    searchProducts(state, action: PayloadAction<string>) {
      const searchTerm = action.payload.toLowerCase();
      state.filteredProducts = state.products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
    },
  },
});

export const { setProducts, filterProducts, searchProducts } = productSlice.actions;
export default productSlice.reducer;
