'use strict';
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const BCRYPT_ROUNDS = 12;
const DUMMY_HASH = bcrypt.hashSync('invalid-login-placeholder', BCRYPT_ROUNDS);
const ADMIN_EMAIL = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase();
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD
  ? bcrypt.hashSync(String(process.env.ADMIN_PASSWORD), BCRYPT_ROUNDS)
  : '';


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
  function denyLogin(req, res) {
    req.toastr.error('Invalid email or password.', '!ERROR');
    return res.redirect('/admin-login');
  }

  function startAdminSession(req, res, userId) {
    req.session.regenerate((err) => {
      if (err) {
        req.toastr.error('Something went wrong.', '!ERROR');
        return res.redirect('/admin-login');
      }
      req.session.userId = String(userId);
      req.session.role = 'admin';
      req.toastr.success('Login Success Fully.', 'Success');
      req.session.save((saveErr) => {
        if (saveErr) {
          req.toastr.error('Something went wrong.', '!ERROR');
          return res.redirect('/admin-login');
        }
        return res.redirect('/dashboard');
      });
    });
  }

  function legacyPasswordMatches(input, stored) {
    const left = Buffer.from(input);
    const right = Buffer.from(String(stored));
    if (left.length !== right.length) {
      crypto.timingSafeEqual(left, left);
      return false;
    }
    return crypto.timingSafeEqual(left, right);
  }

  const userLogin = async (req, res) => {
    try {
      const email = typeof req.body.email === 'string'
        ? req.body.email.trim().toLowerCase()
        : '';
      const password = typeof req.body.password === 'string' ? req.body.password : '';

      if (!email || email.length > 254 || !email.includes('@') || password.length === 0 || password.length > 128) {
        await bcrypt.compare(password || 'invalid', DUMMY_HASH);
        return denyLogin(req, res);
      }

      let user = null;
      try {
        user = await User.findOne({ email, role: 'admin' }).select('+password');
      } catch (lookupError) {
        user = null;
      }
      const stored = user && typeof user.password === 'string' ? user.password : '';
      const isHash = stored.startsWith('$2a$') || stored.startsWith('$2b$') || stored.startsWith('$2y$');
      let match = false;

      if (user && isHash) {
        match = await bcrypt.compare(password, stored);
      } else if (user && stored) {
        match = legacyPasswordMatches(password, stored);
        if (match) {
          user.password = await bcrypt.hash(password, BCRYPT_ROUNDS);
          await user.save();
        } else {
          await bcrypt.compare(password, DUMMY_HASH);
        }
      } else if (ADMIN_EMAIL && email === ADMIN_EMAIL && ADMIN_PASSWORD_HASH) {
        match = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
        if (match) {
          return startAdminSession(req, res, 'env-admin');
        }
      } else {
        await bcrypt.compare(password, DUMMY_HASH);
      }

      if (!match || !user) {
        return denyLogin(req, res);
      }

      return startAdminSession(req, res, user.id);
    } catch (error) {
      console.error('Admin login failed');
      req.toastr.error('Something went wrong.', '!ERROR');
      return res.redirect('/admin-login');
    }
  };
  const userLogout = (req, res) => {
    const done = () => {
      res.clearCookie('beyond.sid', {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });
      return res.redirect('/admin-login');
    };
    if (!req.session) return done();
    return req.session.destroy(() => done());
  };
  
const users =async (req,res)=>{
  const users=await User.find({}).select('-password -otp').sort({ role: 1 }).populate('org_id').exec();
  const organization=await Organization.find({});
  res.render('admin/userslist',{users,organization});
};

  
module.exports = {
    userRegister,
    userLogin,
    userLogout,users
  }