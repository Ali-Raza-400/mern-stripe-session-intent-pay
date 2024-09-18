const express = require("express");
const Product = require("../models/product.model");
const router = express.Router();

const createProducts = async (req, res) => {
  const body = req.body;
  // console.log(body); // You will get the products here. You can store this in your database.

  try {
    const products = await Product.create(body);
    console.log("products:::", products);
    //save the products
    const savedProduct = await products.save();
    console.log("savedProduct:::", savedProduct);
    res.status(201).json(savedProduct);
  } catch (error) {
    console.log("====>", error.message);
  }

  // res.json({ msg: "hello" });
};

const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);

    // Calculate the start and end indexes for the requested page
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    // Slice the products array based on the indexes
    const products = await Product.find();
    const paginatedProducts = products.slice(startIndex, endIndex);
    // Calculate the total number of pages
    const totalPages = Math.ceil(products.length / pageSize);

    // Send the paginated products and total pages as the API response
    res.json({ data: paginatedProducts, totalPages }); 
  } catch (error) {
    console.log(error.message);
  }
};

router.post("/create", createProducts);
router.get("/list", getAllProducts);

module.exports = router;
