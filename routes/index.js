var express = require('express');
var router = express.Router();


const QUIZ = require('../models/quiz')
const CATEGORY = require('../models/category')

const userController =  require('../controller/user')

router.post('/category/create', userController.secure,async function(req, res, next) {
  try {
    let categoryName = req.body.category

    if(!categoryName){
      throw new Error("Fill required field")
    }
    let data ={
      category : categoryName
    }
    const newCategory = await CATEGORY.create(data)

    res.status(201).json({
      status: 'success',
      message: "Data inserted successfully",
      data: newCategory
    })

  } catch (error) {
      res.status(404).json({
      status: "fail",
      message: error.message, 
      })
  }
});
router.get('/category/allCategory',userController.secure,userController.allCategory);
router.post('/category/update', userController.secure,async function(req, res, next) {
  try {
    let index = req.query.id
    await CATEGORY.findByIdAndUpdate(index,req.body)

    newCate = await CATEGORY.findById(index)

    res.status(200).json({
      status: 'success',
      message: "Data updated successfully",
      data: newCate
    })
    
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    })
  }
});
router.delete('/category/delete', userController.secure,async function(req, res, next) {
  try {
    let index = req.query.id
    const newCate = await CATEGORY.findByIdAndDelete(index)

    res.status(200).json({
      status: 'success',
      message: "Data deleted successfully",
      data: newCate
    })

  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    })
  }
});

router.post('/quiz/create', userController.secure,async function(req, res, next) {
  try {
    let question = req.body.question
    let answer = req.body.answer
    let options = req.body.options
    let category = req.body.category


    if(!question || !options || !category || !answer){
      throw new Error("Fill required field")
    }
    let data ={
      question : question,
      answer : answer,
      options : options,
      category : category
    }
    const newQuiz = await QUIZ.create(data)

    res.status(201).json({
      status: 'success',
      message: "Data inserted successfully",
      data: newQuiz
    })

  } catch (error) {
      res.status(404).json({
      status: "fail",
      message: error.message, 
      })
  }
});
router.get('/quiz/allQuiz',  userController.secure, userController.allQuiz);
router.post('/quiz/update', userController.secure,async function(req, res, next) {
  try {
    let index = req.query.id
    await QUIZ.findByIdAndUpdate(index,req.body)

    newQuiz = await QUIZ.findById(index)

    res.status(200).json({
      status: 'success',
      message: "Data updated successfully",
      data: newQuiz
    })
    
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    })
  }
});
router.delete('/quiz/delete', userController.secure,async function(req, res, next) {
  try {
    let index = req.query.id
    const newQuiz = await QUIZ.findByIdAndDelete(index)

    res.status(200).json({
      status: 'success',
      message: "Data deleted successfully",
      data: newQuiz
    })

  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    })
  }
});
router.get('/quiz/searchData', async function(req, res, next) {
  try {
    const newStd = await QUIZ.find({category: req.query.id})
    res.status(200).json({
      status: 'success',
      message: "Data found successfully",   
      data: newStd
    })

  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    })
  }
});
// router.get('/login', async function (req, res, next) {
//   try {
//     res.render('login')
//   } catch (err) {
//     res.send(err.message)
//   }
// });

// router.get('/register', async function (req, res, next) {
//   try {
//     res.render('register')
//   } catch (err) {
//     res.send(err.message)
//   }
// });
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/alldata', userController.secure ,userController.alldata);


module.exports = router;
