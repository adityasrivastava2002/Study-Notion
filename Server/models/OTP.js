const mongoose=require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:60*5,
    },
});

// function to send mails
async function sendVerificationEmail(email,otp){
    try {
        const mailResponse=await mailSender(email, "Verification Email from Study Notion",`Your otp for account creation is ${otp}. It is valid for 5 minutes only.`);
        console.log("Email sent successfully");
    } catch (error) {
        console.log("Error in sending mail",error);
        throw error;
    }
}
OTPSchema.pre("save",async function(next){
    console.log("new doc saved to db");
    if(this.isNew){
        await sendVerificationEmail(this.email,this.otp);
    }
    next();
});

module.exports=mongoose.model("OTP",OTPSchema);