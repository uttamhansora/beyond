'use strict';
const Download = require('../models/Download');


  
const download =(req,res)=>{
    Download.find({}).then((x)=>{
        const message = req.session.message;
        req.session.message = null;
        res.render('admin/download',{x,message});
    }).catch((y)=>{
        console.log(y);
    });
    
};
const downloads = async (req, res) => {
  if (req.method === "POST") {
    // ✅ Handle order update here
    try {
      const { id, order } = req.body;
      await Download.findByIdAndUpdate(id, { order: Number(order) });
      return res.json({ success: true, message: "Order updated" });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  // ✅ Existing GET logic for DataTables
  const draw = req.query.draw;
  const start = parseInt(req.query.start, 10);
  const length = parseInt(req.query.length, 10);
  const searchValue = req.query.search.value || '';

  const totalRecords = await Download.countDocuments();
  const filteredRecords = await Download.countDocuments({
    title: { $regex: searchValue, $options: 'i' }
  });

  const blogs = await Download.find({
    title: { $regex: searchValue, $options: 'i' }
  })
  .sort({ _id: -1 })
  .skip(start)
  .limit(length);

  res.json({
    draw: draw,
    recordsTotal: totalRecords,
    recordsFiltered: filteredRecords,
    data: blogs
  });
};
const  downloadcreate =async (req,res)=>{
    let teamid=req.params.id;
   
    if(teamid){
        
        let team=await Download.findById(teamid);
       
        res.render('admin/createdownload',{team});
    }else{
        
        res.render('admin/createdownload');
    };
    
};
const storedownload =async (req,res)=>{
    try {
        
        if(req.body.id){
            const team=await Download.findById(req.body.id);
            req.body.image = req.file ? req.file.path : team.image;
            if (req.files.image) req.body.image = req.files.image[0].path;
            if (req.files.download_file) req.body.download_file = req.files.download_file[0].path;
            let body=req.body;
            await team.updateOne(body);
            req.session.message = 'Download Updated successfully!';
            res.redirect('/download');
        }else{
            
            if (req.files.image) req.body.image = req.files.image[0].path;
            if (req.files.download_file) req.body.download_file = req.files.download_file[0].path;
            let body = req.body;
            const team = new Download(req.body);
            let response = await Download(body);
            await team.save();
            req.session.message = 'Download Created successfully!';
            res.redirect('/download');
        }
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};
const deletedownload =async (req,res)=>{
    try {
        if(req.params.id){
           
            await Download.deleteOne({_id:req.params.id});
            res.redirect('/download');
        }else{
            res.redirect('/download');
        };
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};

module.exports = {
    download,downloadcreate,storedownload,deletedownload,downloads
   
  }