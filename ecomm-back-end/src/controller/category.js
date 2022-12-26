const Catergory = require('../models/category');
const slugify = require('slugify');
const category = require('../models/category');


function createCategories(categories,parentId = null ){
    const categoryList = [];
    let category;
    if(parentId == null){
        
        category = categories.filter(cat => cat.parentId == undefined);
    }else{
      category = categories.filter(cat => cat.parentId == parentId);
    }
    for(let cate of category){
       categoryList.push({
        _id: cate._id,
        name: cate.name,
        slug: cate.slug,
        children: createCategories(categories, cate._id)
    });
    } 

    return categoryList;
};
exports.addcategory = (req, res) => {
 
  
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name)
    
  }
  if(req.file){
  
    categoryObj.categoryImage = process.env.API + '/public/' + req.file.filename;

  }

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  const cat = new Catergory(categoryObj);
  cat.save((error, category) => {
    if (error) return res.statusCode(400).json({ error });
    if (category) {
      return res.status(201).json({ category });
    }
  });
};
exports.getCatergories = (req, res) => {
  Catergory.find({})
 .exec((error, categories) => {
    if(error) return res.statusCode(400).json({ error });
    /*if(categories){
      res.status(200).json({categories});
    }*/
    if (categories) {
      const categoryList = createCategories(categories);
    res.status(200).json({ categoryList });
    }
  });
}
