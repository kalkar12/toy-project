const express = require('express');
const { authToken } = require('../middlewares/auth');
const {FoodModel,validFood} = require("../models/foodModel");
const router = express.Router();

/* GET home page. */
router.get('/', async(req, res) => {
  let perPage = (req.query.perPage)? Number(req.query.perPage) : 10;
  let page = req.query.page;
  let sortQ = req.query.sort;
  let ifReverse = (req.query.reverse == "yes") ? -1 : 1 ;
  try {
    let data = await FoodModel.find({})
    .sort({[sortQ]:ifReverse})
    .limit(perPage)
    .skip(page * perPage)
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});


//add
router.post("/", authToken , async(req,res) => {
  let validBody = validFood(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let food = new FoodModel(req.body);
    food.user_id = req.userData._id;
    await food.save();
    res.status(201).json(food);
  } 
  catch (err) {
    console.log(err);
    res.status(400).json(err);
  } 
})

//edit
router.put("/:editId", authToken , async(req,res) => {
  let editId = req.params.editId;
  let validBody = validFood(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let food = await FoodModel.updateOne({_id:editId,user_id:req.userData._id},req.body);
    res.json(food);
  } 
  catch (err) {
    console.log(err);
    res.status(400).json(err);
  } 
})

//delete
router.delete("/:delId", authToken , async(req,res) => {
  let delId = req.params.delId;
  try{
    let food = await FoodModel.deleteOne({_id:delId,user_id:req.userData._id});
    res.json(food);
  } 
  catch (err) {
    console.log(err);
    res.status(400).json(err);
  } 
})

module.exports = router;
