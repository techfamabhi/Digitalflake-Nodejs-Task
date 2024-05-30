const City = require('../models/city_model'); // Correct import
const { body, validationResult } = require('express-validator');

const createCity = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const newCity = new City({ // Use City here
            name: req.body.name,
            code: req.body.code,
            state: req.body.state,
            status: req.body.status
        });
        const regdata = await newCity.save();
        res.status(200).send({ success: true, msg: 'City Data', data: regdata });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
};

const getCity = async (req, res) => {
    try {
        const data = await City.find({}).populate('state'); // Use City here and populate state
        res.status(200).send({ success: true, msg: 'City Fetch', data: data });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
};




const getcitynew = async (req, res) => {
    try {
        const data = await City.find({});
        res.status(200).send({ success: true, msg: 'City Fetch', data: data });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}






const updatecity = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await City.findById(id);
        res.status(200).send({ success: true, msg: 'Get Edit Data', data: data });
    }
    catch (error) {
        res.status(400).send({ success: false, msg: error.message })
    }
}


const cityupdate = async (req, res) => {
    var id = req.params.id;
    console.log(id);

    try {

        var name = req.body.name;
        var code = req.body.code;
        var state = req.body.state;
        var status = req.body.status;

        const data = await City.findByIdAndUpdate({ _id: id }, { $set: { name: name,state:state, code: code,status:status } })
        res.status(200).send({ success: true, msg: 'City Updated Successfully', data });

    }
    catch (error) {
        res.status(400).send({ success: false, msg: error.message })
    }
}






const deletecity = async (req, res) => {
    try {
        const id = req.params.id;
        await City.deleteOne({ _id: id });
        res.status(200).send({ success: true, msg: 'City Deleted' });

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}



const getCityWithState = async (req, res) => {
    try {
        const citiesWithState = await City.aggregate([
            {
                $lookup: {
                    from: 'states', // Name of the State collection
                    localField: 'state',
                    foreignField: '_id',
                    as: 'stateDetails'
                }
            },
            {
                $unwind: '$stateDetails' // Deconstruct the array created by $lookup
            },
            {
                $project: {
                    cityName: '$name',
                    cityCode: '$code',
                    cityStatus: '$status',
                    stateName: '$stateDetails.name',
                    stateCode: '$stateDetails.code',
                    stateStatus: '$stateDetails.status'
                }
            }
        ]);
        
        res.status(200).json({ success: true, msg: 'Cities with State details fetched successfully', data: citiesWithState });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

module.exports = {
    createCity,
    getCity,
    getcitynew,
    updatecity,
    cityupdate,
    deletecity,
    getCityWithState

};
