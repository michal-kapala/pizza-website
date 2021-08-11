const express = require('express')
const cors = require('cors')
const app = express()
const mysql = require('mysql2')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Parolaladatabase254',
    database: 'medieval'
})

app.use(cors());
app.use(express.json());

// cart table
// app.post('/api/insertCart', (req, res) => {

//     const Name = req.body.UserId
    
//     const sqlInsert = "INSERT INTO products (Name, Price, Description, Image, Category) VALUES (?, ?, ?, ?, ?)"
//     db.query(sqlInsert, [Name, Price, Description, Image, Category], (err, result) => {
//         console.log(result)
//     })
// })

// products table 

// get all data
app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM products";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})

//get only pizza category
app.get('/api/getPizza', (req, res) => {
    const sqlSelect = "SELECT * FROM products WHERE Category = 'pizza';";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})

app.post('/api/insert', (req, res) => {

    const Name = req.body.Name
    const Price = req.body.Price
    const Description = req.body.Description
    const Image = req.body.Image
    const Category = req.body.Category
    
    const sqlInsert = "INSERT INTO products (Name, Price, Description, Image, Category) VALUES (?, ?, ?, ?, ?)"
    db.query(sqlInsert, [Name, Price, Description, Image, Category], (err, result) => {
        console.log(result)
    })
})

app.delete('/api/delete/:Name', (req, res) => {
    const name = req.params.Name;
    const sqlDelete = "DELETE FROM products WHERE Name = ?";

    db.query(sqlDelete, name, (err, result) => {
        if (err) console.log(err);
    })
})

// This is the update of db, I will use it for update password of users and maybe cart functionality
app.put('/api/update', (req, res) => {
    const name = req.body.Name;
    const price = req.body.Price;
    const sqlUpdate = "UPDATE products SET Price = ? WHERE Name = ?";

    db.query(sqlUpdate, [price, name], (err, result) => {
        if (err) console.log(err);
    })
})

app.listen(3001, () => {

})