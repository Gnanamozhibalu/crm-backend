var express = require('express');
var router = express.Router();
const mongodb=require("mongodb");
const bodyparser=require("body-parser");
const dotEnv=require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const url=process.env.DB;
const app=express();
app.use(bodyparser.json())
/* GET users listing. */


async function authenticate(req,res,next){
   try{
     console.log(req.headers.authorization);
     console.log(req);
    if(req.headers.authorization!==undefined){
        let verifyToken=await jwt.verify(req.headers.authorization,process.env.JWT);
        console.log(verifyToken);
        req.id=verifyToken.id;
        req.role=verifyToken.role;
        next();
    }else{
        res.status(401).json({
            message:"Not Authorized"
        })
    }
   }catch(error){
       console.log(error);
   }
}
router.get("/",[authenticate],async (req,res)=>{
  let client = await mongodb.connect(url);
  let db = client.db("test");
  let currentUser = await db.collection("users").find({_id:mongodb.ObjectId(req.id)}).project({password:false}).toArray();
  await client.close();
  res.json({
    message:"Very secret Information!!!!",
    user:currentUser
  })
})
router.post("/", async (req, res) => {
//console.log(url);
  try {
    let client = await mongodb.connect(url);
    let db = client.db("test");
    let currentUser = await db.collection("users").findOne({email:req.body.email});
    let result=await bcrypt.compare(req.body.password,currentUser.password);
    console.log(result);
    if(result==true){
        let jwtToken=await jwt.sign({id:currentUser._id,role:"LEAD"},process.env.JWT);
        console.log(jwtToken);
        res.json({
            message:"success",
            token:jwtToken
        })
    }else{
        res.json({
            message:"Error"
        })
    }
    await client.close();
  } catch (err) {
    console.log(err);
  }
});



module.exports = router;
