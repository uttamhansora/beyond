'use strict';
const Career = require('../models/Career');


const career =(req,res)=>{
    Career.find({}).then((x)=>{
              const message = req.session.message;
        req.session.message = null;
        res.render('admin/career',{x,message});
    }).catch((y)=>{
        console.log(y);
    });
    
};
const careerform =(req,res)=>{
    Career.find({}).then((x)=>{
        res.render('admin/careerform',{x});
    }).catch((y)=>{
        console.log(y);
    });
    
};
const careerforms = async (req,res)=>{
    const draw = req.query.draw;
    const start = parseInt(req.query.start, 10);
    const length = parseInt(req.query.length, 10);
    const searchValue = req.query.search.value || '';
  
    // Count total documents
    const totalRecords = await Careerform.countDocuments();
  
    // Count documents that match the search value
    const filteredRecords = await Careerform.countDocuments({
      name: { $regex: searchValue, $options: 'i' }
    });
  
    // Fetch the actual data with pagination and search
    const careers = await Careerform.find({
      job_title: { $regex: searchValue, $options: 'i' }
    }).sort({ _id: -1 })
    .skip(start)
    .limit(length);
  
    res.json({
      draw: draw,
      recordsTotal: totalRecords,
      recordsFiltered: filteredRecords,
      data: careers
    });
}
const careers = async (req,res)=>{
    const draw = req.query.draw;
    const start = parseInt(req.query.start, 10);
    const length = parseInt(req.query.length, 10);
    const searchValue = req.query.search.value || '';
  
    // Count total documents
    const totalRecords = await Career.countDocuments();
  
    // Count documents that match the search value
    const filteredRecords = await Career.countDocuments({
      name: { $regex: searchValue, $options: 'i' }
    });
  
    // Fetch the actual data with pagination and search
    const careers = await Career.find({
      job_title: { $regex: searchValue, $options: 'i' }
    }).sort({ _id: -1 })
    .skip(start)
    .limit(length);
  
    res.json({
      draw: draw,
      recordsTotal: totalRecords,
      recordsFiltered: filteredRecords,
      data: careers
    });
}
const  careercreate =async (req,res)=>{
    let teamid=req.params.id;
   
    if(teamid){
        
        let team=await Career.findById(teamid);
       
        res.render('admin/createcareer',{team});
    }else{
        
        res.render('admin/createcareer');
    };
    
};
const storecareer =async (req,res)=>{
    try {
        if(req.body.id){
            const team=await Career.findById(req.body.id);
            let body=req.body;
            await team.updateOne(body);
            req.session.message = 'Career Updated successfully!';
            res.redirect('/career');
        }else{
            let body = req.body;
            const team = new Career(req.body);
            let response = await Career(body);
            await team.save();
            req.session.message = 'Career Created successfully!';
            res.redirect('/career');
        }
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};
const deletecareer =async (req,res)=>{
    try {
        if(req.params.id){
           
            await Career.deleteOne({_id:req.params.id});
            res.redirect('/career');
        }else{
            res.redirect('/career');
        };
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};

module.exports = {
    career,careercreate,storecareer,deletecareer,careers,careerform,careerforms
   
  }