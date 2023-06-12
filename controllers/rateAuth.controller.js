const  EcranFingerprintModel = require("../model/rateAuth.model");
const jwt = require('jsonwebtoken');
const AddFingv = async(req,res) =>{
    try {
        const {pin,ecran} = req.body;
        if(req.user.rol !== "admin") return res.status(401).json({message:"unauthorized"})
        const newFingv = new EcranFingerprintModel({pin,ecran});
        await newFingv.save();
        res.status(201).json({message:"Fingv added successfully"});
    } catch (error) {
        res.status(500).json({message:"internal server error"});
    }
}

const getAllFingv = async(req,res) =>{
    try {
        const fingvs = await EcranFingerprintModel.find();
        if(req.user.rol !== "admin") return res.status(401).json({message:"unauthorized"})
        res.status(200).json({fingvs});
    } catch (error) {
        res.status(500).json({message:"internal server error"});
    }
}

const authFingv = async(req,res) =>{
    try {
        const {pin} = req.body;
        console.log(pin)
        const Ecran = await EcranFingerprintModel.findOne({pin});
        if(!Ecran) return res.status(404).json({message:"Ecran not found"});
        const token = jwt.sign({id:Ecran._id,role:"ecran"},process.env.JWT_FINGV_SECRET);
        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({message:"internal server error"});
    }
}

const deleteFingv = async(req,res) =>{
    try {
        const {id} = req.params;
        if(req.user.rol !== "admin") return res.status(401).json({message:"unauthorized"})
        await EcranFingerprintModel.findByIdAndDelete(id);
        res.status(200).json({message:"Fingv deleted successfully"});
    } catch (error) {
        res.status(500).json({message:"internal server error"});
    }
}

module.exports =  {AddFingv,getAllFingv,authFingv,deleteFingv}