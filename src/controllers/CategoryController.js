'use strict';

const Category = require('../models/Category');

  
const categories =async (req,res)=>{
   const category=await Category.find({});
    res.json(category);
};


const categoriescreate =async (req,res)=>{
    try {
       
            let body = req.body;
            const team = new Category(req.body);
            let response = await Category(body);
            await team.save();
            res.json({'success':true});
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};


module.exports = {
    categories,categoriescreate
   
  }