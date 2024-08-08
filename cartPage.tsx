// src/components/CartPage.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { decrementQuantity, incrementQuantity, removeItem, clearCart } from '../store/cartSlice';
import './CartPage.css';

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const coupon = useSelector((state: RootState) => state.cart.coupon);

  const handleIncrement = (id: number) => {
    dispatch(incrementQuantity({ id, quantity: 1 }));
  };

  const handleDecrement = (id: number) => {
    dispatch(decrementQuantity({ id, quantity: 1 }));
  };

  const handleRemove = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const applyCoupon = () => {
    // Logic to apply coupon if needed
  };

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <h3>{item.title}</h3>
            <p>${item.price.toFixed(2)}</p>
            <div className="quantity-controls">
              <button onClick={() => handleDecrement(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item.id)}>+</button>
            </div>
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p>Total: ${calculateTotal().toFixed(2)}</p>
        <button onClick={handleClearCart}>Clear Cart</button>
        <button onClick={applyCoupon}>Apply Coupon</button>
      </div>
    </div>
  );
};

export default CartPage;
