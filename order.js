const express = require("express");
const db = require("./database");
const router = express.Router();

// Add order
router.post("/api/add-orders", (req, res) => {
  try {
    const {
      product_name,
      product_description,
      product_price,
      quantity,
      customer_name,
      customer_email,
      delivery_address, // <-- from frontend
    } = req.body;

    const sql = `
      INSERT INTO orders(
        product_name, product_description, product_price, quantity,
        customer_name, customer_email, delivery_address
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const process = db.prepare(sql);
    const result = process.run(
      product_name,
      product_description,
      product_price,
      quantity,
      customer_name,
      customer_email,
      delivery_address
    );

    if (result.changes > 0) {
      res.json({ message: "Order placed successfully" });
    } else {
      res.status(400).json({ message: "Failed to place order" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all orders
router.get("/api/get-orders", (req, res) => {
  try {
    const sql = "SELECT * FROM orders";
    const process = db.prepare(sql);
    const result = process.all();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get total orders count
router.get("/api/get-total-orders", (req, res) => {
  try {
    const sql = "SELECT COUNT(order_id) AS total FROM orders";
    const process = db.prepare(sql);
    const result = process.get();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get total sales (price × quantity)
router.get("/api/get-sales", (req, res) => {
  try {
    const sql = "SELECT SUM(product_price * quantity) AS sale FROM orders";
    const process = db.prepare(sql);
    const result = process.get();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
