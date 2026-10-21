'use strict';

const GeneralSetting = require('../models/GeneralSetting');
const Contact = require('../models/Contact');

  


const generalsetting =async (req,res)=>{
    let team=await GeneralSetting.findOne({"_id":"6672d45db1fb3acd94ca3539"});
    res.render('admin/generalsetting',{team});
};

const generalsettingstore =async (req,res)=>{
    try {
       
        const team = await GeneralSetting.findById("6672d45db1fb3acd94ca3539");
        
        let body = req.body;
        
        await team.updateOne(body);
            res.redirect('/generalsetting');
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};
const contactdata =async (req,res)=>{
  const draw = req.query.draw;
const start = parseInt(req.query.start, 10);
const length = parseInt(req.query.length, 10);
const searchValue = req.query.search.value || '';

// Count total documents
const totalRecords = await Contact.countDocuments();

// Count documents that match the search value
const filteredRecords = await Contact.countDocuments({});

// Fetch the actual data with pagination and search
const coupons = await Contact.find({})
.sort({ _id: -1 })
  .skip(start)
  .limit(length);

res.json({
  draw: draw,
  recordsTotal: totalRecords,
  recordsFiltered: filteredRecords,
  data: coupons
});
};
const contact =async (req,res)=>{
  res.render('admin/contact');
};

module.exports = {
    generalsettingstore,generalsetting,contact,contactdata
   
  }