const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Import body-parser
const post_route = require('./routes/postRoute.js');

app.use(cors({ origin: '*' }));
app.use(bodyParser.json()); // Apply body-parser middleware globally

mongoose.connect("mongodb://127.0.0.1:27017/digitalflake", { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api', post_route);

app.listen(8000, function () {
  console.log("Server is running on port 8000");
});
