let products = require('../models/productmodel')
let dotenv = require('dotenv').config()

exports.getproduct = async (req,res)=>{
    try{
        let allproducts = await products.find()
        res.status(200).json(allproducts)
    } catch (error){
        res.json({msg:error.message})
    }
}

exports.createproduct = async (req,res)=>{
    try{
        await products.create(req.body)
        res.status(201).json({msg:"product saved"})
    } catch (error){
        res.json({msg:error.message})
    }
}

exports.createbulk = async (req,res)=>{
    try{
        await products.insertMany(req.body)
        res.status(201).json({msg:"all products saved"})
    } catch (error){
        res.json({msg:error.message})
    }
}

exports.updateproducts = async (req,res)=>{
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
}

exports.deleteproduct = async (req,res)=>{
    try{
        let productid = req.params.id

        await products.findByIdAndDelete(productid)

        res.status(200).json({
            msg:"Products are deleted"
        })

    } catch(error){
        res.json({msg:error.message})
    }
}