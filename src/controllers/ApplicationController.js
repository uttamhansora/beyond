'use strict';
const Application = require('../models/Application');


const application =(req,res)=>{
    Application.find({}).then((x)=>{
        res.render('admin/application',{x});
    }).catch((y)=>{
        console.log(y);
    });
    
};


const applications = async (req,res)=>{
    const draw = req.query.draw;
    const start = parseInt(req.query.start, 10);
    const length = parseInt(req.query.length, 10);
    const searchValue = req.query.search.value || '';
  
    // Count total documents
    const totalRecords = await Application.countDocuments();
  
    // Count documents that match the search value
    const filteredRecords = await Application.countDocuments({
      name: { $regex: searchValue, $options: 'i' }
    });
  
    // Fetch the actual data with pagination and search
    const applications = await Application.find({
      name: { $regex: searchValue, $options: 'i' }
    }).sort({ _id: -1 })
    .skip(start)
    .limit(length);
  
    res.json({
      draw: draw,
      recordsTotal: totalRecords,
      recordsFiltered: filteredRecords,
      data: applications
    });
}
const  applicationcreate =async (req,res)=>{
    let teamid=req.params.id;
   
    if(teamid){
        
        let team=await Application.findById(teamid);
       
        res.render('admin/createapplication',{team});
    }else{
        
        res.render('admin/createapplication');
    };
    
};
const storeapplication =async (req,res)=>{
    try {
        if(req.body.id){
            const team=await Application.findById(req.body.id);
            let body=req.body;
            await team.updateOne(body);
            res.redirect('/application');
        }else{
            let body = req.body;
            const team = new Application(req.body);
            let response = await Application(body);
            await team.save();
            res.redirect('/application');
        }
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};
const deleteapplication =async (req,res)=>{
    try {
        if(req.params.id){
           
            await Application.deleteOne({_id:req.params.id});
            res.redirect('/application');
        }else{
            res.redirect('/application');
        };
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};

module.exports = {
    application,applicationcreate,storeapplication,deleteapplication,applications
   
  }