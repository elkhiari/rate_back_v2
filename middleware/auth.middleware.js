const jwt = require('jsonwebtoken');
const usersModel = require('../model/users.model');
const tokenVerfication = async(req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Missing token' });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await usersModel.findById(decoded.id, { password: 0 });
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'unauthorized' });
    }
};

module.exports = tokenVerfication;