const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const { User } = require('./models/User');
require('dotenv').config();

// application/x-www-from-urlendcoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-fsyne.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/register', (req, res) => {
    

    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) return res.json({ sucess: false, err})
        return res.status(200).json({
            sucess: true
        })
    })


})

app.listen(port, () => console.log(`Example app listenling on port' ${port}!`))