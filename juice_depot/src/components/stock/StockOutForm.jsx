import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/stockout.css';

export default function StockOutForm() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    product_id: '',
    quantity: '',
    date: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch product list
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/products/allproducts');
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post('http://localhost:3000/api/stockout/createstockout', formData);
      setMessage(res.data);
      setFormData({ product_id: '', quantity: '', date: '' }); // reset form
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data);
      } else {
        setMessage('An error occurred while submitting.');
      }
    }
  };

  return (
    <div className="stockout-form-container">
      <h2>Purchase product</h2>
      <form onSubmit={handleSubmit} className="stockout-form">
        <label>
          Product:
          <select name="product_id" value={formData.product_id} onChange={handleChange} required>
            <option value="">--Select Product--</option>
            {products.map(prod => (
              <option key={prod.productID} value={prod.productID}>
                {prod.productName}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="1"
          />
        </label>
        <br />

        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>

      {message && <p><strong>{message}</strong></p>}
    </div>
  );
}
