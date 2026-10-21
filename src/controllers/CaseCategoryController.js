'use strict';
const CaseCategory = require('../models/CaseCategory');


const casecategory =(req,res)=>{
    CaseCategory.find({}).then((x)=>{
        const message = req.session.message;
        req.session.message = null;
        res.render('admin/casecategory',{x,message});
    }).catch((y)=>{
        console.log(y);
    });
    
};


const casecategorys = async (req,res)=>{
    const draw = req.query.draw;
    const start = parseInt(req.query.start, 10);
    const length = parseInt(req.query.length, 10);
    const searchValue = req.query.search.value || '';
  
    // Count total documents
    const totalRecords = await CaseCategory.countDocuments();
  
    // Count documents that match the search value
    const filteredRecords = await CaseCategory.countDocuments({
      name: { $regex: searchValue, $options: 'i' }
    });
  
    // Fetch the actual data with pagination and search
    const casecategorys = await CaseCategory.find({
      name: { $regex: searchValue, $options: 'i' }
    }).sort({ _id: -1 })
    .skip(start)
    .limit(length);
  
    res.json({
      draw: draw,
      recordsTotal: totalRecords,
      recordsFiltered: filteredRecords,
      data: casecategorys
    });
}
const  casecategorycreate =async (req,res)=>{
    let teamid=req.params.id;
   
    if(teamid){
        
        let team=await CaseCategory.findById(teamid);
       
        res.render('admin/createcasecategory',{team});
    }else{
        
        res.render('admin/createcasecategory');
    };
    
};
const storecasecategory =async (req,res)=>{
    try {
        if(req.body.id){
            const team=await CaseCategory.findById(req.body.id);
            let body=req.body;
            await team.updateOne(body);
             req.session.message = 'Blog cateory Updated successfully!';
            res.redirect('/casecategory');
        }else{
            let body = req.body;
            const team = new CaseCategory(req.body);
            let response = await CaseCategory(body);
            await team.save();
             req.session.message = 'Blog cateory Created successfully!';
            res.redirect('/casecategory');
        }
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};
const deletecasecategory =async (req,res)=>{
    try {
        if(req.params.id){
           
            await CaseCategory.deleteOne({_id:req.params.id});
            res.redirect('/casecategory');
        }else{
            res.redirect('/casecategory');
        };
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};

module.exports = {
    casecategory,casecategorycreate,storecasecategory,deletecasecategory,casecategorys
   
  }