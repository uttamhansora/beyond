'use strict';
const TalentAssement = require('../models/TalentAssement');

const getFilePath = (files, fieldName,ogval) => {
    const file = files.find(f => f.fieldname === fieldName);
    return file ? file.path : ogval.fieldname;
};

const getFilePaths = (files, fieldName) => {
    const file = files.find(f => f.fieldname === fieldName);
    return file ? file.path : '';
};

function generateSlug(name) {
    return name
      .toLowerCase() // Convert the string to lowercase
      .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and dashes
      .replace(/\s+/g, '-') // Replace spaces with dashes
      .replace(/-{2,}/g, '-') // Replace multiple dashes with a single dash
      .trim(); // Trim any leading or trailing whitespace
  }
  
const talentassement =(req,res)=>{
    TalentAssement.find({}).then((x)=>{
        res.render('admin/talentassement',{x});
    }).catch((y)=>{
        console.log(y);
    });
    
};
const talentassements = async (req,res)=>{
    const draw = req.query.draw;
    const start = parseInt(req.query.start, 10);
    const length = parseInt(req.query.length, 10);
    const searchValue = req.query.search.value || '';
  
    // Count total documents
    const totalRecords = await TalentAssement.countDocuments();
  
    // Count documents that match the search value
    const filteredRecords = await TalentAssement.countDocuments({
      title: { $regex: searchValue, $options: 'i' }
    });
  
    // Fetch the actual data with pagination and search
    const talentassements = await TalentAssement.find({
      title: { $regex: searchValue, $options: 'i' }
    }).sort({ _id: -1 })
    .skip(start)
    .limit(length);
  
    res.json({
      draw: draw,
      recordsTotal: totalRecords,
      recordsFiltered: filteredRecords,
      data: talentassements
    });
}
const  talentassementcreate =async (req,res)=>{
    let teamid=req.params.id;
   
    if(teamid){
        
        let team=await TalentAssement.findById(teamid);
       
        res.render('admin/createtalentassement',{team});
    }else{
        
        res.render('admin/createtalentassement');
    };
    
};
const storetalentassement =async (req,res)=>{
    try {
        if(req.body.id){
            const team=await TalentAssement.findById(req.body.id);
            req.body.image=getFilePath(req.files, 'image',team);
            req.body.download_file=getFilePath(req.files, 'download_file',team);
            let body=req.body;
            await team.updateOne(body);
            res.redirect('/talentassement');
        }else{
            req.body.image=getFilePath(req.files, 'image');
            req.body.download_file=getFilePath(req.files, 'download_file');
            let body = req.body;
            const team = new TalentAssement(req.body);
            let response = await TalentAssement(body);
            await team.save();
            res.redirect('/talentassement');
        }
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};
const deletetalentassement =async (req,res)=>{
    try {
        if(req.params.id){
           
            await TalentAssement.deleteOne({_id:req.params.id});
            res.redirect('/talentassement');
        }else{
            res.redirect('/talentassement');
        };
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};

module.exports = {
    talentassement,talentassementcreate,storetalentassement,deletetalentassement,talentassements
   
  }