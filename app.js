import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/auth.js"
import session from "express-session"
import flash from 'connect-flash'
import MongoStore from "connect-mongo";
 
const app  = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json())
dotenv.config();
app.use(session({
    secret:'123',
    resave:false,
    saveUninitialized:false,
    store:MongoStore.create({
      mongoUrl:process.env.dbURL,
      collectionName:'sessions'
    })
}))
app.use(flash())
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




