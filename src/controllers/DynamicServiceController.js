'use strict';
const DynamicService = require('../models/DynamicService');
const Testimonial = require('../models/Testimonial');
const Client = require('../models/Client');

const getFilePath = (files, fieldName, ogval) => {
    const file = files.find(f => f.fieldname === fieldName);
    return file ? file.path : ogval.fieldname;
};


function generateSlug(name) {
    return name
      .toLowerCase() // Convert the string to lowercase
      .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and dashes
      .replace(/\s+/g, '-') // Replace spaces with dashes
      .replace(/-{2,}/g, '-') // Replace multiple dashes with a single dash
      .trim(); // Trim any leading or trailing whitespace
  }
  
const dynamicservice =(req,res)=>{
    DynamicService.find({}).then((x)=>{
              const message = req.session.message;
        req.session.message = null;
        res.render('admin/dynamicservice',{x,message});
    }).catch((y)=>{
        console.log(y);
    });
    
};
const dynamicservices = async (req, res) => {

  // ✅ Existing GET logic for DataTables
  const draw = req.query.draw;
  const start = parseInt(req.query.start, 10);
  const length = parseInt(req.query.length, 10);
  const searchValue = req.query.search.value || '';

  const totalRecords = await DynamicService.countDocuments();
  const filteredRecords = await DynamicService.countDocuments({
    title: { $regex: searchValue, $options: 'i' }
  });

  const blogs = await DynamicService.find({
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
const  dynamicservicecreate =async (req,res)=>{
    let teamid=req.params.id;
   const client=await Client.find({});
   const testimonial=await Testimonial.find({});
    if(teamid){
        
        let team=await DynamicService.findById(teamid);
       
        res.render('admin/createdynamicservice',{team,client,testimonial});
    }else{
        
        res.render('admin/createdynamicservice',{client,testimonial});
    };
    
};
const storedynamicservice =async (req,res)=>{
    try {
        let slug = generateSlug(req.body.title);
        if(req.body.id){
            const team=await DynamicService.findById(req.body.id);
            req.body.bg_image = getFilePath(req.files, 'bg_image', team);
            req.body.image = getFilePath(req.files, 'image', team);
            req.body.main_image = getFilePath(req.files, 'main_image', team);
            req.body.section_1_pdf = getFilePath(req.files, 'section_1_pdf', team);
            req.body.section_2_image = getFilePath(req.files, 'section_2_image', team);
            req.body.section_2_pdf = getFilePath(req.files, 'section_2_pdf', team);
            req.body.section_3_image_1 = getFilePath(req.files, 'section_3_image_1', team);
            req.body.section_3_image_2 = getFilePath(req.files, 'section_3_image_2', team);
            req.body.section_3_image_3 = getFilePath(req.files, 'section_3_image_3', team);
            req.body.benchmark_1_image = getFilePath(req.files, 'benchmark_1_image', team);
            req.body.benchmark_2_image = getFilePath(req.files, 'benchmark_2_image', team);
            req.body.benchmark_3_image = getFilePath(req.files, 'benchmark_3_image', team);
            req.body.benchmark_4_image = getFilePath(req.files, 'benchmark_4_image', team);
            req.body.deliverable_1_image = getFilePath(req.files, 'deliverable_1_image', team);
            req.body.deliverable_2_image = getFilePath(req.files, 'deliverable_2_image', team);
            req.body.deliverable_3_image = getFilePath(req.files, 'deliverable_3_image', team);
            
            
            req.body.outcome_image_1 = getFilePath(req.files, 'outcome_image_1', team);
            req.body.outcome_image_2 = getFilePath(req.files, 'outcome_image_2', team);
            req.body.outcome_image_3 = getFilePath(req.files, 'outcome_image_3', team);
            req.body.methodology_image_1 = getFilePath(req.files, 'methodology_image_1', team);
            req.body.journey_image_1 = getFilePath(req.files, 'journey_image_1', team);
            req.body.journey_image_2 = getFilePath(req.files, 'journey_image_2', team);
            req.body.journey_image_3 = getFilePath(req.files, 'journey_image_3', team);
            req.body.journey_image_4 = getFilePath(req.files, 'journey_image_4', team);
            req.body.journey_image_5 = getFilePath(req.files, 'journey_image_5', team);
            req.body.journey_image_6 = getFilePath(req.files, 'journey_image_6', team);
            req.body.journey_image_7 = getFilePath(req.files, 'journey_image_7', team);
            req.body.journey_image_8 = getFilePath(req.files, 'journey_image_8', team);
            req.body.experince_image_1 = getFilePath(req.files, 'experince_image_1', team);
            req.body.experince_image_2 = getFilePath(req.files, 'experince_image_2', team);
            req.body.experince_image_3 = getFilePath(req.files, 'experince_image_3', team);
            
            let body=req.body;
            await team.updateOne(body);
            req.session.message = 'Dynamic Service Updated successfully!';
            res.redirect('/dynamicservice');
        }else{
            req.body.slug = slug;
           req.body.bg_image = getFilePath(req.files, 'bg_image', []);
            req.body.section_1_pdf = getFilePath(req.files, 'section_1_pdf', []);
            req.body.section_2_image = getFilePath(req.files, 'section_2_image', []);
            req.body.section_2_pdf = getFilePath(req.files, 'section_2_pdf', []);
            req.body.section_3_image_1 = getFilePath(req.files, 'section_3_image_1', []);
            req.body.section_3_image_2 = getFilePath(req.files, 'section_3_image_2', []);
            req.body.section_3_image_3 = getFilePath(req.files, 'section_3_image_3', []);
            req.body.benchmark_1_image = getFilePath(req.files, 'benchmark_1_image', []);
            req.body.benchmark_2_image = getFilePath(req.files, 'benchmark_2_image', []);
            req.body.benchmark_3_image = getFilePath(req.files, 'benchmark_3_image', []);
            req.body.benchmark_4_image = getFilePath(req.files, 'benchmark_4_image', []);
            req.body.deliverable_1_image = getFilePath(req.files, 'deliverable_1_image', []);
            req.body.deliverable_2_image = getFilePath(req.files, 'deliverable_2_image', []);
            req.body.deliverable_3_image = getFilePath(req.files, 'deliverable_3_image', []);
            
             req.body.outcome_image_1 = getFilePath(req.files, 'outcome_image_1', []);
            req.body.outcome_image_2 = getFilePath(req.files, 'outcome_image_2', []);
            req.body.outcome_image_3 = getFilePath(req.files, 'outcome_image_3', []);
            req.body.methodology_image_1 = getFilePath(req.files, 'methodology_image_1', []);
            req.body.journey_image_1 = getFilePath(req.files, 'journey_image_1', []);
            req.body.journey_image_2 = getFilePath(req.files, 'journey_image_2', []);
            req.body.journey_image_3 = getFilePath(req.files, 'journey_image_3', []);
            req.body.journey_image_4 = getFilePath(req.files, 'journey_image_4', []);
            req.body.journey_image_5 = getFilePath(req.files, 'journey_image_5', []);
            req.body.journey_image_6 = getFilePath(req.files, 'journey_image_6', []);
            req.body.journey_image_7 = getFilePath(req.files, 'journey_image_7', []);
            req.body.journey_image_8 = getFilePath(req.files, 'journey_image_8', []);
            req.body.experince_image_1 = getFilePath(req.files, 'experince_image_1', []);
            req.body.experince_image_2 = getFilePath(req.files, 'experince_image_2', []);
            req.body.experince_image_3 = getFilePath(req.files, 'experince_image_3', []);
           
            let body = req.body;
            const team = new DynamicService(req.body);
            let response = await DynamicService(body);
            req.session.message = 'Dynamic Service Created successfully!';
            await team.save();
            res.redirect('/dynamicservice');
        }
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};
const deletedynamicservice =async (req,res)=>{
    try {
        if(req.params.id){
           
            await DynamicService.deleteOne({_id:req.params.id});
            res.redirect('/dynamicservice');
        }else{
            res.redirect('/dynamicservice');
        };
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};

module.exports = {
    dynamicservice,dynamicservicecreate,storedynamicservice,deletedynamicservice,dynamicservices
   
  }