const mongoose = require("mongoose");
const Joi = require("joi");

const songSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    artist:{
        type:String,
        require:true,
        unique:true
    },
    song:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    duration:{
        type:String,
        require:true
    }
});


const validate = (song)=> {
    const schema = Joi.object({
        name:Joi.string().required(),
        artist:Joi.string().required(),
        song:Joi.string().required(),
        image:Joi.string().required(),
        duration:Joi.number().required(),
    });
    return schema.validate(song)
}

const Song = new mongoose.model("song",songSchema);

module.exports = {Song,validate};