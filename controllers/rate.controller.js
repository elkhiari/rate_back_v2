const rateModel = require("../model/rate.model");

const AddRate = async (req, res) => {
    try {
        const { rate } = req.body;
        const newRate = new rateModel({ rate });
        await newRate.save();
        res.status(201).json({ message: 'rate added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
};

const GetAllRate = async (req, res) => {
    try {
        const rates = await rateModel.find();
        res.status(200).json({ rates });
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
}



const countRate = async (req, res) => {
    try {
        const count = await rateModel.aggregate([
            {
                $group: {
                    _id: '$rate',
                    count: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
}


module.exports = { AddRate, GetAllRate, countRate };