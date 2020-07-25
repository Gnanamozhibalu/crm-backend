var express = require('express');
var router = express.Router();
const mongodb=require("mongodb");
const bodyparser=require("body-parser");
const url=""
const app=express();
app.use(bodyparser.json())

/* GET home page. */
router.get('/', async function(req, res, next) {
  console.log(req.body);
  res.render('index', { title: 'hello' });
  try{
   let client=await mongodb.connect(url);
   let db=client.db("test");
   let data= await db.collection("users").insertOne(req.body);
   await client.close();
  }catch(error){
   console.log(error);
  }
});

/* app.listen(process.env.PORT||4040,function(){
  console.log("Server Listening");
}) */


module.exports = router;
