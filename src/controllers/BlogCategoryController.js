'use strict';
const BlogCategory = require('../models/BlogCategory');


const blogcategory =(req,res)=>{
    BlogCategory.find({}).then((x)=>{
        const message = req.session.message;
        req.session.message = null;
        res.render('admin/blogcategory',{x,message});
    }).catch((y)=>{
        console.log(y);
    });
    
};


const blogcategorys = async (req,res)=>{
    const draw = req.query.draw;
    const start = parseInt(req.query.start, 10);
    const length = parseInt(req.query.length, 10);
    const searchValue = req.query.search.value || '';
  
    // Count total documents
    const totalRecords = await BlogCategory.countDocuments();
  
    // Count documents that match the search value
    const filteredRecords = await BlogCategory.countDocuments({
      name: { $regex: searchValue, $options: 'i' }
    });
  
    // Fetch the actual data with pagination and search
    const blogcategorys = await BlogCategory.find({
      name: { $regex: searchValue, $options: 'i' }
    }).sort({ _id: -1 })
    .skip(start)
    .limit(length);
  
    res.json({
      draw: draw,
      recordsTotal: totalRecords,
      recordsFiltered: filteredRecords,
      data: blogcategorys
    });
}
const  blogcategorycreate =async (req,res)=>{
    let teamid=req.params.id;
   
    if(teamid){
        
        let team=await BlogCategory.findById(teamid);
       
        res.render('admin/createblogcategory',{team});
    }else{
        
        res.render('admin/createblogcategory');
    };
    
};
const storeblogcategory =async (req,res)=>{
    try {
        if(req.body.id){
            const team=await BlogCategory.findById(req.body.id);
            let body=req.body;
            await team.updateOne(body);
             req.session.message = 'Blog cateory Updated successfully!';
            res.redirect('/blogcategory');
        }else{
            let body = req.body;
            const team = new BlogCategory(req.body);
            let response = await BlogCategory(body);
            await team.save();
             req.session.message = 'Blog cateory Created successfully!';
            res.redirect('/blogcategory');
        }
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};
const deleteblogcategory =async (req,res)=>{
    try {
        if(req.params.id){
           
            await BlogCategory.deleteOne({_id:req.params.id});
            res.redirect('/blogcategory');
        }else{
            res.redirect('/blogcategory');
        };
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};

module.exports = {
    blogcategory,blogcategorycreate,storeblogcategory,deleteblogcategory,blogcategorys
   
  }