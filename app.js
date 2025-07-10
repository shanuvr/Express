import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/auth.js"
import session from "express-session"
const app = express();
app.use(express.urlencoded())
app.use(express.json())
dotenv.config();
app.use(session({
    secret:'123',
    resave:false,
    saveUninitialized:true
}))
app.use(router)
app.set('view engine','ejs')
const PORT = process.env.PORT || 5000
mongoose.connect(process.env.dbURL).then((data) => {
  console.log("data basse connected");
  app.listen(PORT, () => {
    console.log("server started");
  });
}).catch((Err)=>{console.log(Err);
})




