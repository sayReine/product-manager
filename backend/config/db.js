const mysql = require('mysql')

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"juice_depot"
})

db.connect((err) => {
    if(err){
        console.error("error connecting to the db:",err);
    }
    return console.log("connected to mySQL");
})

module.exports = db