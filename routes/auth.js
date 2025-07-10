import express from "express";
import {
  showLogin,
  handleLogin,
  handleLogout,
  
} from "../controllers/authController.js";
import userModel from "../models/user.js";
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
    res.render("userHome");
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
  } catch (err) {
    console.log(err);
  }
});

router.get('/update/:id', async(req,res)=>{
     const userId = req.params.id;
    let updateUser = await userModel.findById(userId);
    console.log(updateUser);
    
    res.render('editUser',{user:updateUser})
})
 router.post('/update-user/:id',async(req,res)=>{
    try{
        const userId = req.params.id
        await userModel.findByIdAndUpdate(userId,{
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:req.body.password,
            role:req.body.role

        })
        res.redirect('/adminHome')

    }catch(err){
        console.log(err);
        
    }
 })
export default router;
