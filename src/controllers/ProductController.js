'use strict';
const Product = require('../models/Product');
const Category = require('../models/Category');
const ProductDescription = require('../models/ProductDescription');
const mongoose = require('mongoose');
const ProductAttribute = require('../models/ProductAttribute');

function generateSlug(name) {
    return name
      .toLowerCase() // Convert the string to lowercase
      .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and dashes
      .replace(/\s+/g, '-') // Replace spaces with dashes
      .replace(/-{2,}/g, '-') // Replace multiple dashes with a single dash
      .trim(); // Trim any leading or trailing whitespace
  }
  
const product =(req,res)=>{
    Product.find({}).then((x)=>{
        res.render('admin/product',{x});
    }).catch((y)=>{
        console.log(y);
    });
    
};
const productsdata =async (req,res)=>{
    const data=await Product.find({});
    res.json({"data":data})
    
};
const  productcreate =async (req,res)=>{
    let teamid=req.params.id;
    let category=await Category.find({});
    let description=await ProductDescription.find({});
    let attribute=await ProductAttribute.find({});
    if(teamid){
        
        let team=await Product.findById(teamid);
       
        res.render('admin/createproduct',{team,category,description,attribute});
    }else{
        
        res.render('admin/createproduct',{category,description,attribute});
    };
    
};

const storeproduct = async (req, res) => {
    try {
        
        const {
            formValidationUsername,
            ProductSlug,
            category_id,
            ProductPrice,
            sub_description,
            description_id,
            attributes
        } = req.body;

        // Filter out any empty items from the attributes array
        const filteredAttributes = attributes.filter(attr => attr && attr.attr_name && attr.attr_id);

        const newProduct = new Product({
            slug: ProductSlug,
            name: formValidationUsername,
            category_id: category_id,
            price: ProductPrice,
            sub_description: sub_description,
            description: description_id,
            attribute: filteredAttributes,
            image:req.files[0].path
        });

        await newProduct.save();
        res.status(201).send(newProduct);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const deleteproduct =async (req,res)=>{
    try {
        if(req.params.id){
           
            await Product.deleteOne({_id:req.params.id});
            res.redirect('/product');
        }else{
            res.redirect('/product');
        };
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};
const attributecreate =async (req,res)=>{
    try {
        const { attr_name, attr_value, attr_price, attr_stock } = req.body;
        const attr_image = req.file;
    
        // Perform your validation and business logic here
        if (!attr_name || !attr_value || !attr_price) {
            return res.status(400).json({ message: 'All fields are required' });
        }
    
        // Here you could save the attribute to your database
        // For this example, we'll just return the data
        const stockValue = attr_stock == '' ? 0 : attr_stock;
        
        const newAttribute = new ProductAttribute({
            name: attr_name,
            value: attr_value,
            image:req.file ? req.file.path :  '',
            price: attr_price,
            stock: stockValue
        });

        // Save the document to MongoDB
        const savedAttribute = await newAttribute.save();
    
        // Send a success response
        res.status(200).json({ message: 'Attribute created successfully', attribute: savedAttribute });
    
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};
const attribute =async (req,res)=>{
    const category=await ProductAttribute.find({});
     res.json(category);
 };

module.exports = {
    product,productcreate,storeproduct,deleteproduct,productsdata,attributecreate,attribute
   
  }