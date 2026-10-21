'use strict';
const Service = require('../models/Service');

const Process = require('../models/Process');

const Audience = require('../models/Audience');
const Benifit = require('../models/Benifit');
const Offering = require('../models/Offering');
const Testimonial = require('../models/Testimonial');

function generateSlug(name) {
    return name
      .toLowerCase() // Convert the string to lowercase
      .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and dashes
      .replace(/\s+/g, '-') // Replace spaces with dashes
      .replace(/-{2,}/g, '-') // Replace multiple dashes with a single dash
      .trim(); // Trim any leading or trailing whitespace
  }
  
const service =(req,res)=>{
    Service.find({}).then((x)=>{
        res.render('admin/service',{x});
    }).catch((y)=>{
        console.log(y);
    });
    
};
const services = async (req,res)=>{
    const draw = req.query.draw;
    const start = parseInt(req.query.start, 10);
    const length = parseInt(req.query.length, 10);
    const searchValue = req.query.search.value || '';
  

    // Count total documents
    const totalRecords = await Service.countDocuments();
  
    // Count documents that match the search value
    const filteredRecords = await Service.countDocuments({
      name: { $regex: searchValue, $options: 'i' }
    });
  
    // Fetch the actual data with pagination and search
    const services = await Service.find({
      name: { $regex: searchValue, $options: 'i' }
    })
    .skip(start)
    .limit(length);
  
    res.json({
      draw: draw,
      recordsTotal: totalRecords,
      recordsFiltered: filteredRecords,
      data: services
    });
}
const  servicecreate =async (req,res)=>{
    let teamid=req.params.id;
    const processes=await  Process.find({});
    const testimonials=await  Testimonial.find({});
    const offerings=await Offering.find({});
    
    const benefits=await Benifit.find({});
    const audiences=await Audience.find({});
    
    if(teamid){
        
        let service=await Service.findById(teamid);
       
        res.render('admin/createservice',{service,processes,testimonials,offerings,benefits,audiences});
    }else{
        
        res.render('admin/createservice');
    };
    
};
const storeservice =async (req,res)=>{
    try {
        let slug = generateSlug(req.body.name);
        if(req.body.id){
            const team=await Service.findById(req.body.id);
            let body=req.body;
            await team.updateOne(body);
            res.redirect('/service');
        }else{
            req.body.slug = slug;
            let body = req.body;
            const team = new Service(req.body);
            let response = await Service(body);
            await team.save();
            res.redirect('/service');
        }
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};
const deleteservice =async (req,res)=>{
    try {
        if(req.params.id){
           
            await Service.deleteOne({_id:req.params.id});
            res.redirect('/service');
        }else{
            res.redirect('/service');
        };
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};

module.exports = {
    service,servicecreate,storeservice,deleteservice,services
   
  }