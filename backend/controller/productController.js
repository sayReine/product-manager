const db =  require('../config/db.js')

const createProduct = (req,res) =>{
    const {productname, buyunitprice, sellunitprice} = req.body;
    if (!productname || isNaN(buyunitprice) || isNaN(sellunitprice)) {
        return res.status(400).json("Invalid input");
    }

    // productname = productname.trim();

    const checkproduct = "SELECT * FROM products WHERE productName = ?";

       db.query(checkproduct, [productname], (err, result) => {
           if(err){
               console.log("error fetching users",err);
               return res.status(500).json("Database error");
           }
           if (result.length > 0){
               return res.status(400).json("product already exists");
           }

           const sql = "INSERT INTO products ( productName,buyUnitPrice, sellUnitPrice) VALUES (?,?,?)";
           const values = [productname, buyunitprice, sellunitprice];

            db.query(sql, values, (err, result) => {
              if(err){
                 console.error("error inserting product",err);
                 return res.status(500).json("Error creating product");
               }
               return res.status(200).json("product has been created");
       });
       });
    
};

const getAllProduct = (req, res) => {
    const sql = "SELECT * FROM products";
    db.query(sql, (err, result) => {
        if(err){
            console.log("error fetching products",err);
        }
        return res.status(200).json(result);
    })
}

const updateProduct = (req,res) =>{
    const {id} = req.params;
    const {productname, buyunitprice, sellunitprice} = req.body;
    const sql = "UPDATE products SET productName = ?, buyUnitPrice = ?, sellUnitPrice = ? WHERE productID = ?";
    const values = [productname, buyunitprice, sellunitprice, id];
    db.query(sql, values, (err, result) => {
        if(err){
            console.log("error updating product",err);
            return res.status(500).json("Error updating product");
        }
        return res.status(200).json("product has been updated");
    })
}

const deleteProduct = (req,res) =>{
    const{id} = req.params;
    const sql = "DELETE FROM products WHERE productID = ?";
    db.query(sql, [id], (err, result) => {
        if(err){
            console.log("error deleting product",err);
        }
        return res.status(200).json("product has been deleted");
    })
}

module.exports = {
    createProduct,
    getAllProduct,
    updateProduct,
    deleteProduct
}