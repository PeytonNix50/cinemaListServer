require('dotenv').config();
const Express = require('express');
const app = Express();
const database = require('./db');

// sync with database
database.sync();

app.use(Express.json());

// import headers
app.use(require('./middleware/headers'));

// create endpoint for the user controller
const userController = require('./controllers/usercontroller');
app.use('/user', userController);

//create endpoint for the planning controller
const planningController = require('./controllers/planningcontroller');
app.use('/planning', planningController);

// create endpoint for the completion controller
const completionController = require('./controllers/completioncontroller');
app.use('/completion', completionController);

// specifying port for local functionality
app.listen(process.env.PORT, function() { console.log(`app is listening on port ${process.env.PORT}`) });