'use strict';
const TestimonialCategory = require('../models/TestimonialCategory');


const testimonialcategory =(req,res)=>{
    TestimonialCategory.find({}).then((x)=>{
        const message = req.session.message;
        req.session.message = null;
        res.render('admin/testimonialcategory',{x,message});
    }).catch((y)=>{
        console.log(y);
    });
    
};


const testimonialcategorys = async (req,res)=>{
    const draw = req.query.draw;
    const start = parseInt(req.query.start, 10);
    const length = parseInt(req.query.length, 10);
    const searchValue = req.query.search.value || '';
  
    // Count total documents
    const totalRecords = await TestimonialCategory.countDocuments();
  
    // Count documents that match the search value
    const filteredRecords = await TestimonialCategory.countDocuments({
      name: { $regex: searchValue, $options: 'i' }
    });
  
    // Fetch the actual data with pagination and search
    const testimonialcategorys = await TestimonialCategory.find({
      name: { $regex: searchValue, $options: 'i' }
    }).sort({ _id: -1 })
    .skip(start)
    .limit(length);
  
    res.json({
      draw: draw,
      recordsTotal: totalRecords,
      recordsFiltered: filteredRecords,
      data: testimonialcategorys
    });
}
const  testimonialcategorycreate =async (req,res)=>{
    let teamid=req.params.id;
   
    if(teamid){
        
        let team=await TestimonialCategory.findById(teamid);
       
        res.render('admin/createtestimonialcategory',{team});
    }else{
        
        res.render('admin/createtestimonialcategory');
    };
    
};
const storetestimonialcategory =async (req,res)=>{
    try {
        if(req.body.id){
            const team=await TestimonialCategory.findById(req.body.id);
            let body=req.body;
            await team.updateOne(body);
            req.session.message = 'Testimonial cateory Updated successfully!';
            res.redirect('/testimonialcategory');
        }else{
            let body = req.body;
            const team = new TestimonialCategory(req.body);
            let response = await TestimonialCategory(body);
            await team.save();
            req.session.message = 'Testimonial cateory Created successfully!';
            res.redirect('/testimonialcategory');
        }
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};
const deletetestimonialcategory =async (req,res)=>{
    try {
        if(req.params.id){
           
            await TestimonialCategory.deleteOne({_id:req.params.id});
            res.redirect('/testimonialcategory');
        }else{
            res.redirect('/testimonialcategory');
        };
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};

module.exports = {
    testimonialcategory,testimonialcategorycreate,storetestimonialcategory,deletetestimonialcategory,testimonialcategorys
   
  }