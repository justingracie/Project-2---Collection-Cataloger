const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../models');

// Register route (presentational) ---->
router.get('/register', (req,res) => {
    return res.render('auth/register');
});

// Login Route (presentational)---->

router.get('/login', (req, res) =>{
    res.render('auth/login');
});

//Register router (functional)---->

router.post('/register', async (req, res, next) => {
    try{
        console.log('testing')
        const foundUser = await User.exists({email: req.body.email});
        if(foundUser){
            return res.redirect('/login');
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        const newUser = await User.create(req.body);
        return res.redirect('/login');
    }catch (error){
        console.log(error);
        return res.send(error);
    }
});

//Login Route (functional)---->
router.post('/login', async (req, res, next) =>{
    try {
        const foundUser = await User.findOne({ email: req.body.email});
        console.log(foundUser);
        if(!foundUser)return res.redirect('/register');
        const match = await bcrypt.compare(req.body.password, foundUser.password);
        if(!match)return res.send('password invalid');
        req.session.currentUser = {
            id: foundUser._id,
            username:foundUser.username,
        };
        console.log(req.session);

        return res.redirect('/catalog');

    }catch(error){
        console.log(error)
        return res.send(error)
    }
});


module.exports = router;