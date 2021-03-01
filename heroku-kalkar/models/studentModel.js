const mongoose = require("mongoose");
const Joi = require("joi");
// מייצרים סכמה של המסד נתונים
let studentSchema = new mongoose.Schema({
  name:String,
  score:Number,
  subject:String,
  date_created:{
    type:Date, default:Date.now()
  }
})

// מייצר ומייצא את המודל שבנוי מהסכמה והשם של הקולקשן
exports.StudetModel = mongoose.model("students",studentSchema);


exports.validStudent = (_bodyStudent) => {
  // סכמה של הצד השרת ובעצם תתבצע בדיקה בצד שרת
  // שהמידע תקין לפני שנבצע עליו שאילתא במסד נתונים
  let joiSchema = Joi.object({
    name:Joi.string().min(2).max(100).required(),
    score:Joi.number().min(1).max(100).required(),
    subject:Joi.string().min(2).max(100).required()
  })
// אם יש טעות יחזיר מאפיין שיש בו אירור
  return joiSchema.validate(_bodyStudent);
}