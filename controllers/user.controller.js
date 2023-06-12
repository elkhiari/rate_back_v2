const usersModel = require('../model/users.model');
const me = async (req, res) => {
    try {
        const user = await usersModel.findById(req.user.id, { password: 0 });
        if(!user) return res.status(404).json({ message: 'user not found' });
        return res.status(200).json({ user });
    }
    catch (error) {
        return res.status(500).json({ message: 'internal server error' });
    }
}

const getAllUsers = async (req, res) => {
    try {
        if (req.user.rol !== 'admin') return res.status(401).json({ message: 'unauthorized' });
        const users = await usersModel.find();
        return res.status(200).json({ users });
    }
    catch (error) {
        return res.status(500).json({ message: 'internal server error' });
    }
}

const activeUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.user.rol !== 'admin') return res.status(401).json({ message: 'unauthorized' });
        const user = await usersModel.findById(id);
        if (!user) return res.status(404).json({ message: 'user not found' });
        user.rol = 'admin';
        await user.save();
        return res.status(200).json({ message: 'user activated successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'internal server error' });
    }
}

const deactiveUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.user.rol !== 'admin') return res.status(401).json({ message: 'unauthorized' });
        const user = await usersModel.findById(id);
        if (!user) return res.status(404).json({ message: 'user not found' });
        user.rol = 'not-verified';
        await user.save();
        return res.status(200).json({ message: 'user deactivated successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'internal server error' });
    }
}


module.exports = { me, getAllUsers, activeUser, deactiveUser };