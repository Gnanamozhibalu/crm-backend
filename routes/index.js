var express = require('express');
var router = express.Router();
const mongodb=require("mongodb");
const bodyparser=require("body-parser");
const url=process.env.DB;
const app=express();
app.use(bodyparser.json())

/* GET home page. */
/* router.get('/', async function(req, res, next) {
  res.render('index', { title: 'hello' });
  try{
   let client=await mongodb.connect(url);
   let db=client.db("test");
   let data= await db.collection("users").insertOne(req.body);
   await client.close();
  }catch(error){
   console.log(error);
  }
}); */
app.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    let client = await mongodb.connect(url);
    let db = client.db("test");
    console.log(db);
    let data = await db.collection("users").insertOne(req.body);
    await client.close();
    res.json({
      message: "Created Successfully",
    });
  } catch (err) {
    console.log(err);
  }
});

/* app.listen(process.env.PORT||4040,function(){
  console.log("Server Listening");
}) */
 

module.exports = router;
