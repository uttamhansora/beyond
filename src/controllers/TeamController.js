'use strict';
const Team = require('../models/Team');

function generateSlug(name) {
    return name
      .toLowerCase() // Convert the string to lowercase
      .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and dashes
      .replace(/\s+/g, '-') // Replace spaces with dashes
      .replace(/-{2,}/g, '-') // Replace multiple dashes with a single dash
      .trim(); // Trim any leading or trailing whitespace
  }
  
const team =(req,res)=>{
    Team.find({}).then((x)=>{
          const message = req.session.message;
        req.session.message = null;
        res.render('admin/team',{x,message});
    }).catch((y)=>{
        console.log(y);
    });
    
};
const  teamcreate =async (req,res)=>{
    let teamid=req.params.id;
    if(teamid){
        
        let team=await Team.findById(teamid);
       
        res.render('admin/createteam',{team});
    }else{
        
        res.render('admin/createteam');
    };
    
};
const storeteam =async (req,res)=>{
    try {
        let body = req.body;
        
        
        const { s_title, s_ids, s_link,s_company_date,e_collage,s_company_name,e_ids,e_degree} = req.body;

        // Handle image upload
        if (req.file) {
            body.image = req.file.path;
        }
        
        const work = [];
          // Handle dynamic step[n][image] fields
          if (s_title && Array.isArray(s_title)) {
            for (let i = 0; i < s_title.length; i++) {
                          const idss = s_ids?.[i] || '';

              
              work.push({
                id: s_ids?.[i] || '',
                s_title: s_title[i],
                s_link: s_link[i],
                s_company_name: s_company_name[i],
                s_company_date: s_company_date[i],
              });
            }
          }
          req.body.work = work;
          
          const education = [];
          // Handle dynamic step[n][image] fields
          if (e_collage && Array.isArray(e_collage)) {
            for (let i = 0; i < e_collage.length; i++) {
                          const idss = e_ids?.[i] || '';

              
              education.push({
                id: e_ids?.[i] || '',
                e_collage: e_collage[i],
                e_degree: e_degree[i],
              });
            }
          }
          req.body.education = education;

        if (body.id) {
            // Update existing team member
            req.session.message = 'Team Updated successfully!';
            await Team.updateOne({ _id: body.id }, body);
        } else {
            req.session.message = 'Team Created successfully!';
            // Create a new team member
            const newSolution = new Team(body);
            await newSolution.save();
        }

        res.redirect('/team');
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};
const teams = async (req,res)=>{
    
    if (req.method === "POST") {
    // ✅ Handle order update here
    try {
      const { id, order } = req.body;
      await Team.findByIdAndUpdate(id, { order: Number(order) });
      return res.json({ success: true, message: "Team updated" });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
    const draw = req.query.draw;
    const start = parseInt(req.query.start, 10);
    const length = parseInt(req.query.length, 10);
    const searchValue = req.query.search.value || '';
  
    // Count total documents
    const totalRecords = await Team.countDocuments();
  
    // Count documents that match the search value
    const filteredRecords = await Team.countDocuments({
      name: { $regex: searchValue, $options: 'i' }
    });
  
    // Fetch the actual data with pagination and search
    const blogs = await Team.find({
      f_name: { $regex: searchValue, $options: 'i' }
    }).sort({ _id: -1 })
    .skip(start)
    .limit(length);
  
    res.json({
      draw: draw,
      recordsTotal: totalRecords,
      recordsFiltered: filteredRecords,
      data: blogs
    });
}
const deleteteam =async (req,res)=>{
    try {
        if(req.params.id){
           
            await Team.deleteOne({_id:req.params.id});
            res.redirect('/team');
        }else{
            res.redirect('/team');
        };
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};

module.exports = {
    team,teamcreate,storeteam,deleteteam,teams
   
  }