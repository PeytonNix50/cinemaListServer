require('dotenv').config();
const Express = require('express');
const app = Express();
const database = require('./db');

database.sync();

app.use(Express.json());

app.use(require('./middleware/headers'));

const userController = require('./controllers/usercontroller');
app.use('/user', userController);

const planningController = require('./controllers/planningcontroller');
app.use('/planning', planningController);

const completionController = require('./controllers/completioncontroller');
app.use('/completion', completionController);

app.listen(process.env.PORT, function() { console.log(`app is listening on port ${process.env.PORT}`) });