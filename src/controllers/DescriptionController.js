'use strict';

const ProductDescription = require('../models/ProductDescription');

  
const description =async (req,res)=>{
   const category=await ProductDescription.find({});
    res.json(category);
};


const descriptioncreate =async (req,res)=>{
    try {
       
            let body = req.body;
            const team = new ProductDescription(req.body);
            let response = await ProductDescription(body);
            await team.save();
            res.json({'success':true});
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};


module.exports = {
    description,descriptioncreate
   
  }