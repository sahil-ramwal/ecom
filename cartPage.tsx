// src/components/CartPage.tsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { updateQuantity, removeItem, applyCoupon, clearCart } from '../store/cartSlice';
import couponData from '../data/coupons.json'; // Local JSON file with coupon details

const CartPage: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const coupon = useSelector((state: RootState) => state.cart.coupon);
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [finalAmount, setFinalAmount] = useState<number>(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  useEffect(() => {
    const calculateAmounts = () => {
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setTotalAmount(total);

      const discount = coupon ? couponData[coupon] : 0;
      setDiscountAmount(discount);

      setFinalAmount(total - discount);
    };

    calculateAmounts();
  }, [cart, coupon]);

  const handleApplyCoupon = (couponCode: string) => {
    if (cart.length === 0) return;
    if (cart.reduce((sum, item) => sum + item.price * item.quantity, 0) < 1200 && appliedCoupon) {
      alert('Only one coupon can be applied for orders below $1200.');
      return;
    }
    dispatch(applyCoupon(couponCode));
    setAppliedCoupon(couponCode);
  };

  const handlePlaceOrder = () => {
    // Implement order placement logic here
    alert('Order placed successfully!');
    dispatch(clearCart());
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <ul className="cart-items">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <span>{item.title}</span>
            <span>{item.price}</span>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))
              }
            />
            <button onClick={() => dispatch(removeItem(item.id))}>Remove</button>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <div>Total Amount: ${totalAmount.toFixed(2)}</div>
        <div>Discount: -${discountAmount.toFixed(2)}</div>
        <div>Final Amount: ${finalAmount.toFixed(2)}</div>
      </div>
      <div className="coupon-section">
        <h3>Apply Coupon</h3>
        <input
          type="text"
          placeholder="Enter coupon code"
          onBlur={(e) => handleApplyCoupon(e.target.value)}
        />
      </div>
      <button onClick={handlePlaceOrder} className="place-order-button">
        Place Order
      </button>
    </div>
  );
};

export default CartPage;
