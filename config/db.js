const mongoose = require('mongoose')
let connection = async ()=>{
    try{
      await  mongoose.connect(process.env.MONGODBURL)
    } catch (error){
        console.log(error.message)
    }
};
module.exports = connection

