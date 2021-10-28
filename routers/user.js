const mongoose = require("mongoose");
const express = require("express");
const { User } = require("../models/user");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

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

module.exports = router;