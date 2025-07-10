import userModel from "../models/user.js";

const showLogin = (req, res) => {
  res.render("login");
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  const userFound = await userModel.findOne({ email });
  if (!userFound) {
    res.send("user not found");
  } else if (password == userFound.password && userFound.role == "admin") {
    req.session.user={
        id:userFound._id,
        name:userFound.name,
        email:userFound.email,
<<<<<<< HEAD
=======
        phone:userFound.phone,
>>>>>>> 833d60a (final)
        role:userFound.role
    }
    res.redirect('/adminHome')
  } else if (password!== userFound.password && userFound.role == "admin") {
    res.send("incorrect passowrd");
  }
  else if (password!== userFound.password && userFound.role == "user") {
    res.send("incorrect passowrd");
  } else if (password == userFound.password && userFound.role == "user") {
    console.log(req.session);
    
    req.session.user={
        id:userFound._id,
        name:userFound.name,
        email:userFound.email,
<<<<<<< HEAD
        role:userFound.role
=======
        role:userFound.role,
        phone:userFound.phone
>>>>>>> 833d60a (final)

    }
    console.log(req.session.user);
    res.redirect('/userHome')
  }
};

const handleLogout = (req, res) => {
    req.session.destroy(()=>{
        res.redirect('/')
    })
};



const addUser = (req,res)=>{
  res.redirect('/addUser')
}

export { showLogin, handleLogin, handleLogout ,addUser};
