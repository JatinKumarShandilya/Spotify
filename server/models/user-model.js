const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    month:{
        type:String,
        require:true
    },
    day:{
        type:String,
        require:true
    },
    year:{
        type:String,
        require:true
    },
    likedSongs:{
        type:[String],
        default:[]
    },
    playLists:{
        type:[String],
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

})

userSchema.methods.generateAuthToken = async function(){
    try {
        return jwt.sign(
            {
            _id:this._id.toString(),
            name:this.name,
            isAdmin:this.isAdmin,
        },
        process.env.JWT_SECRET_KEY,{
            expiresIn:"30d",
        })
    } catch (error) {
        console.error(error)
    }
}

const validate = (user)=> {
    const schema = Joi.object({
        name:Joi.string().min(5).max(10).required(),
        email:Joi.string().email().required(),
        password:passwordComplexity().required(),
        month:Joi.string().required(),
        day:Joi.string().required(),
        year:Joi.string().required(),
        gender:Joi.string().valid("male","female","non-binary").required(),
    });
    return schema.validate(user)
}

const User = new mongoose.model("user",userSchema);

module.exports = {User,validate};