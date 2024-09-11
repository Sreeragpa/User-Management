
export const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next(); 
    }
    req.flash('error', 'You need to log in to access this page.');
    res.redirect('/login'); // Redirect to login 
};

export const isNotAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return next(); // User is not authenticated
    }
    res.redirect('/'); // Redirect to homepage 
};
