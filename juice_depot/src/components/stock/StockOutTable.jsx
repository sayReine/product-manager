import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function StockOutTable() {
  const [stockOutData, setStockOutData] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchStockOut = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/stockout/allstockout');
        setStockOutData(res.data);
      } catch (err) {
        console.error("Error fetching stock out data", err);
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

    fetchStockOut();
  }, []);

   const productMap = products.reduce((acc, product) => {
    acc[product.productID] = product.productName;
    return acc;
  }, {});

  return (
    
    <div className='stock-out-table-container'>
    
      <h2>Stock Out Records</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            {/* <th>Stock Out ID</th> */}
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {stockOutData.map((item) => (
            <tr key={item.productID}>
              {/* <td>{item.stockoutID}</td> */}
              <td>{item.productID}</td>
              <td>{productMap[item.productID] || 'Unknown Product'}</td>
              <td>{item.quantity}</td>
              <td>{item.date?.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
