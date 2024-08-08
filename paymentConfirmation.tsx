// src/components/PaymentConfirmation.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { clearCart } from '../store/cartSlice';

const PaymentConfirmation: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const dispatch = useDispatch();

  const handleConfirmOrder = () => {
    alert('Order confirmed!');
    dispatch(clearCart());
  };

  const handleCancelOrder = () => {
    alert('Order cancelled!');
  };

  return (
    <div className="payment-confirmation">
      <h2>Payment Confirmation</h2>
      <div>
        <div>Total Amount: ${totalAmount.toFixed(2)}</div>
        <div>
          {cart.map((item) => (
            <div key={item.id}>
              {item.title} - ${item.price} x {item.quantity}
            </div>
          ))}
        </div>
      </div>
      <div className="confirmation-buttons">
        <button onClick={handleConfirmOrder}>Confirm Order</button>
        <button onClick={handleCancelOrder}>Cancel</button>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
