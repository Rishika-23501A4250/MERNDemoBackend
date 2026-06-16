const nodemailer = require('nodemailer')
require('dotenv').config()

//s1: create a transport
let mail = async (email,username)=>{
let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: process.env.GMAILUSER,
        pass: process.env.GMAILPASS
    }
})

//s2: compose a message
let message = {
    from: '"Rishika Team" <process.env.GMAILUSER>',
    to: email,
    subject: "Registration Successful",
    text: `Hi ${username}, Registration Successful.`,
    html: `<b>Hi ${username}, Registration Successful.</b>`
}

//s3: send a mail
await transporter.sendMail(message)
console.log("Mail sent")
}

module.exports = mail
