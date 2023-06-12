
const axios = require('axios');
const jwt = require('jsonwebtoken');
const usersModel = require('../model/users.model');

const authController = async (req,res) => {
    try {
        const {code} = req.body || req.query;
        const tokenResponse = await axios.post(
            `https://oauth2.googleapis.com/token`,
            {
              code,
              client_id: process.env.CLIENT_ID,
              client_secret: process.env.CLIENT_SECRET,
              redirect_uri: process.env.REDIRECT_URI,
              grant_type: 'authorization_code',
            }
          );
          const { access_token } = tokenResponse.data;
          if (!access_token) {
            return res.status(400).json({ message: 'Invalid code' });
          }
          const userResponse = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
          );
          const { email, name, picture, id } = userResponse.data;
          const userDB = await usersModel.findOne({ email });
          if (userDB) {
            const token = jwt.sign({ id: userDB._id }, process.env.JWT_SECRET);
            return res
              .status(200)
              .json({ message: 'Login success', token, user: userDB });
          } else {
            const newUser = new usersModel({
              email,
              displayName: name,
              image: picture,
              googleId: id,
            });
      
            await newUser.save();
      
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            return res
              .status(200)
              .json({ message: 'Login success', token, user: newUser });
          }
        console.log(access_token)
    } catch (error) {
        // console.log(error)
        return res.status(500).json({message: 'internal server errorZZ'})
    }
}

module.exports = {authController};