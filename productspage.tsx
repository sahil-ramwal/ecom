import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addItem, incrementQuantity, decrementQuantity } from '../store/cartSlice';
import axios from 'axios';
import './ProductsPage.css';

interface Product {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/products?page=${page}&limit=5`);
      setProducts((prevProducts) => [...prevProducts, ...response.data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error fetching products', error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddToCart = (product: Product) => {
    dispatch(addItem({ ...product, quantity: 1 }));
  };

  const handleIncrement = (productId: number) => {
    dispatch(incrementQuantity({ id: productId, quantity: 1 }));
  };

  const handleDecrement = (productId: number) => {
    dispatch(decrementQuantity({ id: productId, quantity: 1 }));
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      fetchProducts();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchProducts]);

  return (
    <div className="products-page">
      <h2>Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <div className="product-card-actions">
              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
              {cart.find((item) => item.id === product.id) && (
                <div className="quantity-controls">
                  <button onClick={() => handleDecrement(product.id)}>-</button>
                  <span>
                    {cart.find((item) => item.id === product.id)?.quantity || 1}
                  </span>
                  <button onClick={() => handleIncrement(product.id)}>+</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {loading && <div className="loading">Loading more products...</div>}
    </div>
  );
};

export default ProductsPage;
