const express = require('express');
const post_route = express.Router();
const { body } = require('express-validator');
const StateController = require('../controllers/StateController');
const CityController = require('../controllers/CityController');
const WarehouseController = require('../controllers/WarehouseController');
const LoginController = require('../controllers/LoginController');

// stateister route with validation
post_route.post('/create-state',StateController.createState);


post_route.get('/get-state',StateController.getstate);
post_route.get('/update-state/:id',StateController.updatestate);
post_route.post('/state-update/:id',StateController.stateupdate);
post_route.get('/delete-state/:id', StateController.deletestate);

 
//city routes

post_route.post('/create-city',CityController.createCity);
post_route.get('/get-city',CityController.getCity);
post_route.get('/get-city-new',CityController.getcitynew);

post_route.get('/update-city/:id',CityController.updatecity);
post_route.post('/city-update/:id',CityController.cityupdate);
post_route.get('/delete-city/:id', CityController.deletecity);

post_route.get('/getCityWithState',CityController.getCityWithState);



//Warehouse routes
post_route.post('/create-warehouse',WarehouseController.createwarehouse);
post_route.get('/getStatenew',WarehouseController.getStatenew);
post_route.get('/getallcities',WarehouseController.getallcities);
post_route.get('/getWarehouseData',WarehouseController.getWarehouseData);

post_route.get('/delete-warehouse/:id', WarehouseController.deletwarehouse);

post_route.get('/update-warehouse/:id',WarehouseController.updatewarehouse);
post_route.post('/warehouse-update/:id',WarehouseController.warehouseupdate);




post_route.post('/createnewregister', LoginController.createNewRegister);
post_route.post('/loginUser', LoginController.loginUser);




module.exports = post_route;
