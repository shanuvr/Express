import express from "express";
import {
  showLogin,
  handleLogin,
  handleLogout,
  adminHome,
  userHome,
  submit,
  deleteUser,
  updateUser,
  UpdateUser2,
  
} from "../controllers/authController.js";
import {insertProduct,showProduct,deleteProduct,editProduct,updateProduct} from '../controllers/productController.js'
import userModel from "../models/user.js";
import productModel from "../models/product.js";


const router = express.Router();

router.get("/", showLogin);
router.get("/login", showLogin);

router.post("/login", handleLogin);

router.get("/logout", handleLogout);

router.get("/adminHome", adminHome)

router.get("/userHome", userHome)

router.get("/addUser", (req, res) => {
  res.render("addUser");
});

router.post("/submit",submit)

router.get("/delete/:id",deleteUser )

router.get("/update/:id", updateUser);
router.post("/update-user/:id", UpdateUser2)

router.get("/addproduct", (req, res) => {
  res.render("addProduct");
});

router.post("/insertProducts",insertProduct)

router.get("/showproducts", showProduct)

router.get("/delete2/:id", deleteProduct)

router.get("/edite2/:id", editProduct)

router.post('/update-edite/:id',updateProduct) 
export default router;
