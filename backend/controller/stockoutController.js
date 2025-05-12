const db = require('../config/db.js')

const getAllStockout = (req, res) => {
    const sql = "SELECT * FROM stock_out";
    db.query(sql, (err, result) => {
        if(err){
            console.log("error fetching users",err);
        }
        return res.status(200).json(result);
    })
}

const createStockout = (req, res) => {
    const { product_id, quantity, date } = req.body;

    // Step 1: Get total stock in
    const stockInSql = `SELECT IFNULL(SUM(quantity), 0) AS totalIn FROM stock_in WHERE productID = ?`;
    db.query(stockInSql, [product_id], (err, inResult) => {
        if (err) {
            console.error("Error fetching stock in:", err);
            return res.status(500).json("Database error during stock-in check");
        }

        const totalIn = inResult[0].totalIn;

        // Step 2: Get total stock out
        const stockOutSql = `SELECT IFNULL(SUM(quantity), 0) AS totalOut FROM stock_out WHERE productID = ?`;
        db.query(stockOutSql, [product_id], (err, outResult) => {
            if (err) {
                console.error("Error fetching stock out:", err);
                return res.status(500).json("Database error during stock-out check");
            }

            const totalOut = outResult[0].totalOut;
            const availableStock = totalIn - totalOut;

            // Step 3: Check if enough stock is available
            if (quantity > availableStock) {
                return res.status(400).json(`Insufficient stock. Only ${availableStock} available.`);
            }

            // Step 4: Insert the stock out record
            const insertSql = "INSERT INTO stock_out (productID, quantity, date) VALUES (?, ?, ?)";
            db.query(insertSql, [product_id, quantity, date], (err, result) => {
                if (err) {
                    console.error("Error inserting stock out:", err);
                    return res.status(500).json("Error recording stock out");
                }
                return res.status(200).json("Stock out recorded successfully");
            });
        });
    });
};


// const updatedStockout = (req, res) => {
//     const {id} = req.params;
//     const { product_id, quantity, date } = req.body;
//     const sql = "UPDATE stock_in SET productID = ?, quantity = ?, date = ? WHERE stockinID = ?";
//     const values = [product_id, quantity, date, id];
//     db.query(sql, values, (err, result) => {
//         if(err){
//             console.log("error updating stockin",err);
//             return res.status(500).json("Error updating stockin");
//         }
//         return res.status(200).json("stockin has been updated");
//     })
// }

// const deleteStockin = (req, res) => {
//     const{id} = req.params;
//     const sql = "DELETE FROM stock_in WHERE stockin = ?";
//     db.query(sql, [id], (err, result) => {
//         if(err){
//             console.log("error deleting stockin",err);
//         }
//         return res.status(200).json("stockin has been deleted");
//     })
// }

module.exports = {
    getAllStockout,
    createStockout,
    // updatedStockin,
    // deleteStockin
}