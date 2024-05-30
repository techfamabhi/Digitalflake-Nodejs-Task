// registrationController.js

const bcrypt = require('bcrypt');
const Registration = require('../models/registration');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


const createNewRegister = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the salt rounds

        const newRegister = new Registration({
            email: req.body.email,
            password: hashedPassword, // Store hashed password
            mobile: req.body.mobile
        });
        const regData = await newRegister.save();
        res.status(200).send({ success: true, msg: 'Registration Successful', data: regData });
    } catch (error) {
        res.status(500).send({ success: false, msg: 'Internal Server Error', error: error.message });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if both email and password are provided
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        // Check if the user exists
        const user = await Registration.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Compare the hashed password with the provided password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Incorrect password' });
        }

        // If both email and password are correct, return success
        res.status(200).json({ success: true, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
};


module.exports = {
    createNewRegister,
    loginUser
};
