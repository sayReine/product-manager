import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/stockin.css';

export default function Table() {
  const [stockin, setStockin] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const stock = await axios.get('http://localhost:3000/api/stockin/allstockin');
        setStockin(stock.data);
      } catch (error) {
        console.log("Error fetching stock", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products/allproducts');
        setProducts(response.data);
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    };

    fetchProducts();
    fetchStock();
  }, []); // ✅ Dependency array added

  // Create a map of productID to productName
  const productMap = products.reduce((acc, product) => {
    acc[product.productID] = product.productName;
    return acc;
  }, {});

  return (
    <div className='stock-container'>
      <h2>Stock-in Records</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {stockin.map((item) => (
            <tr key={item.productID}>
              <td>{item.productID}</td>
              <td>{productMap[item.productID] || 'Unknown Product'}</td>
              <td>{item.totalStockInQty}</td>
              <td>{item.date?.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
