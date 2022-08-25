const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

/**Connect app to mysql db */
const mysql = require("mysql2");
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "contact_database"
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

/**Api to get all contacts from database */
app.get("/api/get", (req, res)=>{
    const getQuery = "SELECT * FROM contact_table";
    db.query(getQuery, (error, result)=>{
        res.send(result);
    })
});
/**Add a contact API */
app.post("/api/add", (req, res)=>{
    const {name, email, contact} = req.body;
    const insertQuery = "INSERT INTO contact_table (name, email, contact) VALUES (?,?,?)";
    db.query(insertQuery, [name, email, contact], (error, result)=>{
        if (error) {
            console.error(error);
        }else{
            console.log(result);
            res.send(result);
        }
    })
});
/**Delete a contact by id */
app.delete("/api/remove/:id", (req, res)=>{
    const myid = req.params.id;
    const deleteSQL = "DELETE FROM contact_table WHERE id = ?";
    db.query(deleteSQL, myid, (err, result)=>{
        if(err){
            console.error(err)
        }else{
            res.send(result);
        }
    })
});

/**Get single contact by id */
app.get("/api/single/:id", (req, res)=>{
    const myID = req.params.id;
    const getSingleDataQuery = "select * from contact_table where id = ?";
    db.query(getSingleDataQuery, [myID], (err, result)=>{
        if(err){
            console.error(err)
        }else{
            res.send(result);
        }
    });
});

/**Update single contact by id */
app.put("/api/update/:id", (req, res)=>{
    const id = req.params.id;
    const {name, email, contact} = req.body;
    const updateQuery = "update contact_table set name = ?, email = ?, contact = ? where id = ? ";
    db.query(updateQuery, [name, email, contact, id], (err, result)=>{
        if(!err){
            res.send(result);
        }else{
            console.error(err);
        }
    });
})

app.get("/", (req, res)=>{
    /**Test connection */
    // const sqlInsert = "INSERT INTO contact_table (name, email, contact) VALUES ('dennis', 'dennis@gmail.com','090896978567')";
    // db.query(sqlInsert, (error, result)=>{
    //     console.log('error: ', error);
    //     console.log('result:', result);
    //     res.send("hello everyone");
    // })
});

app.listen(7000, ()=>{
    console.log("server is running hahah");
})