/* Authentication handler */
function isAuthenticated(req, res, permission, next) {
    if (!req.cookies.user) {
        const redirectTo = encodeURIComponent(req.originalUrl || '/');
        return res.redirect(`/login?redirect=${redirectTo}`);
        next();
    }
}

// Export the function
module.exports = isAuthenticated;