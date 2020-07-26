var express = require('express');
var router = express.Router();
const mongodb=require("mongodb");
const bodyparser=require("body-parser");
const dotEnv=require("dotenv").config();
const bcrypt = require('bcrypt');
const url=process.env.DB;
const app=express();
app.use(bodyparser.json())
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post("/", async (req, res) => {
  console.log(req.body);
  res.send("yes working");
  let salt=await bcrypt.genSalt(10); 
  let hash=await bcrypt.hash(req.body.password,salt);
  req.body.password=hash;
 

//console.log(url);
  try {
    let client = await mongodb.connect(url);
    let db = client.db("test");
    console.log(db);
    let data = await db.collection("users").insertOne(req.body);
    await client.close();
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
