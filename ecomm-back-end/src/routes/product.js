const express = require('express');
const {createProduct} = require('../controller/product');
const multer = require('multer');
const router = express.Router();
const shortid =  require('shortid');
const path = require('path')
//const upload = multer({dest: 'uploads/'});
//const { addcategory, getCatergories } = require('../controller/category');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(path.dirname(__dirname), 'uploads') )
        //cb(null, '../uploads') 
    },
    filename: function(req, file, cb){
        cb(null, shortid.generate() + '-' + file.originalname )
    }
})
const upload = multer({storage});
//router.post('/product/create', createProduct);
router.post('/product/create', upload.array('productPicture'), createProduct);
//router.get('/category/getcategory', getCatergories);
module.exports = router;
