const express = require('express');

const { addcategory, getCatergories } = require('../controller/category');
const multer = require('multer');
const router = express.Router();
const shortid =  require('shortid');
const path = require('path')


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(path.dirname(__dirname), 'uploads') )
    },
    filename: function(req, file, cb){
        cb(null, shortid.generate() + '-' + file.originalname )
    }
})
const upload = multer({storage});
router.post('/category/create', upload.single('categoryImage'), addcategory);
router.get('/category/getcategory', getCatergories);
module.exports = router;
