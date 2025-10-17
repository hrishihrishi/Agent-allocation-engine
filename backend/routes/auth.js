const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async(req,res)=>{
    const {email, password} = req.body;
    const admin = await Admin.findOne({email});
    if(!admin) return res.status(400).json({msg: 'invalid creds'});
    const ok = await bcrypt.compare(password, admin.password);
    if(!ok) return res.status(400).json({msg: 'invalid creds'});
    const token = jwt.sign({id:admin._id, email:admin.email},process.env.JWT_SECRET, {expiresIn:'8h'});
    res.json({token});
});
module.exports = router;