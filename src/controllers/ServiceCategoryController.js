'use strict';
const ServiceCategory = require('../models/ServiceCategory');

function generateSlug(name) {
    return name
      .toLowerCase() // Convert the string to lowercase
      .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and dashes
      .replace(/\s+/g, '-') // Replace spaces with dashes
      .replace(/-{2,}/g, '-') // Replace multiple dashes with a single dash
      .trim(); // Trim any leading or trailing whitespace
  }
  
const servicecategory =(req,res)=>{
    ServiceCategory.find({}).then((x)=>{
        res.render('admin/servicecategory',{x});
    }).catch((y)=>{
        console.log(y);
    });
    
};
const servicecategorys = async (req,res)=>{
    const draw = req.query.draw;
    const start = parseInt(req.query.start, 10);
    const length = parseInt(req.query.length, 10);
    const searchValue = req.query.search.value || '';
  
    // Count total documents
    const totalRecords = await ServiceCategory.countDocuments();
  
    // Count documents that match the search value
    const filteredRecords = await ServiceCategory.countDocuments({
      image: { $regex: searchValue, $options: 'i' }
    });
  
    // Fetch the actual data with pagination and search
    const servicecategorys = await ServiceCategory.find({
      image: { $regex: searchValue, $options: 'i' }
    }).sort({ _id: -1 })
    .skip(start)
    .limit(length);
  
    res.json({
      draw: draw,
      recordsTotal: totalRecords,
      recordsFiltered: filteredRecords,
      data: servicecategorys
    });
}
const  servicecategorycreate =async (req,res)=>{
    let teamid=req.params.id;
   const category=await ServiceCategory.find({});
    if(teamid){
        
        let team=await ServiceCategory.findById(teamid);
       
        res.render('admin/createservicecategory',{team,category});
    }else{
        
        res.render('admin/createservicecategory',{category});
    };
    
};
const storeservicecategory =async (req,res)=>{
    try {
        
        if(req.body.id){
            const team=await ServiceCategory.findById(req.body.id);
            if (req.files.image) req.body.image = req.files.image[0].path;
            if (req.files.pdf) req.body.pdf = req.files.pdf[0].path;
            let body=req.body;
            await team.updateOne(body);
            res.redirect('/servicecategory');
        }else{
            
            if (req.files.image) req.body.image = req.files.image[0].path;
            if (req.files.pdf) req.body.pdf = req.files.pdf[0].path;
            let body = req.body;
            const team = new ServiceCategory(req.body);
            let response = await ServiceCategory(body);
            await team.save();
            res.redirect('/servicecategory');
        }
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};
const deleteservicecategory =async (req,res)=>{
    try {
        if(req.params.id){
           
            await ServiceCategory.deleteOne({_id:req.params.id});
            res.redirect('/servicecategory');
        }else{
            res.redirect('/servicecategory');
        };
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};

module.exports = {
    servicecategory,servicecategorycreate,storeservicecategory,deleteservicecategory,servicecategorys
   
  }