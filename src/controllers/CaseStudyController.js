'use strict';
const CaseStudy = require('../models/CaseStudy');
const CaseCategory = require('../models/CaseCategory');

function generateSlug(name) {
    return name
      .toLowerCase() // Convert the string to lowercase
      .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and dashes
      .replace(/\s+/g, '-') // Replace spaces with dashes
      .replace(/-{2,}/g, '-') // Replace multiple dashes with a single dash
      .trim(); // Trim any leading or trailing whitespace
  }
  
const casestudy =(req,res)=>{
    CaseStudy.find({}).then((x)=>{
        res.render('admin/casestudy',{x});
    }).catch((y)=>{
        console.log(y);
    });
    
};
const casestudys = async (req,res)=>{
    const draw = req.query.draw;
    const start = parseInt(req.query.start, 10);
    const length = parseInt(req.query.length, 10);
    const searchValue = req.query.search.value || '';
  
    // Count total documents
    const totalRecords = await CaseStudy.countDocuments();
  
    // Count documents that match the search value
    const filteredRecords = await CaseStudy.countDocuments({
      name: { $regex: searchValue, $options: 'i' }
    });
  
    // Fetch the actual data with pagination and search
    const casestudys = await CaseStudy.find({
      name: { $regex: searchValue, $options: 'i' }
    }).sort({ _id: -1 })
    .skip(start)
    .limit(length);
  
    res.json({
      draw: draw,
      recordsTotal: totalRecords,
      recordsFiltered: filteredRecords,
      data: casestudys
    });
}
const  casestudycreate =async (req,res)=>{
    let teamid=req.params.id;
    const category=await CaseCategory.find({});
    if(teamid){
        
        let team=await CaseStudy.findById(teamid);
       
        res.render('admin/createcasestudy',{team,category});
    }else{
        
        res.render('admin/createcasestudy',{category});
    };
    
};
const storecasestudy =async (req,res)=>{
    try {
        let slug = generateSlug(req.body.name);
        if(req.body.id){
            const team=await CaseStudy.findById(req.body.id);
            req.body.image = req.file ? req.file.path : team.image;
            let body=req.body;
            await team.updateOne(body);
            res.redirect('/casestudy');
        }else{
            req.body.slug = slug;
            req.body.image = req.file ? req.file.path : null;
            let body = req.body;
            const team = new CaseStudy(req.body);
            let response = await CaseStudy(body);
            await team.save();
            res.redirect('/casestudy');
        }
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};
const deletecasestudy =async (req,res)=>{
    try {
        if(req.params.id){
           
            await CaseStudy.deleteOne({_id:req.params.id});
            res.redirect('/casestudy');
        }else{
            res.redirect('/casestudy');
        };
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};

module.exports = {
    casestudy,casestudycreate,storecasestudy,deletecasestudy,casestudys
   
  }