'use strict';
const Blog = require('../models/Blog');
const BlogCategory=require('../models/BlogCategory');

function generateSlug(name) {
    return name
      .toLowerCase() // Convert the string to lowercase
      .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and dashes
      .replace(/\s+/g, '-') // Replace spaces with dashes
      .replace(/-{2,}/g, '-') // Replace multiple dashes with a single dash
      .trim(); // Trim any leading or trailing whitespace
  }
  
const blog =(req,res)=>{
    Blog.find({}).then((x)=>{
          const message = req.session.message;
        req.session.message = null;
        res.render('admin/blog',{x,message});
    }).catch((y)=>{
        console.log(y);
    });
    
};
const blogs = async (req, res) => {
  try {
    if (req.method === "GET") {
      // ---- LISTING FOR DATATABLE ----
      const draw = req.query.draw;
      const start = parseInt(req.query.start, 10);
      const length = parseInt(req.query.length, 10);
      const searchValue = req.query.search?.value || "";

      const totalRecords = await Blog.countDocuments();
      const filteredRecords = await Blog.countDocuments({
        name: { $regex: searchValue, $options: "i" }
      });

      const latestBlogsCount = await Blog.countDocuments({ is_latest: true });

      const blogs = await Blog.find({
        name: { $regex: searchValue, $options: "i" }
      })
        .sort({ _id: -1 })
        .skip(start)
        .limit(length)
        .lean();

      blogs.forEach(b => {
  if (typeof b.is_latest === "undefined") b.is_latest = false;
  b.can_set_latest = b.is_latest || latestBlogsCount < 2;
});

      return res.json({
        draw: draw,
        recordsTotal: totalRecords,
        recordsFiltered: filteredRecords,
        data: blogs
      });
    }

    if (req.method === "POST") {
  const { id, field } = req.body; // field = "is_latest" OR "is_home_latest"
  const blog = await Blog.findById(id);
  if (!blog) return res.status(404).json({ error: "Blog not found" });

  if (field === "is_latest") {
    // ---- TOGGLE is_latest ----
    if (!blog.is_latest) {
      const latestCount = await Blog.countDocuments({ is_latest: true });
      if (latestCount >= 2) {
        return res.status(400).json({ error: "Only 2 blogs can be set as latest" });
      }
    }
    blog.is_latest = !blog.is_latest;
  }

  if (field === "is_home_latest") {
    // ---- TOGGLE is_home_latest ----
    if (!blog.is_home_latest) {
      const homeLatestCount = await Blog.countDocuments({ is_home_latest: true });
      if (homeLatestCount >= 2) {
        return res.status(400).json({ error: "Only 2 blogs can be set as home latest" });
      }
    }
    blog.is_home_latest = !blog.is_home_latest;
  }

  await blog.save();

  return res.json({
    success: true,
    is_latest: blog.is_latest,
    is_home_latest: blog.is_home_latest,
  });
}
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const  blogcreate =async (req,res)=>{
    let teamid=req.params.id;
   const category=await BlogCategory.find({});
    if(teamid){
        
        let team=await Blog.findById(teamid);
       
        res.render('admin/createblog',{team,category});
    }else{
        
        res.render('admin/createblog',{category});
    };
    
};
const storeblog =async (req,res)=>{
    try {
        let slug = generateSlug(req.body.name);
        if(req.body.id){
            
            const team=await Blog.findById(req.body.id);
            req.body.image = req.file ? req.file.path : team.image;
            let body=req.body;
            await team.updateOne(body);
            req.session.message = 'Blog Updated successfully!';
            res.redirect('/blog');
        }else{
            req.body.slug = slug;
            req.body.image = req.file ? req.file.path : null;
            let body = req.body;
            const team = new Blog(req.body);
            let response = await Blog(body);
            await team.save();
            req.session.message = 'Blog Created successfully!';
            res.redirect('/blog');
        }
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};
const deleteblog =async (req,res)=>{
    try {
        if(req.params.id){
           
            await Blog.deleteOne({_id:req.params.id});
            res.redirect('/blog');
        }else{
            res.redirect('/blog');
        };
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};

module.exports = {
    blog,blogcreate,storeblog,deleteblog,blogs
   
  }