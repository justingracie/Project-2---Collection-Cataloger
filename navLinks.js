const routes = [
    { href: '/catalog/new', title: 'New Album'},
    { href: '/logout', title: 'Logout'}
];

const authRoutes = [
    { href: '/login', title: 'Login'},
    { href: '/register', title: 'Register'},
];

let navLinks = function navLinks(req, res, next){
    if(req.session.currentUser){
        res.locals.routes = routes;
    }else{
        res.locals.routes = authRoutes;
    }
    next();
};

module.exports = navLinks;