const mongoose = require("mongoose");
const Joi = require("joi");
// מייצרים סכמה של המסד נתונים
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

// מייצר ומייצא את המודל שבנוי מהסכמה והשם של הקולקשן
exports.ToyModel = mongoose.model("toys",toysSchema);


exports.validtoy = (_bodyToy) => {
  // סכמה של הצד השרת ובעצם תתבצע בדיקה בצד שרת
  // שהמידע תקין לפני שנבצע עליו שאילתא במסד נתונים
  let joiSchema = Joi.object({
    name:Joi.string().min(2).max(100).required(),
    info:Joi.string().min(1).max(1000).required(),
    category:Joi.string().min(1).max(100).required(),
    img_url:Joi.string().min(1).max(400).required(),
    price:Joi.number().min(1).max(99999).required()
  })
// אם יש טעות יחזיר מאפיין שיש בו אירור
  return joiSchema.validate(_bodyToy);
}