const Database = require("better-sqlite3");
const db = new Database("database.db");

db.exec(`
    
    CREATE TABLE IF NOT EXISTS products(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT,
    product_description TEXT,
    product_price INTEGER,
    product_image TEXT
    );

    CREATE TABLE IF NOT EXISTS admin(
    admin_id INTEGER PRIMARY KEY AUTOINCREMENT,
    admin_name TEXT,
    admin_email TEXT,
    admin_phone INTEGER
    );

    CREATE TABLE IF NOT EXISTS customers(
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT,
    customer_email TEXT,
    customer_phone_number INTEGER,
    customer_address TEXT
    );

    CREATE TABLE IF NOT EXISTS orders(
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    product_name TEXT,
    product_description TEXT,
    product_price INTEGER,
    quantity INTEGER,
    customer_name TEXT,
    customer_email TEXT,
    delivery_address TEXT
    );

    `);

    module.exports = db;