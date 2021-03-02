const mongoose = require("mongoose");
const Joi = require("joi");
let toysSchema = new mongoose.Schema({
  name:String,
  info:String,
  category:String,
  img_url:String,
  price:Number,
  user_id:String,
  date_created:{
    type:Date, default:Date.now()
  }
})

exports.ToyModel = mongoose.model("toys",toysSchema);


exports.validtoy = (_bodyToy) => {
  let joiSchema = Joi.object({
    name:Joi.string().min(2).max(100).required(),
    info:Joi.string().min(1).max(1000).required(),
    category:Joi.string().min(1).max(100).required(),
    img_url:Joi.string().min(1).max(400).required(),
    price:Joi.number().min(1).max(99999).required()
  })
  return joiSchema.validate(_bodyToy);
}