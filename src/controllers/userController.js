'use strict';
const User = require('../models/User');


const userRegister = async (req, res, next) => {
    try{
      let body = req.body;
      const user = new About(req.body);
      let response = await About(body);
      await user.save();
      res.status(200).send({'status':true, 'message': 'News Letter Submit SuccessFully.' });
    }catch(error){
      res.status(400).send(error.message);
    }
  };
  const userLogin = async (req, res) => {
    try {
      console.log(req.body)
      // check if the user exists
      const user = await User.findOne({ email: req.body.email });
  
      if (user) {
        //check if password matches
        const result = req.body.password == user.password;
        //   console.log(result)
        if (result) {
          req.session.userId = user.id;
          req.toastr.success('Login Success Fully.','Success');
          res.redirect('/dashboard');
        } else {
           req.toastr.error('Invalid credentials.','!ERROR');
           res.redirect('/admin-login');
        }
      } else {
        req.toastr.error('User does not exist','!ERROR');
        console.log('User does not exist')
        res.redirect('/admin-login');
      }
    } catch (error) {
      req.toastr.error('something went wrong','!ERROR');
      console.log(error.message)
        res.redirect('/admin-login');
    }
  };
  const userLogout=async (req,res)=>{
    try{
      req.session.userId='';
      req.toastr.success('Log Out SuccessFully.','Success');
      res.redirect('/admin-login');
    }catch(error){
      res.redirect('/admin-login');
    }
  };
  
const users =async (req,res)=>{
  const users=await User.find({}).sort({ role: 1 }).populate('org_id').exec();
  const organization=await Organization.find({});
  res.render('admin/userslist',{users,organization});
};

  
module.exports = {
    userRegister,
    userLogin,
    userLogout,users
  }