const rateModel = require("../model/rate.model");

const AddRate = async (req, res) => {
  try {
    const { rate, comment, services } = req.body;
    const newRate = new rateModel({ rate, comment, services });
    await newRate.save();
    res.status(201).json({ message: "rate added successfully" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log(error);
  }
};

const getServices = async (req, res) => {
  try {
    const serviceCounts = await rateModel.aggregate([
      { $unwind: "$services" }, // Unwind the services array
      {
        $group: {
          _id: { rate: "$rate", service: "$services" },
          count: { $sum: 1 },
        },
      }, // Group by rate and service, count occurrences
      {
        $group: {
          _id: "$_id.rate",
          services: { $push: { service: "$_id.service", count: "$count" } },
        }, // Group by rate, create array of services and counts
      },
      { $project: { _id: 0, rate: "$_id", services: 1 } }, // Project to rename fields
    ]);
    res.status(200).json({ serviceCounts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const GetAllRate = async (req, res) => {
  try {
    const rates = await rateModel.find();
    res.status(200).json({ rates });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

const countRate = async (req, res) => {
  try {
    const count = await rateModel.aggregate([
      {
        $group: {
          _id: "$rate",
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

const deleteAll = async (req, res) => {
  try {
    const rates = await rateModel.deleteMany();
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = { AddRate, GetAllRate, countRate, deleteAll, getServices };
