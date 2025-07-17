import userModel from "../models/user.js";
import productModel from "../models/product.js";
import bcrypt from 'bcrypt'

const showLogin = (req, res) => {
  res.render("login");
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  const userFound = await userModel.findOne({ email });
  if (!userFound) {
    res.send("user not found");
  } else if (await(bcrypt.compare(password,userFound.password)) && userFound.role == "admin") {
    req.session.admin = {
      id: userFound._id,
      name: userFound.name,
      email: userFound.email,
      phone: userFound.phone,
      role: userFound.role,
    };
    res.redirect("/adminHome");
  } else if (password !== userFound.password && userFound.role == "admin") {
    res.send("incorrect passowrd");
  } else if (password !== userFound.password && userFound.role == "user") {
    res.send("incorrect passowrd");
  } else if (await (bcrypt.compare(password,userFound.password)) && userFound.role == "user") {
    req.session.user = {
      id: userFound._id,
      name: userFound.name,
      email: userFound.email,
      role: userFound.role,
      phone: userFound.phone,
    };
   
    res.redirect("/userHome");
  }
};

const handleLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

const addUser = (req, res) => {
  res.redirect("/addUser");
};

const adminHome =async (req, res) => {
  
  if (req.session.admin) {
    let users = await userModel.find();
    res.render("adminHome", { users });
  } else {
    res.redirect("/");
  }
};

const userHome = async(req, res) => {
  if (req.session.user) {
    
     const products = await productModel.find();
    res.render("userHome", { user:req.session.user,product:products });
  } else {
    res.redirect("/");
  }
};

const submit =  async (req, res) => {
  
   const{name,email,phone,password,role} = req.body
   const hashpass = await bcrypt.hash(password,10)
  await userModel.insertOne({
    name:name,
    email:email,
    phone:phone,
    password:hashpass,
    role:role
});
 
  res.redirect("/adminHome");
  
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await userModel.findByIdAndDelete(userId);
    res.redirect("/adminHome");
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try{
    const userId = req.params.id;
  let updateUser = await userModel.findById(userId);

  res.render("editUser", { user: updateUser });

  }catch(err){
    console.log(err);
    
  }
};
const UpdateUser2 = async (req, res) => {
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
};

export { showLogin, handleLogin, handleLogout, addUser,adminHome,userHome,submit,deleteUser,updateUser,UpdateUser2};
