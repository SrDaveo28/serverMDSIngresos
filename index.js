const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const flash = require('connect-flash');
const connectDB = require('./database/connection');


const app = express();

dotenv.config({ path: 'config.env' });

const PORT = process.env.PORT || 6054;

app.use(flash());

//mongoDB connection
connectDB();

//parse request to body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var corsOptions = {


    //origin: ['http://192.168.1.162:6052', 'http://45.182.131.21:6052'],
    origin: '*',
    preflightContinue: false,
    methods: "GET, PUT, DELETE, POST,HEAD,PATCH",
    optionsSuccessStatus: 204
}


app.use(cors(corsOptions));

//cargar las rutas 
app.use('/api', cors(corsOptions), require('./routes/router'));

app.listen(6054, () => {
    console.log('API REST running in port 6054!')
})