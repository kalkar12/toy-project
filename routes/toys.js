const express = require('express');
const { authToken } = require('../middlewares/auth');
const { ToyModel, validtoy } = require("../models/toyModel");
const {toys_ar} = require("../data/toyData")
const router = express.Router();

//all toys in the db domain/toys

router.get('/', async (req, res) => {
  let perPage = (req.query.perPage)? Number(req.query.perPage) : 10;
  let page = req.query.page;
  let sortQ = req.query.sort;
  let ifReverse = (req.query.reverse == "yes") ? -1 : 1 ;
 
  try {
     
    let data = await ToyModel.find({})
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
//searchQ

router.get("/search/",(req,res) => {
  let mySearch = new RegExp(`${req.query.s}`);
  ToyModel.find({$or:[{name:mySearch},{info:mySearch}]})
  .then(data => {
    res.json(data)
  })
})
// filter out toys by category for the  db domain/toys/cat/<cat name>


router.get('/category/:catName', async (req, res) => {
  let catName = req.params.catName;
  try {
    let data = await ToyModel.find({category:catName});
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
//add post
router.post("/" ,authToken,async (req, res) => {
  let validBody = validtoy(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try{
    
    let toy = new ToyModel(req.body);
    toy.user_id = req.userData._id;
    await toy.save();
    res.status(201).json(toy);
  
  }
  catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
})


//edit

router.put("/:editId", authToken , async(req,res) => {
  let editId = req.params.editId;
  let validBody = validtoy(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let toy = await ToyModel.updateOne({_id:editId,user_id:req.userData._id},req.body);
    res.json(toy);
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
    let toy = await ToyModel.deleteOne({_id:delId,user_id:req.userData._id});
    res.json(toy);
  } 
  catch (err) {
    console.log(err);
    res.status(400).json(err);
  } 
})

//min-max price

router.get("/prices",(req,res) => {
 
  let min = req.query.min||0;
  if(min <0){
    min=0;
  }
  let max= req.query.max||99999;

  ToyModel.find({price:{$gte:min , $lte:max }})
  .then(data => {
    res.json(data);
  })
})

module.exports = router;
