const Warehouse = require('../models/warehouse_model'); // Correct import
const City = require('../models/city_model'); // Correct import
const State = require('../models/state_model'); // Correct import
const { body, validationResult } = require('express-validator');



const createwarehouse = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const newWarehouse = new Warehouse({ // Use Warehouse here
            name: req.body.name,
            city: req.body.city,
            state: req.body.state,
            status: req.body.status
        });
        const warehousedata = await newWarehouse.save();
        res.status(200).send({ success: true, msg: 'Warehouse Data', data: warehousedata });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
};



const getStatenew= async (req, res) => {
    try {
        const data = await Warehouse.find({}).populate('city'); // Use Warehouse here and populate state
        res.status(200).send({ success: true, msg: 'City Fetch', data: data });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
};



const getallcities = async (req, res) => {
    try {
        const data = await City.find({});
        res.status(200).send({ success: true, msg: 'All City Fetch', data: data });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}
const getWarehouseData = async (req, res) => {
    try {
        const warehousesWithState = await Warehouse.aggregate([
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
                $lookup: {
                    from: 'cities', // Name of the City collection
                    localField: 'city',
                    foreignField: '_id',
                    as: 'cityDetails'
                }
            },
            {
                $unwind: '$cityDetails' // Deconstruct the array created by $lookup
            },
            {
                $project: {
                    warehouseName: '$name', // Include warehouse name
                    warehouseStatus: '$status', // Include warehouse status
                    cityName: '$cityDetails.name', // Include city name
                    stateName: '$stateDetails.name' // Include state name
                }
            }
        ]);
        
        res.status(200).json({ success: true, msg: 'Warehouses with State and City details fetched successfully', data: warehousesWithState });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};





const updatewarehouse = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Warehouse.findById(id);
        res.status(200).send({ success: true, msg: 'Get Warehouse Edit Data', data: data });
    }
    catch (error) {
        res.status(400).send({ success: false, msg: error.message })
    }
}


const warehouseupdate = async (req, res) => {
    var id = req.params.id;
    console.log(id);

    try {

        var name = req.body.name;
        var state = req.body.state;
        var city = req.body.city;
        var status = req.body.status;

        const data = await Warehouse.findByIdAndUpdate({ _id: id }, { $set: { name: name,state:state, city:city,status:status } })
        res.status(200).send({ success: true, msg: 'Warehouse Updated Successfully', data });

    }
    catch (error) {
        res.status(400).send({ success: false, msg: error.message })
    }
}








const deletwarehouse = async (req, res) => {
    try {
        const id = req.params.id;
        await Warehouse.deleteOne({ _id: id });
        res.status(200).send({ success: true, msg: 'Warehouse  Deleted' });

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}
module.exports = {
    createwarehouse,
    getStatenew,
    getallcities,
    getWarehouseData,
    deletwarehouse,
    updatewarehouse,
    warehouseupdate
}