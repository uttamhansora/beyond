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
  try {
    const draw = Number.parseInt(req.query.draw, 10) || 0;
    const start = Math.max(0, Number.parseInt(req.query.start, 10) || 0);
    const requestedLength = Number.parseInt(req.query.length, 10);
    const length = Math.min(100, requestedLength > 0 ? requestedLength : 10);
    const escaped = String((req.query.search && req.query.search.value) || '').trim();
    const filter = escaped ? { $or: ['firstName', 'lastName', 'name', 'email', 'phone', 'company', 'country', 'message'].map(field => ({ [field]: { $regex: escaped, $options: 'i' } })) } : {};
    const [recordsTotal, recordsFiltered, data] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments(filter),
      Contact.find(filter).sort({ createdAt: -1, _id: -1 }).skip(start).limit(length).lean()
    ]);
    res.json({ draw, recordsTotal, recordsFiltered, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to load contact forms.' });
  }
};
const contact =async (req,res)=>{
  res.render('admin/contact');
};

module.exports = {
    generalsettingstore,generalsetting,contact,contactdata
   
  }
