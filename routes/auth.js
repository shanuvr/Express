import express from "express";
import {
  showLogin,
  handleLogin,
  handleLogout,
} from "../controllers/authController.js";
import userModel from "../models/user.js";
import productModel from "../models/product.js";
import { name } from "ejs";
const router = express.Router();

router.get("/", showLogin);

router.post("/login", handleLogin);

router.get("/logout", handleLogout);

router.get("/adminHome", async (req, res) => {
  if (req.session.user) {
    let users = await userModel.find();
    res.render("adminHome", { users });
  } else {
    res.redirect("/");
  }
});
router.get("/userHome", (req, res) => {
  if (req.session.user) {
    res.render("userHome", { user: req.session.user });
  } else {
    res.redirect("/");
  }
});
router.get("/addUser", (req, res) => {
  res.render("addUser");
});

router.post("/submit", async (req, res) => {
  await userModel.insertOne(req.body);
  res.redirect("/adminHome");
});

router.get("/delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    await userModel.findByIdAndDelete(userId);
    res.redirect("/adminHome");
  } catch (error) {
    console.log(error);
  }
});

router.get("/update/:id", async (req, res) => {
  const userId = req.params.id;
  let updateUser = await userModel.findById(userId);

  res.render("editUser", { user: updateUser });
});
router.post("/update-user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    await userModel.findByIdAndUpdate(userId, {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      role: req.body.role,
    });
    res.redirect("/adminHome");
  } catch (err) {
    console.log(err);
  }
});

router.get("/addproduct", (req, res) => {
  res.render("addProduct");
});

router.post("/insertProducts", async (req, res) => {
  console.log(req.body);

  await productModel.insertOne(req.body);
  res.redirect("adminHome");
});

router.get("/showproducts", async (req, res) => {
  const products = await productModel.find();
  res.render("showproducts", { products });
});
router.get("/delete2/:id", async (req, res) => {
  const id = req.params.id;
  await productModel.findByIdAndDelete(id);
  res.redirect("/showproducts");
});
router.get("/edite2/:id", async(req, res) => {
  const productId = req.params.id
let product = await productModel.findById(productId)
console.log(product);

  res.render("editproduct",{product:product});
});
router.post('/update-edite/:id',async(req,res)=>{
  const productId = req.params.id
  await productModel.findByIdAndUpdate(productId,{
    name: req.body.name,
    price:req.body.price,
    category:req.body.category,
    price:req.body.price,
    description:req.body.description
  })
  res.redirect('/showproducts')
})  
export default router;
