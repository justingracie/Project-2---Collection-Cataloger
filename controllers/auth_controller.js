const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../models');

// Register route (presentational) ---->
router.get('/register', (req,res) => {
    const context = {
        user: req.session.currentUser,
        routes: req.session.authRoutes,
    }
    return res.render('auth/register', context);
});

// Login Route (presentational)---->

router.get('/login', (req, res) =>{
    const context = {
        user: req.session.currentUser,
        routes: req.session.authRoutes,
    }
    res.render('auth/login', context);
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
        if(!foundUser)return res.send('The password or the Username are invalid');
        const match = await bcrypt.compare(req.body.password, foundUser.password);
        if(!match)return res.send('The password or the Username are invalid');
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

//Logout Route(functional)---->
router.get('/logout', async (req, res, next) =>{
    try {
        await req.session.destroy();
        // console.log(req.session);
        return res.redirect('/login');

    }catch(error){
        console.log(error)
        return res.send(error)
    }
});


module.exports = router;