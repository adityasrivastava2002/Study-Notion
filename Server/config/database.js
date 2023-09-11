const mongoose=require("mongoose");
require("dotenv").config();

exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>console.log("DB connected"))
    .catch((error)=>{
        console.log("Cannot connect to DB");
        console.error(error);
        process.exit(1);
    });
}