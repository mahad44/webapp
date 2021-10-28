require('rootpath')();
const connectDB = require('./config/db');
const dotenv=require('dotenv');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
//const errorHandler = require('_middleware/error-handler');


     app.use(bodyParser.urlencoded({ extended: false }));
     app.use(bodyParser.json());
     app.use(cors());

     connectDB();
     
     // api routes
     app.use('/users', require('./routers/user'));
     
     // global error handler
     //app.use(errorHandler);
     
     // start server
     const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
     app.listen(port, () => console.log('Server listening on port ' + port));