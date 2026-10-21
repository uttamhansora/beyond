'use strict';
const Testimonial = require('../models/Testimonial');
const TestimonialCategory = require('../models/TestimonialCategory');


const testimonial =(req,res)=>{
    Testimonial.find({}).then((x)=>{
        const message = req.session.message;
        req.session.message = null;
        res.render('admin/testimonial',{x,message});
    }).catch((y)=>{
        console.log(y);
    });
    
};

const  testimonialcreate =async (req,res)=>{
    let teamid=req.params.id;
    const category=await TestimonialCategory.find({});
    if(teamid){
        
        let team=await Testimonial.findById(teamid);
  
        res.render('admin/createtestimonial',{team,category});
    }else{
        
        res.render('admin/createtestimonial',{category});
    };
    
};
const storetestimonial =async (req,res)=>{
    try {
        if(req.body.id){
            const team=await Testimonial.findById(req.body.id);
            if (req.files.image) req.body.image = req.files.image[0].path;
            if (req.files.client_logo) req.body.client_logo = req.files.client_logo[0].path;
            let body=req.body;
            await team.updateOne(body);
            req.session.message = 'Testimonail Updated successfully!';
            res.redirect('/testimonial');
        }else{
            if (req.files.image) req.body.image = req.files.image[0].path;
            if (req.files.client_logo) req.body.client_logo = req.files.client_logo[0].path;
            let body = req.body;
            const team = new Testimonial(req.body);
            let response = await Testimonial(body);
            await team.save();
            req.session.message = 'Testimonail Created successfully!';
            res.redirect('/testimonial');
        }
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};
const testimonials = async (req,res)=>{
    const draw = req.query.draw;
    const start = parseInt(req.query.start, 10);
    const length = parseInt(req.query.length, 10);
    const searchValue = req.query.search.value || '';
  
    // Count total documents
    const totalRecords = await Testimonial.countDocuments();
  
    // Count documents that match the search value
    const filteredRecords = await Testimonial.countDocuments({
      name: { $regex: searchValue, $options: 'i' }
    });
  
    // Fetch the actual data with pagination and search
    const blogs = await Testimonial.find({
      name: { $regex: searchValue, $options: 'i' },
      format: { $regex: searchValue, $options: 'i' },
    }).sort({ _id: -1 })
    .skip(start)
    .limit(length);
  
    res.json({
      draw: draw,
      recordsTotal: totalRecords,
      recordsFiltered: filteredRecords,
      data: blogs
    });
}
const deletetestimonial =async (req,res)=>{
    try {
        if(req.params.id){
           
            await Testimonial.deleteOne({_id:req.params.id});
            res.redirect('/testimonial');
        }else{
            res.redirect('/testimonial');
        };
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};

module.exports = {
    testimonial,testimonialcreate,storetestimonial,deletetestimonial,testimonials
   
  }