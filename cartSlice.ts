// src/store/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  coupon: string | null;
}

const initialState: CartState = {
  items: [],
  coupon: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    updateQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
    applyCoupon(state, action: PayloadAction<string>) {
      state.coupon = action.payload;
    },
    clearCoupon(state) {
      state.coupon = null;
    },
  },
});

export const { addItem, updateQuantity, removeItem, clearCart, applyCoupon, clearCoupon } =
  cartSlice.actions;

export default cartSlice.reducer;
