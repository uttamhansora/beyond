
'use strict';
const Home = require('../models/Home');
const About = require('../models/About');
const PageTitle = require('../models/PageTitle');
const ServicePage = require('../models/ServicePage');
const ContactPage = require('../models/ContactPage');


const homeSettings =async (req,res)=>{
    let homeid=req.params.id;
    // console.log(id)
    
    if(homeid){
        let home=await Home.findById(homeid);
        res.render('admin/homepagesettings',{home});
    }else{
        res.render('admin/homepagesettings');
    }
    
}

const getFilePath = (files, fieldName, ogval) => {
    const file = files.find(f => f.fieldname === fieldName);
    return file ? file.path : ogval.fieldname;
};


const homepagestore =async (req,res)=>{
    try {
        if(req.body.id){
            const home=await Home.findById(req.body.id);
                req.body.slide_image_1 = req.files['slide_image_1'] ? req.files['slide_image_1'][0]['path'] : home.slide_image_1;
                req.body.slide_image_2 = req.files['slide_image_2'] ? req.files['slide_image_2'][0]['path'] : home.slide_image_2;
                req.body.slide_image_3 = req.files['slide_image_3'] ? req.files['slide_image_3'][0]['path'] : home.slide_image_3;
                req.body.sec_1_image = req.files['sec_1_image'] ? req.files['sec_1_image'][0]['path'] : home.sec_1_image;
                req.body.sec_2_image = req.files['sec_2_image'] ? req.files['sec_2_image'][0]['path'] : home.sec_2_image;
                req.body.sec_3_image = req.files['sec_3_image'] ? req.files['sec_3_image'][0]['path'] : home.sec_3_image;
                req.body.video = req.files['video'] ? req.files['video'][0]['path'] : home.video;
                req.body.image_1 = req.files['image_1'] ? req.files['image_1'][0]['path'] : home.image_1;
req.body.image_2 = req.files['image_2'] ? req.files['image_2'][0]['path'] : home.image_2;
req.body.image_3 = req.files['image_3'] ? req.files['image_3'][0]['path'] : home.image_3;
req.body.diffrent_image_1 = req.files['diffrent_image_1'] ? req.files['diffrent_image_1'][0]['path'] : home.diffrent_image_1;
req.body.diffrent_image_2 = req.files['diffrent_image_2'] ? req.files['diffrent_image_2'][0]['path'] : home.diffrent_image_2;
req.body.diffrent_image_3 = req.files['diffrent_image_3'] ? req.files['diffrent_image_3'][0]['path'] : home.diffrent_image_3;
req.body.diffrent_image_4 = req.files['diffrent_image_4'] ? req.files['diffrent_image_4'][0]['path'] : home.diffrent_image_4;
               
             let body=req.body;
            console.log(body);
            await home.updateOne(body);
            res.redirect('/dashboard');
        }else{
            res.redirect('/dashboard');
        }
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
}
const aboutSettings =async (req,res)=>{
    let aboutid=req.params.id;
    // console.log(id)
    
    if(aboutid){
        let about=await About.findById(aboutid);
        res.render('admin/aboutpagesettings',{about});
    }else{
        res.render('admin/aboutpagesettings');
    }
    
}
const contactpage =async (req,res)=>{

  let about=await ContactPage.findOne({"_id":"68c2c196c12a069c611f87fb"});
  res.render('admin/contactpage',{about});
};


const contactpagestore =async (req,res)=>{


try {

  if(req.body.id){
      const expertise=await ContactPage.findById(req.body.id);
      console.log(req.body.id);

      let body=req.body;
      await expertise.updateOne(body);
      res.redirect('/dashboard');
  }else{

      let body = req.body;
      const expertise = new ContactPage(req.body);
      let response = await ContactPage(body);
      await expertise.save();
      res.redirect('/dashboard');
  }


} catch (error) {
  res.status(400).send(error.message);
}
};

const aboutpagestore =async (req,res)=>{
    try {
        if(req.body.id){
            const about=await About.findById(req.body.id);
          
                

                req.body.practice_section_1_image = getFilePath(req.files, 'practice_section_1_image', about);
                req.body.practice_section_2_image = getFilePath(req.files, 'practice_section_2_image', about);
                req.body.practice_section_3_image = getFilePath(req.files, 'practice_section_3_image', about);
                req.body.br_pdf = getFilePath(req.files, 'br_pdf', about);
               
             let body=req.body;
             if (body.principles && body.principles.title && body.principles.description) {
                if (Array.isArray(body.principles.title) && Array.isArray(body.principles.description)) {
                    // Multiple entries case: Arrays of titles and descriptions
                    body.principles = body.principles.title.map((title, index) => ({
                        title: title,
                        description: body.principles.description[index]
                    }));
                } else {
                    // Single entry case: Titles and descriptions are strings
                    body.principles = [{
                        title: body.principles.title,
                        description: body.principles.description
                    }];
                }
            }
            console.log(body);
            await about.updateOne(body);
            res.redirect('/dashboard');
        }else{
            res.redirect('/dashboard');
        }
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
}
const pagetitle =async (req,res)=>{
    let aboutid=req.params.id;
    // console.log(id)
    
    if(aboutid){
        let about=await PageTitle.findById(aboutid);
        res.render('admin/pagetitle',{about});
    }else{
        res.render('admin/pagetitle');
    }
    
}

const pagetitlestore =async (req,res)=>{
    try {
        if(req.body.id){
            const about=await PageTitle.findById(req.body.id);
            let body=req.body;
            req.body.about_image = getFilePath(req.files, 'about_image', about);
            req.body.team_image = getFilePath(req.files, 'team_image', about);
            req.body.downloads_image = getFilePath(req.files, 'downloads_image', about);
            req.body.testimonials_image = getFilePath(req.files, 'testimonials_image', about);
            req.body.clients_image = getFilePath(req.files, 'clients_image', about);
            req.body.careers_image = getFilePath(req.files, 'careers_image', about);
            req.body.casestudy_image = getFilePath(req.files, 'casestudy_image', about);
            
            await about.updateOne(body);
            res.redirect('/dashboard');
        }else{
            res.redirect('/dashboard');
        }
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
}
const careerpage =async (req,res)=>{
    let aboutid=req.params.id;
    // console.log(id)
    
    if(aboutid){
        let about=await ServicePage.findById(aboutid);
        res.render('admin/careerpage',{about});
    }else{
        res.render('admin/careerpage');
    }
    
}

const careerpagestore =async (req,res)=>{
    try {
        if(req.body.id){
            const about=await ServicePage.findById(req.body.id);
            let body=req.body;

            await about.updateOne(body);
            res.redirect('/dashboard');
        }else{
            res.redirect('/dashboard');
        }
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
}

module.exports = {
    homeSettings,homepagestore,aboutSettings,aboutpagestore,pagetitle,pagetitlestore,careerpage,careerpagestore,contactpage,contactpagestore
   
  }