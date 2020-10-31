const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const mongoose = require('mongoose');
const personal_budget_Model = require('./models/budgetModel');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use('/',express.static('public'));
app.use(cors());

app.get('/hello',(req,res) => {
    res.send('Hello World!');
});


app.get('/budget', (req, res) => {
    mongoose.connect('mongodb://127.0.0.1:27017/budget_database', {
     useNewUrlParser:true,
     useCreateIndex : true,
     useUnifiedTopology: true
    }).then(() => {
        personal_budget_Model.find({}).then((output) => {
            console.log("output is ",output);
            res.send(output);
            mongoose.connection.close();
        })
    })
 });
 
 app.post('/budget', (req, res) => {
     let data = {id: req.body.id, title: req.body.title, budget: req.body.budget, color: req.body.color}
     mongoose.connect('mongodb://127.0.0.1:27017/budget_database', {
         useNewUrlParser:true,
         useCreateIndex : true,
         useUnifiedTopology: true
        }).then( () => {
            personal_budget_Model.insertMany(data, (error, newDataentered) => {
             console.log(newDataentered);
             console.log(data);
                if(newDataentered) {
                    res.send(newDataentered);
                } else {
                 res.send(error);
                }
                mongoose.connection.close();
            })
        })
 })

app.listen(port,() => {
    console.log('Example app listening at http://localhost:'+ port)
});