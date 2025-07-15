import userModel from "../models/user.js";
import productModel from "../models/product.js";

const showLogin = (req, res) => {
  res.render("login");
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  const userFound = await userModel.findOne({ email });
  if (!userFound) {
    res.send("user not found");
  } else if (password == userFound.password && userFound.role == "admin") {
    req.session.user = {
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
  } else if (password == userFound.password && userFound.role == "user") {
    console.log(req.session);

    req.session.user = {
      id: userFound._id,
      name: userFound.name,
      email: userFound.email,
      role: userFound.role,
      phone: userFound.phone,
    };
    console.log(req.session.user);
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
  if (req.session.user) {
    let users = await userModel.find();
    res.render("adminHome", { users });
  } else {
    res.redirect("/");
  }
};

const userHome = async(req, res) => {
  if (req.session.user) {
     const products = await productModel.find();
    res.render("userHome", { user: req.session.user,product:products });
  } else {
    res.redirect("/");
  }
};

const submit =  async (req, res) => {
  await userModel.insertOne(req.body);
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
  const userId = req.params.id;
  let updateUser = await userModel.findById(userId);

  res.render("editUser", { user: updateUser });
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
