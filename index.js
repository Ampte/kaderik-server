const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const products = require("./product.js");
const admin = require("./admin.js");
const customers = require("./customer.js");
const orders = require("./order.js");


app.use(cors());
app.use(express.json());

app.use(products);
app.use(admin);
app.use(customers);
app.use(orders);


app.get("/",(req, res) => {
    res.send("Hello world");
});


app.listen(port, () => {
    console.log("App is running on port 3000");
});