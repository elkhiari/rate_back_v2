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
        const users = await usersModel.find({ _id: { $ne: req.user.id }, email: { $ne: 'othmaneelkhiari@gmail.com' } }, { password: 0 });
        return res.status(200).json({ users });
    }
    catch (error) {
        return res.status(500).json({ message: 'internal server error' });
    }
}



const LockUser = async(req, res) => {
    try {
        const { id } = req.params;
        if (req.user.rol !== 'admin') return res.status(401).json({ message: 'unauthorized' });
        const user = await usersModel.findById(id);
        if (!user) return res.status(404).json({ message: 'user not found' });
        user.rol = user.rol === 'not-verified' ? 'admin' : 'not-verified';
        await user.save();
        return res.status(200).json({ message: 'successfully' });
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'internal server error' });
    }
}
    


module.exports = { me, getAllUsers, LockUser};