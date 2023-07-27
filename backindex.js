const express = require("express");
const app = express();

// dotenv
const dotenv = require("dotenv");
dotenv.config();

// cors
const cors = require("cors");


// body-parser
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));


// connect mongoose
const mongoose = require("mongoose")
mongoose.connect(process.env.DB)
.then(()=>{
    console.log("db is connnected")
})
.catch(()=>{
    console.log("db is not connected")
})
// middleware
app.use(express.json())

app.use (cors());
app.use(cors({origin: true, credentials: true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


 

  //importing schema
require("./module/schema")
const content = mongoose.model("DBcollection");

// register
app.post("/create",async(req,res)=>{
const data = new data_schema({
    name:req.body.name,
    email:req.body.email,
    company:req.body.company,
    phonenumber:req.body.phonenumber,
})
const save_data = await data.save();
       res.json(save_data);

})




// multer
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploadfile");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload-file", upload.single("file"), async (req, res) => {
  console.log(req.body);
  const imageName = req.file.filename;

  try {
    await content.create({ image: imageName });
    res.send({ status: "ok" ,"message":"upload successfully " });
  } catch (error) {
    res.json({ status: error });
  }
});
// listen
app.listen(process.env.PORT,()=>{
  console.log("backend server running on port:",process.env.PORT)
})
