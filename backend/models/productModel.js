const mongoose = require('mongoose')

const productSchema =  mongoose.Schema({
    productName : String,
    brandName : String,
    category : String,
    productImage : [],
    quantity : Number,
    price : Number,
    sellingPrice : Number,
    description : String
},{
    timestamps : true
})

const productModel = mongoose.model("prduct", productSchema)

module.exports = productModel
