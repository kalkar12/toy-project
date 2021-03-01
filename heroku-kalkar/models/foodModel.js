const mongoose = require("mongoose");
const Joi = require("joi");

const foodSchema = new mongoose.Schema({
  name:String,
  img:String,
  cal:Number,
  price:Number,
  user_id:String,
  date_created:{
    type:Date , default:Date.now
  }
})

exports.FoodModel = mongoose.model("foods",foodSchema);


exports.validFood = (_bodyData) => {
  let schemaJoi = Joi.object({
    name:Joi.string().min(2).max(100).required(),
    img:Joi.string().min(2).max(200),
    cal:Joi.number().min(1).max(99999).required(),
    price:Joi.number().min(1).max(99999).required()
  })
  return schemaJoi.validate(_bodyData);
}

// 13:10
// לבדיקת תקינות הגיט
// git --version
// ב CMD