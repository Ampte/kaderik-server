const express = require("express");
const db = require("./database");
const router = express.Router();


router.post("/api/add-admin", (req,res) => {
    const {name, email, phone} = req.body;

    const sql = "INSERT INTO admin(admin_name, admin_email, admin_phone) VALUES(?, ?, ?)";

    const proccess = db.prepare(sql);

    const result = proccess.run(name, email, phone);

    if(result.length > 0){
        res.json({message : "Admin added"});
    }
});

router.get("/api/get-admin/:phone", (req, res) => {
    const {phone} = req.params;

    const sql = "SELET FROM admin WHERE admin_phone = ?";

    const proccess = db.prepare(sql);

    const result = proccess.get(phone);

    if(result){
        res.json(result);
    };
});

module.exports = router;