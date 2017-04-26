//importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/contactlist');

//on connection
mongoose.connection.on('connected', ()=>{
    console.log('connected to database @ 27017');
});
//on error
mongoose.connection.on('error', (err)=>{
    if(err){
        console.log('error in db connect:'+err);
    }
});

const route = require('./routes/route');
//port no
const port = 3000;

//adding middleware
app.use(cors());

//body parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname,'public')))

//routes
app.use('/api', route);

//testing server
app.get('/',(req,res)=>{
    res.send('foobar');
});

app.listen(port,()=>{
    console.log('server started at port:'+port);
});