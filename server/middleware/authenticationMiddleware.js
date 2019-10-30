function isAuthenticated(req, res, next) {
	console.log(`isAuthenticated Middleware req.session.userID`, req.session);
    if (!req.session.userID) {
        console.log(`res.status(404)`);
        res.status(404).json({
            data: 'not authenticated'
        });
    } else {
        console.log(`req.session.userID`);
        next();
    }
}

module.exports = isAuthenticated;