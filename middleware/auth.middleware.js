const jwt = require('jsonwebtoken');
const tokenVerfication = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Missing token' });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'unauthorized' });
    }
};

module.exports = tokenVerfication;