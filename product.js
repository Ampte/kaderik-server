const express = require("express");
const db = require("./database");
const router = express.Router();



router.post("/api/add-product",(req, res) => {
    const {product_name, product_description, product_price, product_image} = req.body;

    const sql = "INSERT INTO products(product_name, product_description, product_price, product_image) VALUES (?,?,?,?)";

    const proccess = db.prepare(sql);

    const result = proccess.run(product_name, product_description, product_price, product_image);

    if(result.changes > 0){
        return res.status(200).json({message : "Products added successfuly"});
    };
});


router.get("/api/get-product", (req, res) => {
    const sql = "SELECT * FROM products";

    const proccess = db.prepare(sql);

    const result = proccess.all();

    if(result.length > 0) {
        return res.json(result);
    }else{
        console.log("Error");
    };
});


router.get("/api/get-product/:id", (req, res) => {
    const {id} = req.params;

    const sql = "SELECT * FROM products WHERE id = ?";

    const proccess = db.prepare(sql);

    const result = proccess.get(req.params.id);

    if(result){
        res.json(result);
    }else{
        console.log("Error");
    };
});


router.delete("/api/delete-product/:id", (req, res) => {
    const {id} = req.params;

    const sql = "DELETE FROM products WHERE id = ?";

    const proccess = db.prepare(sql);

    const result = proccess.run(req.params.id);

    if(result){
        return res.json({message : "Product delete successfully"});
    };
});


router.put("/api/patch-product/:id", (req, res) => {
    const {id} = req.params;
    const {product_name, product_description, product_price, product_image} = req.body;

    const sql = "UPDATE products SET product_name = ?, product_description = ?, product_price = ?, product_image = ? WHERE id = ?";

    const proccess = db.prepare(sql);

    const result = proccess.run(product_name, product_description, product_price, product_image, id);
    
    if(result){
        return res.json({message : 'Product updated successfully'});
    };
});


module.exports = router;