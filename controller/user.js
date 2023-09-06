const LOGIN = require('../models/Login')
const QUIZ = require('../models/quiz')
const CATEGORY = require('../models/category')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer");


async function main(email) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'divyeshgabani072@gmail.com',
      pass: 'ytlauqyilszsgned'
    }
  });

  let message = {
    from: 'divyeshgabani072@gmail.com',
    to: email,
    subject: 'Nodemailer is unicode friendly ✔',
    text: 'Hello to myself!',
    html: '<p><b>Hello</b> to myself!</p>'
  };

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log('Error occurred. ' + err.message);
      return process.exit(1);
    }

    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
}

exports.secure = async function (req, res, next) {
    try {
        const token = req.headers.token;
        if(!token){
            throw new Error("Please enter token")
        }
        const checkToken = await jwt.verify(token, "CDMI")
        next()
    } catch (err) {
        res.status(401).json({
            message: err.message
        })
    }
}
exports.register = async function (req, res, next) {
  try {
    let fname = req.body.fname
    let lname = req.body.lname
    let username = req.body.username
    let password = req.body.password

    if (!fname || !lname || !username || !password) {
      throw new Error("Please enter valid field")
    }

    let data = {
      fname: fname,
      lname: lname,
      username: username,
      password: await bcrypt.hash(password, 10),
    }
    const newUser = await LOGIN.create(data)
    await main(username)

    const token = await jwt.sign({id: newUser._id}, "CDMI")

    res.status(201).json({
      status: "success",
      message: "user create successful",
      data: newUser,
      token
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    })
  }
}
exports.login = async function (req, res, next) {
  try {
    let username = req.body.username;
    let password = req.body.password;

    const data = await LOGIN.findOne({ username: username })
    if (!data) {
      throw new Error("User Not found")
    }

    const checkPass = await bcrypt.compare(password, data.password)
    if (!checkPass) {
      throw new Error("Password is wrong!")
    }
    const token = await jwt.sign({id: data._id}, "CDMI")

    res.status(200).json({
      status: "success",
      message: "Login Successfully",
      data: data,
      token
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    })
  }
}
exports.alldata =  async function (req, res, next) {
  try {
    const data = await LOGIN.find()        
    res.status(200).json({
      status: "success",
      message: "All data found",
      data: data
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    })
  }
}
exports.allQuiz = async function(req, res, next) {
    try {
  
      const allQuiz = await QUIZ.find().populate('category')
  
      res.status(200).json({
        status: 'success',
        message: "Data found successfully",
        data: allQuiz
      })
    } catch (error) {
        res.status(404).json({
        status: "fail",
        message: error.message, 
        })
    }
}
exports.allCategory = async function(req, res, next) {
    try {
  
      const allcategory = await CATEGORY.find()
  
      res.status(200).json({
        status: 'success',
        message: "Data found successfully",
        data: allcategory
      })
    } catch (err) {
        res.status(404).json({
        status: "fail",
        message: err.message, 
        })
    }
}