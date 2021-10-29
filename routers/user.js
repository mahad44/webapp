const mongoose = require("mongoose");
const express = require("express");
const { User, Products } = require("../models/user");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

//register
router.post("/register", async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array });
      return;
    }
    console.log(req.body);
    const { email } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json("User already exists for this email");
    }

    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      dateofBirth: req.body.dateofBirth,
      gender:req.body.gender,
      Image:req.body.Image,
      passwordhash: bcrypt.hashSync(req.body.password, 10),
    });
    newUser = await newUser.save();

    if (!newUser) {
      return res.status(400).json("User cannot be created");
    } else {
      return res.status(200).json("User created successfully");
    }
  } catch (err) {
    return next(err);
  }
});

//login
router.post("/login", async (req, res, next) => {
  try{
  if (Object.keys(req.body).length === 0) {
      return res
          .status(500)
          .json("Body fields cannot be empty.");
  }

  let credentials = new User({
      email: req.body.email,
      passwordhash: bcrypt.hashSync(req.body.password, 10),
  });

  const user = await User.findOne({ email: credentials.email });
  
  if (!user) {
      return res
          .status(500)
          .json(
              "User doesn't exist.Provide correct credentials or register yourself if you are not already registered."

          );
  } else {
      if (user && bcrypt.compareSync(req.body.password, user.passwordhash)) {
          console.log("here in paswd check");
          return res.status(200).json
              ({
                  user: user.email,
                  user_id: user.id,
                  token: jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "JWTSECRET", {
                      expiresIn: "1d",
                  }),

                  message: "User Logged In successfully!"
              })
      } else {
          return res
              .status(400)
              .json("Please enter correct credentials");
      }
      
  }
}
  catch (err) {
    next(err);
  }

});

//get all users
router.get('/', async (req, res) => {
    const userList = await User.find({}).select('-passwordHash');

    if (userList) {
        return res.status(200).json({
            userList,
            message: "User list retrieved successfully"
        })
    } else {
        return res.status(400).json({
            userList,
            message: "User list canot be retrieved"
        })
    }
})

router.get('/myproducts', async (req,res) =>{
  const userid = req.body.userid;
  console.log(userid);
  const userfind = await User.findById(userid).select('-passwordhash');

  if(userfind){
    //const tokenid = jwt.sign({ id: userfind.id, isAdmin: userfind.isAdmin }, "JWTSECRET", {
     // expiresIn: "1d",})
      const tokenid = jwt.verify(req.body.token,"JWTSECRET");
    if(tokenid){
      const listofproducts = await Products.findOne({Id : userid});
      if(listofproducts){
        return res.status(200).json({
          listofproducts,
          message: "Product list returned"
        })
      }
      else{
        return res.status(400).json({
          listofproducts,
          message : "No products found for the user"
        })
      }
    }
    else{
      return res.status(400).json({
        message : "Token not recognized"
      })
    }
  }
  else{
    return res.status(400).json({
      userfind,
      message : "User can not be retreived"
    })
  }
})

router.post('/addproduct', async (req,res,next) =>{
  try{
    const tempuserid = req.body.userid;
    const finduser = await User.findById(tempuserid).select('-passwordhash');

    if(finduser){
      const tokenid = jwt.verify(req.body.token,"JWTSECRET");
      if(tokenid){
        let product = new Products({
          userid : tempuserid,
          productname : req.body.nameofProduct,
          productimage : req.body.productImage,
          category : req.body.category,
          price : req.body.price
        });
        product = await product.save();

        let findproduct = Products.findOne(tempuserid);
        const idreturn = findproduct.id;
        if(product){
          return res.status(200).json({
            idreturn,
            message : "Product added successfully"
          })
        }
        else{
          return res.status(400).json({
            idreturn,
            message : "Product was not added"
          })
        }
      }
    }
    else{
      return res.status(400).json({
        message: "Not user exists with this user id"
      })
    }
  } catch(err){
    return next(err);
  }
})



module.exports = router;