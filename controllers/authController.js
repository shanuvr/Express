import userModel from "../models/user.js";
import productModel from "../models/product.js";
import bcrypt from "bcrypt";

const showLogin = (req, res) => {
  const message = req.flash("message");
  res.render("login",{message});
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  const userFound = await userModel.findOne({ email });

   if (!userFound) {
    req.flash("message", "User not found");
    return res.redirect("/login");
  }

  const passwordMatched = await bcrypt.compare(password, userFound.password);

  if(passwordMatched&&userFound.active=="disable") {
    req.flash("message", "User is Inactive");
    return res.redirect("/login");
  }

  if (!passwordMatched) {
    req.flash("message", "Incorrect Password");
    return res.redirect("/login");
  }

  const dataToSet = {
    id: userFound._id,
    name: userFound.name,
    email: userFound.email,
    phone: userFound.phone,
    role: userFound.role,
    active:userFound.active
  };

  if (userFound.role == "admin" && userFound.active=='enable') {
    req.session.admin = dataToSet;
    res.redirect("/adminHome",);
  } else {
    req.session.user = dataToSet;
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

const adminHome = async (req, res) => {
  if (req.session.admin) {
    let users = await userModel.find();
    res.render("adminHome", { users });
  } else {
    res.redirect("/");
  }
};

const userHome = async (req, res) => {
  if (req.session.user) {
    const products = await productModel.find();
    res.render("userHome", { user: req.session.user, product: products });
  } else {
    res.redirect("/");
  }
};

const submit = async (req, res) => {
  const { name, email, phone, password, role,active } = req.body;
  const hashpass = await bcrypt.hash(password, 10);
  await userModel.insertOne({
    name: name,
    email: email,
    phone: phone,
    password: hashpass,
    role: role,
    active:active
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
  if(req.session.admin){
    try {
    const userId = req.params.id;
    let updateUser = await userModel.findById(userId);

    res.render("editUser", { user: updateUser });
  } catch (err) {
    console.log(err);
  }
  }else{
    res.redirect('/')
  }
  
};
const UpdateUser2 = async (req, res) => {
  
     try {
    const userId = req.params.id;
    console.log(req.body);
    
    await userModel.findByIdAndUpdate(userId, {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      role: req.body.role,
      active:req.body.active
    });
    res.redirect("/adminHome");
  } catch (err) {
    console.log(err);
  }
  
 
};

export {
  showLogin,
  handleLogin,
  handleLogout,
  addUser,
  adminHome,
  userHome,
  submit,
  deleteUser,
  updateUser,
  UpdateUser2,
};
