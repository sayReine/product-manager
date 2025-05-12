import React, { useState } from 'react';
import axios from 'axios';
import '../components/styles/report.css';

export default function Report() {
  const [endDate, setEndDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchReport = async () => {
    if (!startDate || !endDate) {
      setError('Both start date and end date are required');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await axios.get('http://localhost:3000/api/stock/report', {
        params: { startDate, endDate },
      });
      setReport(res.data);
    } catch (error) {
      console.error("Error fetching report", error);
      setError("Error fetching report");
    } finally {
      setLoading(false);
    }
  };

  const getTotal = (field) =>
    report.reduce((sum, item) => sum + (Number(item[field]) || 0), 0);

  return (
    <div className="report-container">
      <div className="report-form">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start Date"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End Date"
        />
        <button onClick={handleFetchReport}>Generate</button>
      </div>

      {error && <p className="error">{error}</p>}
      {loading && <p>Loading...</p>}

      {report.length > 0 && (
        <div className="report-tables">
          {/* Periodical General Report */}
          <div className="report-section">
            <h3>Periodical General Report From: {startDate} .. to {endDate} ..</h3>
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Purchased (Quantity)</th>
                  <th>Purchased Amount (Rwf)</th>
                  <th>Sold (Quantity)</th>
                  <th>Sold Amount (Rwf)</th>
                  <th>Remaining</th>
                </tr>
              </thead>
              <tbody>
                {report.map((product, index) => (
                  <tr key={`general-${product.productID}-${index}`}>
                    <td>{product.productName}</td>
                    <td>{product.purchasedQty}</td>
                    <td>{product.purchasedAmount}</td>
                    <td>{product.soldQty}</td>
                    <td>{product.soldAmount}</td>
                    <td>{product.remainingQty}</td>
                  </tr>
                ))}
                <tr style={{ fontWeight: 'bold' }}>
                  <td>Total</td>
                  <td></td>
                  <td>{getTotal('purchasedAmount')} Rwf</td>
                  <td></td>
                  <td>{getTotal('soldAmount')} Rwf</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <button className="print-btn" onClick={() => window.print()}>PRINT</button>
          </div>

          {/* Individual Product Reports */}
          {report.map((product, index) => (
            <div key={`section-${product.productID}-${index}`} className="report-section">
              <h3>
                Periodical Report for ({product.productName}) From: {startDate} .. to {endDate} ..
              </h3>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Purchased (Quantity)</th>
                    <th>Purchased Amount (Rwf)</th>
                    <th>Sold (Quantity)</th>
                    <th>Sold Amount (Rwf)</th>
                    <th>Remaining</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>-</td>
                    <td>{product.purchasedQty}</td>
                    <td>{product.purchasedAmount}</td>
                    <td>{product.soldQty}</td>
                    <td>{product.soldAmount}</td>
                    <td>{product.remainingQty}</td>
                  </tr>
                  <tr style={{ fontWeight: 'bold' }}>
                    <td colSpan="5">Total</td>
                    <td>{product.remainingQty}</td>
                  </tr>
                </tbody>
              </table>
              <button className="print-btn" onClick={() => window.print()}>PRINT</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
