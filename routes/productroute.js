const express = require('express')
let router = express.Router();

const {createproduct,getproduct,updateproducts,createbulk,deleteproduct} = require('../controllers/productcontroller')

router.get('/',getproduct)
router.post('/',createproduct)
router.post('/bulkproducts',createbulk)
router.put('/:id',updateproducts)
router.delete('/:id',deleteproduct)

module.exports = router