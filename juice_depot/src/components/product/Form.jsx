import React, { useState } from 'react';
import axios from 'axios';
import '../styles/product.css'

export default function Form() {
  const [products, setProducts] = useState({
    productname: '',
    buyunitprice: '',
    sellunitprice: ''
  });

  const handleChange = (e) => {
    setProducts({ ...products, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/products/createproduct', products);
      console.log("Product saved:", response.data);
      alert("Product submitted successfully!");
      // Optionally reset form:
      setProducts({ productname: '', buyunitprice: '', sellunitprice: '' });
    } catch (error) {
      console.log("Error sending product:", error);
      alert("Failed to submit product");
    }
  };

  return (
    <div className='product-form-container'>
      <form className='product-form' onSubmit={handleSubmit}>
        <input
          type='text'
          name='productname'
          value={products.productname}
          onChange={handleChange}
          placeholder='Product Name'
        />
        <input
          type='number'
          name='buyunitprice'
          value={products.buyunitprice}
          onChange={handleChange}
          placeholder='Buy Unit Price'
        />
        <input
          type='number'
          name='sellunitprice'
          value={products.sellunitprice}
          onChange={handleChange}
          placeholder='Sell Unit Price'
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
