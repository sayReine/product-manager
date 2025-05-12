const db  = require('../config/db.js');

const getPeriodicalReport = (req, res) => { 
    const { startDate, endDate } = req.query;

    const sql = `
    SELECT 
      p.productName,
      IFNULL(SUM(si.quantity), 0) AS purchasedQty,
      IFNULL(SUM(si.quantity * p.buyUnitPrice), 0) AS purchasedAmount,
      IFNULL(SUM(so.quantity), 0) AS soldQty,
      IFNULL(SUM(so.quantity * p.sellUnitPrice), 0) AS soldAmount,
      (IFNULL(SUM(si.quantity), 0) - IFNULL(SUM(so.quantity), 0)) AS remainingQty,
      ((IFNULL(SUM(si.quantity), 0) - IFNULL(SUM(so.quantity), 0)) * p.sellUnitPrice) AS remainingValue
    FROM products p
    LEFT JOIN stock_in si ON p.productID = si.productID AND si.date BETWEEN ? AND ?
    LEFT JOIN stock_out so ON p.productID = so.productID AND so.date BETWEEN ? AND ?
    GROUP BY p.productID
    `;

    db.query(sql, [startDate, endDate, startDate, startDate], (err, results) => {
        if (err) {
            console.error("Report error:", err);
            return res.status(500).json("Error generating report");
        }
        return res.status(200).json(results);
    });
};

module.exports ={
    getPeriodicalReport
}