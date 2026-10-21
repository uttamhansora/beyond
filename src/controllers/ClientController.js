'use strict';
const Client = require('../models/Client');

function generateSlug(name) {
    return name
      .toLowerCase() // Convert the string to lowercase
      .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and dashes
      .replace(/\s+/g, '-') // Replace spaces with dashes
      .replace(/-{2,}/g, '-') // Replace multiple dashes with a single dash
      .trim(); // Trim any leading or trailing whitespace
  }
  
const client =(req,res)=>{
    Client.find({}).then((x)=>{
           const message = req.session.message;
        req.session.message = null;
        res.render('admin/client',{x,message});
    }).catch((y)=>{
        console.log(y);
    });
    
};
const clients = async (req,res)=>{
    try {
        if (req.method === "POST") {
    // ✅ Handle order update here
    try {
      const { id, order } = req.body;
      await Client.findByIdAndUpdate(id, { order: Number(order) });
      return res.json({ success: true, message: "Client Order updated" });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
        const draw = req.query.draw;
        const start = parseInt(req.query.start, 10);
        const length = parseInt(req.query.length, 10);
        const searchValue = req.query.search.value || '';

        // Count total documents
        const totalRecords = await Client.countDocuments();

        // Count documents that match the search value
        const filteredRecords = await Client.countDocuments({
            name: { $regex: searchValue, $options: 'i' }
        });

        // Fetch the actual data with pagination and search
        const clients = await Client.find()
        .skip(start)
        .limit(length);

        res.json({
            draw: draw,
            recordsTotal: totalRecords,
            recordsFiltered: filteredRecords,
            data: clients
        });
    } catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch clients',
            error: error.message
        });
    }
}
const  clientcreate =async (req,res)=>{
    let teamid=req.params.id;
   
    if(teamid){
        
        let team=await Client.findById(teamid);
       
        res.render('admin/createclient',{team});
    }else{
        
        res.render('admin/createclient');
    };
    
};
const storeclient =async (req,res)=>{
    try {
        
        if(req.body.id){
            const team=await Client.findById(req.body.id);
            req.body.image = req.file ? req.file.path : team.image;
            let body=req.body;
            await team.updateOne(body);
            req.session.message = 'Client Updated successfully!';
            res.redirect('/client');
        }else{
            
            req.body.image = req.file.path;
            let body = req.body;
            const team = new Client(req.body);
            let response = await Client(body);
            await team.save();
            req.session.message = 'Client Created successfully!';
            res.redirect('/client');
        }
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};
const deleteclient =async (req,res)=>{
    try {
        if(req.params.id){
           
            await Client.deleteOne({_id:req.params.id});
            res.redirect('/client');
        }else{
            res.redirect('/client');
        };
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};

module.exports = {
    client,clientcreate,storeclient,deleteclient,clients
   
  }