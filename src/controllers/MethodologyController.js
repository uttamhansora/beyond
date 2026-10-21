'use strict';
const Methodology = require('../models/Methodology');

function generateSlug(name) {
    return name
      .toLowerCase() // Convert the string to lowercase
      .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and dashes
      .replace(/\s+/g, '-') // Replace spaces with dashes
      .replace(/-{2,}/g, '-') // Replace multiple dashes with a single dash
      .trim(); // Trim any leading or trailing whitespace
  }
  
const methodology =(req,res)=>{
    Methodology.find({}).then((x)=>{
        res.render('admin/methodology',{x});
    }).catch((y)=>{
        console.log(y);
    });
    
};
const methodologys = async (req,res)=>{
    const draw = req.query.draw;
    const start = parseInt(req.query.start, 10);
    const length = parseInt(req.query.length, 10);
    const searchValue = req.query.search.value || '';
  
    // Count total documents
    const totalRecords = await Methodology.countDocuments();
  
    // Count documents that match the search value
    const filteredRecords = await Methodology.countDocuments({
      title: { $regex: searchValue, $options: 'i' }
    });
  
    // Fetch the actual data with pagination and search
    const methodologys = await Methodology.find({
      title: { $regex: searchValue, $options: 'i' }
    }).sort({ _id: -1 })
    .skip(start)
    .limit(length);
  
    res.json({
      draw: draw,
      recordsTotal: totalRecords,
      recordsFiltered: filteredRecords,
      data: methodologys
    });
}
const  methodologycreate =async (req,res)=>{
    let teamid=req.params.id;
   
    if(teamid){
        
        let team=await Methodology.findById(teamid);
       
        res.render('admin/createmethodology',{team});
    }else{
        
        res.render('admin/createmethodology');
    };
    
};
const storemethodology =async (req,res)=>{
    try {
        if(req.body.id){
            const team=await Methodology.findById(req.body.id);
            let body=req.body;
            await team.updateOne(body);
            res.redirect('/methodology');
        }else{
            let body = req.body;
            const team = new Methodology(req.body);
            let response = await Methodology(body);
            await team.save();
            res.redirect('/methodology');
        }
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};
const deletemethodology =async (req,res)=>{
    try {
        if(req.params.id){
           
            await Methodology.deleteOne({_id:req.params.id});
            res.redirect('/methodology');
        }else{
            res.redirect('/methodology');
        };
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};

module.exports = {
    methodology,methodologycreate,storemethodology,deletemethodology,methodologys
   
  }