const State = require('../models/state_model');
const { body, validationResult } = require('express-validator');

const createState = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const newState = new State({
            name: req.body.name,
            code: req.body.code,
            status:req.body.status
        });
        const regdata = await newState.save();
        res.status(200).send({ success: true, msg: 'State Data', data: regdata });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}



const getstate = async (req, res) => {
    try {
        const data = await State.find({});
        res.status(200).send({ success: true, msg: 'State Fetch', data: data });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}






const updatestate = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await State.findById(id);
        res.status(200).send({ success: true, msg: 'Get Edit Data', data: data });
    }
    catch (error) {
        res.status(400).send({ success: false, msg: error.message })
    }
}


const stateupdate = async (req, res) => {
    var id = req.params.id;
    console.log(id);

    try {

        var name = req.body.name;
        var code = req.body.code;
        var status = req.body.status;

        const data = await State.findByIdAndUpdate({ _id: id }, { $set: { name: name, code: code,status:status } })
        res.status(200).send({ success: true, msg: 'State Updated Successfully', data });

    }
    catch (error) {
        res.status(400).send({ success: false, msg: error.message })
    }
}






const deletestate = async (req, res) => {
    try {
        const id = req.params.id;
        await State.deleteOne({ _id: id });
        res.status(200).send({ success: true, msg: 'State Deleted' });

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}



module.exports = {
    createState,
    getstate,
    updatestate,
    stateupdate,
    deletestate
}
