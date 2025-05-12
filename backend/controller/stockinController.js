const db = require ('../config/db.js')

const getAllStockin = (req, res) => {
    const sql = `
    SELECT 
    p.productID,
  p.productName,
   (IFNULL(SUM(si.quantity),0)-IFNULL(SUM(so.quantity),0)) AS totalStockInQty,
   si.date
FROM stock_in si
LEFT JOIN products p ON si.productID = p.productID
LEFT JOIN stock_out so ON si.productID = so.productID
GROUP BY si.productID;
    `;
    db.query(sql, (err, result) => {
        if(err){
            console.log("error fetching users",err);
        }
        return res.status(200).json(result);
    })
}

const createStockin = (req, res) => {
    const { product_id, quantity, date } = req.body;
    if(!product_id || !quantity || !date){
        return res.status(400).json("All fields are required");
    }
    const checkstock = "SELECT * FROM stock_in WHERE productID = ? AND date = ? ";
    db.query(checkstock, [product_id, date], (err, result) => {
        if(err){
            console.log("error fetching stock",err);
            return res.status(500).json("Database error")
        }
        if (result.length > 0){
            const sql = "UPDATE stock_in SET  quantity = ? WHERE productID = ? AND date = ? ";
             const values = [quantity, product_id,  date];
             db.query(sql, values, (err, result) => {
                 if(err){
                     console.log("error updating stockin",err);
                     return res.status(500).json("Error updating stockin");
                 }
                 return res.status(200).json("stockin has been updated");
             })
        }else{
            const sql = "INSERT INTO stock_in ( productID,quantity, date) VALUES (?,?,?)";
        const values = [product_id, quantity, date];
         db.query(sql, values, (err, result) => {
           if(err){
              console.log("error inserting user",err);
            }
            return res.status(200).json("Stockin has been created");
    })
        }
        
    })
}

// const updatedStockin = (req, res) => {
//     const {id} = req.params;
//     const { product_id, quantity, date } = req.body;
//     const sql = "UPDATE stock_in SET productID = ?, quantity = ?, date = ? WHERE productID = ?";
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
//     const sql = "DELETE FROM stock_in WHERE productID = ?";
//     db.query(sql, [id], (err, result) => {
//         if(err){
//             console.log("error deleting stockin",err);
//         }
//         return res.status(200).json("stockin has been deleted");
//     })
// }

module.exports = {
    getAllStockin,
    createStockin,
    // updatedStockin,
    // deleteStockin
}