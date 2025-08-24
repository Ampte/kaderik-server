const express = require("express");
const router = express.Router();
const db = require("./database");


router.post("/api/add-customers", (req, res) => {
    const {name, email, phone, address} = req.body;

    const sql = "INSERT INTO customers(customer_name, customer_email, customer_phone_number, customer_address) VALUES(?, ?, ?, ?)";

    const proccess = db.prepare(sql);

    const result = proccess.run(name, email, phone, address);

    if(result.changes > 0){
        res.json({message : 'Customer added successfully'});
    };
});


router.get("/api/get-customers", (req, res) => {

    const sql = "SELECT * FROM customers";

    const proccess = db.prepare(sql);

    const result = proccess.all();

    if(result){
        res.json(result);
    };
});

router.get("/api/get-total-customers", (req, res) => {
    const sql = "SELECT COUNT(customer_id) AS total FROM customers";

    const proccess = db.prepare(sql);
    
    const result = proccess.get();

    if(result){
        res.json(result);
    };
});

module.exports = router;