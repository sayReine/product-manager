const db = require('../config/db')

const createUser = (req, res) => {
    const { username, password,usertype} = req.body;
    const checksql = "SELECT * FROM users WHERE username = ?";
    db.query(checksql, [username], (err, result) => {
        if(err){
            console.log("error fetching user",err);
        }
        if (result.length > 0){
            return res.status(400).json("User already exists");
        }
        const sql = "INSERT INTO users (userName, passWord,userType) VALUES (?,?,?)";
        const values = [username, password,usertype];
        db.query(sql, values, (err, result) => {
            if(err){
                console.log("error inserting user",err);
            }
            return res.status(200).json("User has been created");
        })
    })

}



const login = (req, res) => {
    const { username, password,usertype} = req.body;
    if(!username || !password || !usertype){
        return res.status(400).json("all fields are required");
    }
    const sql = "SELECT * FROM users WHERE userName = ? AND passWord = ? AND userType = ?";
    db.query(sql, [username, password,usertype], (err, result) => {
        if(err){
            console.log("error fetching user",err);
        }
        if (result.length === 0){
            return res.status(400).json("User does not exist");
        }
        return res.status(200).json(result);
    })
    
}

const getAllUsers = (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, result) => {
        if(err){
            console.log("error fetching users",err);
        }
        return res.status(200).json(result);
    })
}

module.exports = {
    createUser,
    getAllUsers,
    login
}