'use strict';
const Benchmark = require('../models/Benchmark');


const benchmark =(req,res)=>{
    Benchmark.find({}).then((x)=>{
        res.render('admin/benchmark',{x});
    }).catch((y)=>{
        console.log(y);
    });
    
};


const benchmarks = async (req,res)=>{
    const draw = req.query.draw;
    const start = parseInt(req.query.start, 10);
    const length = parseInt(req.query.length, 10);
    const searchValue = req.query.search.value || '';
  
    // Count total documents
    const totalRecords = await Benchmark.countDocuments();
  
    // Count documents that match the search value
    const filteredRecords = await Benchmark.countDocuments({
      name: { $regex: searchValue, $options: 'i' }
    });
  
    // Fetch the actual data with pagination and search
    const benchmarks = await Benchmark.find({
      name: { $regex: searchValue, $options: 'i' }
    }).sort({ _id: -1 })
    .skip(start)
    .limit(length);
  
    res.json({
      draw: draw,
      recordsTotal: totalRecords,
      recordsFiltered: filteredRecords,
      data: benchmarks
    });
}
const  benchmarkcreate =async (req,res)=>{
    let teamid=req.params.id;
   
    if(teamid){
        
        let team=await Benchmark.findById(teamid);
       
        res.render('admin/createbenchmark',{team});
    }else{
        
        res.render('admin/createbenchmark');
    };
    
};
const storebenchmark =async (req,res)=>{
    try {
        if(req.body.id){
            const team=await Benchmark.findById(req.body.id);
            let body=req.body;
            await team.updateOne(body);
            res.redirect('/benchmark');
        }else{
            let body = req.body;
            const team = new Benchmark(req.body);
            let response = await Benchmark(body);
            await team.save();
            res.redirect('/benchmark');
        }
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};
const deletebenchmark =async (req,res)=>{
    try {
        if(req.params.id){
           
            await Benchmark.deleteOne({_id:req.params.id});
            res.redirect('/benchmark');
        }else{
            res.redirect('/benchmark');
        };
        
    
      } catch (error) {
        res.status(400).send(error.message);
      }
};

module.exports = {
    benchmark,benchmarkcreate,storebenchmark,deletebenchmark,benchmarks
   
  }