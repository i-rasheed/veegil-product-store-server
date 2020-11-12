const router = require("express").Router();
const auth = require("../middleware/auth");
const Product = require("../models/productModel");

// post product
router.post("/", auth, async (req, res) => {
    try {
      const { name, price } = req.body;
  
      // validate
  
      if (!name || !price)
        return res.status(400).json({ message: "Not all fields have been entered." });

        const newProduct = new Product({
            name,
            price,
            userId: req.user.id
        })
            const savedProduct = await newProduct.save()
            res.status(201).json({success: true, message:"Successfully added " + savedProduct.name, savedProduct})
          } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  // get all products 
  router.get("/all", auth, async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // delete a single product
  router.delete("/:id", auth, async (req, res) => {
    try {
        if(req.user.role != "admin"){
          return res.status(401).json({ success: false, message: "You are not authorized to perform this action." })
        } else{
          const deletedProduct = await Product.findByIdAndDelete(req.params.id);
          res.status(200).json({ success: true, message: "Successfully deleted " + deletedProduct.name, deletedProduct})
        }
       
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // get a single product
  router.get("/:id", async (req, res) => {
    try {
        const products = await Product.findById(req.params.id)
        res.status(200).json({success:true, products})
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  
  // edit product
router.put("/:id", auth, async (req, res) => {
  try {
    if(req.user.role != "admin"){
      return res.status(401).json({ success: false, message: "You are not authorized to perform this action." })
    } else{
      const product = await Product.findById(req.params.id);
        product.name = req.body.name;
        product.price = req.body.price;
        product.userId = req.user.id;
  
        const editedProduct = await product.save()
      res.status(200).json({ success: true, message: "Successfully updated", editedProduct})
    }
  } catch (err) {
    res.status(500).json({error : err.message });
  }








})









module.exports = router;