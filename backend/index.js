/**Import our dependencies */
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mysql = require("mysql2")
const e = require("express")

/**create an object from express */
const app = express()

/**tell what our app to use */
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

/**Lets run our api on port 7000 */
app.listen(7070, ()=>{
    console.log("Ourn API is running")
})

 /**connect database to our project */
 const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"12345678",
    database:"contact_database"
 })

 /**GET all contact API */
 app.get("/getall", (req, res)=>{
    const getAllContacts = "select * from contact_table";
    db.query(getAllContacts, (err, result)=>{
        if(!err){
            res.send(result)
        }else{
            console.error(err)
        }
    })
 })
 /**API to add a contact */

 app.post("/add", (req, res)=>{
    const {name, email, phone_no} = req.body;
    const addQuery = "insert into contact_table (name, email, phone_no) values (?,?,?)"
    db.query(addQuery, [name, email, phone_no], (err, result)=>{
        if(!err){
            res.send("Succesfully added a contact")
        }else{
            console.error(err)
        }
    })
 })

 /**API to get single contact by id */
 app.get("/getsingle/:id", (req, res)=>{
    const id = req.params.id
    const getsingleContact = "select * from contact_table where id = ?";
    db.query(getsingleContact, [id], (err, result)=>{
        if (!err) {
            res.send(result)
        }else{
            res.send("User not found")
        }
    })
 })

 /**API to update a contact */
 app.put("/update/:id", (req, res)=>{
    const id = req.params.id;
    const {name, email, phone_no} = req.body
    const updateQuery = "UPDATE contact_table SET name = ?, email = ?, phone_no = ? WHERE id = ?";
    db.query(updateQuery, [name,email,phone_no,id], (err, result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
        }
    })
 })

 /**API to delete contact */
 app.delete("/delete/:id", (req, res)=>{
    const id = req.params.id;
    const deleteQuery = "delete from contact_table where id = ?"
    db.query(deleteQuery, [id], (err, result)=>{
        if (!err) {
            res.send("Succesfully deleted this contact")
        }else{
            res.send("Hasn't been deleted! Try again")
        }
    })
 })


