const express = require("express")

const router = express.Router()

const userSignUpContrller = require('../controller/user/userSignUp')
const userSignInController = require('../controller/user/userSignin')
const userDetailsControlller = require('../controller/user/userDetails')
const authToken = require("../middleware/authToken")
const userLogout = require("../controller/user/userLogout")
const allUsers = require("../controller/user/allUsers")
const updateUserRole = require("../controller/user/updateUser")
const UploadProductController = require("../controller/product/uploadProduct")
const getProductController = require("../controller/product/getProduct")
const updateProductController = require("../controller/product/updateProduct")
const deleteProductController = require("../controller/product/deleteProduct")
const getCategoryProduct = require("../controller/product/getCategoryProductOne")
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct")
const getProductDetails = require("../controller/product/getProductDetails")
const addToCartController = require("../controller/user/addToCartController")
const countAddToCartProduct = require("../controller/user/countAddToCartProduct")
const addToCartViewProduct  = require("../controller/user/addToCartViewProduct")
const updateAddToCartProduct = require("../controller/user/updateAddToCartProduct")
const deleteAddToCartProduct = require("../controller/user/deleteAddToCartProduct")
const searchProduct = require("../controller/product/searchProduct")
const filterProductController = require("../controller/product/filterProduct")
const paymentController = require("../controller/order/paymentController")
const webhooks = require("../controller/order/webHook")
const orderController = require("../controller/order/order.controller")


router.post("/signup", userSignUpContrller)
router.post("/signin", userSignInController)
router.get('/user-details', authToken,userDetailsControlller)
router.get('/userLogout', userLogout)

// admin 
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUserRole)

// product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.post("/delete-product", authToken, deleteProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

// cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)

//payment and order
router.post('/checkout',authToken,paymentController)
router.post('/webhook', webhooks) // api/webhook
router.get('/orderList',authToken,orderController)

module.exports = router