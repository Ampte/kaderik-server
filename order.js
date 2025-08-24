const express = require("express");
const db = require("./database");
const router = express.Router();


router.post("/api/add-orders", (req, res) => {
    const {product_name, product_description, product_price, quantity, customer_name, customer_email, delivery_address} = req.body;

    const sql = "INSERT INTO orders(product_name, product_description, product_price, quantity, customer_name, customer_email, customer_address) VALUES(?, ?, ?, ?, ?, ?, ?)"

    const proccess = db.prepare(sql);

    const result = proccess.run(product_name, product_description, product_price, quantity, customer_name, customer_email, delivery_address);

    if(result.changes > 0){
        res.json({message : "Order placed successfully"});
    };
});

router.get("/api/get-orders", (req, res) => {
    const sql = "SELECT * FROM orders";

    const proccess = db.prepare(sql);

    const result = proccess.all();

    if(result){
        res.json(result);
    };
});

router.get("/api/get-total-orders", (req, res) => {
    const sql = "SELECT COUNT(order_id) AS total FROM orders";

    const proccess = db.prepare(sql);

    const result = proccess.get();

    if(result){
        res.json(result);
    };
});

router.get("/api/get-sales", (req, res) => {
    const sql = "SELECT SUM(product_price) AS sale FROM orders";

    const proccess = db.prepare(sql);

    const result = proccess.get();

    if(result){
        res.json(result);
    };
});

module.exports = router;