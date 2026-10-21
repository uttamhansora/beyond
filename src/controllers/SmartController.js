'use strict';
const Smart360 = require('../models/Smart360');

function generateSlug(name) {
    return name
      .toLowerCase() // Convert the string to lowercase
      .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and dashes
      .replace(/\s+/g, '-') // Replace spaces with dashes
      .replace(/-{2,}/g, '-') // Replace multiple dashes with a single dash
      .trim(); // Trim any leading or trailing whitespace
  }
  
const smart360 =(req,res)=>{
    Smart360.find({}).then((x)=>{
        res.render('admin/smart360',{x});
    }).catch((y)=>{
        console.log(y);
    });
    
};
const smart360s = async (req,res)=>{
    const draw = req.query.draw;
    const start = parseInt(req.query.start, 10);
    const length = parseInt(req.query.length, 10);
    const searchValue = req.query.search.value || '';
  
    // Count total documents
    const totalRecords = await Smart360.countDocuments();
  
    // Count documents that match the search value
    const filteredRecords = await Smart360.countDocuments({
      title: { $regex: searchValue, $options: 'i' }
    });
  
    // Fetch the actual data with pagination and search
    const smart360s = await Smart360.find({
      title: { $regex: searchValue, $options: 'i' }
    }).sort({ _id: -1 })
    .skip(start)
    .limit(length);
  
    res.json({
      draw: draw,
      recordsTotal: totalRecords,
      recordsFiltered: filteredRecords,
      data: smart360s
    });
}
const  smart360create =async (req,res)=>{
    let teamid=req.params.id;
    if(teamid){
        
        let team=await Smart360.findById(teamid);
       
        res.render('admin/createsmart360',{team});
    }else{
        
        res.render('admin/createsmart360');
    };
    
};
const storesmart360 =async (req,res)=>{
    try {
        if(req.body.id){
            const team=await Smart360.findById(req.body.id);
            req.body.image = req.file ? req.file.path : team.image;
            let body=req.body;
            await team.updateOne(body);
            res.redirect('/smart360');
        }else{
            req.body.image = req.file ? req.file.path : null;
            let body = req.body;
            const team = new Smart360(req.body);
            let response = await Smart360(body);
            await team.save();
            res.redirect('/smart360');
        }
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};
const deletesmart360 =async (req,res)=>{
    try {
        if(req.params.id){
           
            await Smart360.deleteOne({_id:req.params.id});
            res.redirect('/smart360');
        }else{
            res.redirect('/smart360');
        };
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};

module.exports = {
    smart360,smart360create,storesmart360,deletesmart360,smart360s
   
  }