const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../models');

// Register route ---->
router.get('/register', function (req,res){
    return res.render('auth/register');
});

// Login Route Present login---->

router.get('/login', function(req, res){
    res.render('auth/login');
});


module.exports = router;