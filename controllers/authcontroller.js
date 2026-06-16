let User = require('../models/usermodel')
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
let dotenv = require('dotenv').config()
const mail = require('../utils/gmail');

exports.register = async (req,res)=>{
    try{
        const {username,password,email,role} = req.body

        if(!username || !password || !email || !role){
            return res.json({msg:"missing fields"})
        }

        let checkuser = await User.findOne({
            $or:[{username},{email}]
        })

        if(checkuser){
            return res.json({msg:"user already exists"})
        }

        let hashpassword = await bcrypt.hash(password,10)

        await User.create({
            username,
            password:hashpassword,
            email,
            role
        })

        let payload = {
            username,
            emailaddress:email,
            role
        }

        let token = jwt.sign(
            payload,
           process.env.SECRETKEY,
            {expiresIn:'1h'}
        )

        await mail(email,username)

        res.status(201).json({
            msg:"Registration successful",
            token
        })

    } catch(error){
        res.json({msg:error.message})
    }
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    let checkuser = await User.findOne({ username });

    if (!checkuser) {
      return res.json({ msg: "User not found" });
    }

    let ishashverified = await bcrypt.compare(
      password,
      checkuser.password
    );

    if (!ishashverified) {
      return res.json({ msg: "username or password is wrong" });
    }

    let token = jwt.sign(
      {
        username: checkuser.username,
        email: checkuser.email,
        role: checkuser.role
      },
      process.env.SECRETKEY,
      { expiresIn: "1h" }
    );

    res.json({
      msg: "Login successful",
      token
    });

  } catch (error) {
    res.json({ msg: error.message });
  }
}