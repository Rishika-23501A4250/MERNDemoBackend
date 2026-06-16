const express = require('express')
const cors = require('cors')

let connection = require('./config/db')
const jwt = require('jsonwebtoken')
const limiter = require('./middlewares/ratelimit')
let mail = require('./utils/gmail')
const app = express()
const port = process.env.PORT
let dotenv = require('dotenv').config()
//routes
let productroutes = require('./routes/productroute')
let authroutes = require('./routes/authroutes')

//middlewares
app.use(cors())
app.use(express.json())
app.use(limiter)
app.use('/products',productroutes)
app.use('/',authroutes)




connection()
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


/*app.get('/products', async (req,res)=>{
    try{
        let allproducts = await products.find()
        res.status(200).json(allproducts)
    } catch (error){
        res.json({msg:error.message})
    }
})


app.post('/products', async (req,res)=>{
    try{
        await products.create(req.body)
        res.status(201).json({msg:"product saved"})
    } catch (error){
        res.json({msg:error.message})
    }
})

app.post('/bulkproducts', async (req,res)=>{
    try{
        await products.insertMany(req.body)
        res.status(201).json({msg:"all products saved"})
    } catch (error){
        res.json({msg:error.message})
    }
})

app.put('/products/:id', async (req,res)=>{
    try{
        let productid = req.params.id

        await products.findByIdAndUpdate(
            productid,
            req.body
        )

        res.status(200).json({
            msg:"Products are updated"
        })

    } catch(error){
        res.json({msg:error.message})
    }
})
app.delete('/products/:id', async (req,res)=>{
    try{
        let productid = req.params.id

        await products.findByIdAndDelete(productid)

        res.status(200).json({
            msg:"Products are deleted"
        })

    } catch(error){
        res.json({msg:error.message})
    }
})

//registration
app.post('/register',async (req,res)=>{
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
            process.env.secretkey,
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
})

//login workflow
app.post('/login', async (req, res) => {
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
      process.env.secretkey,
      { expiresIn: "1h" }
    );

    res.json({
      msg: "Login successful",
      token
    });

  } catch (error) {
    res.json({ msg: error.message });
  }
});
*/



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})