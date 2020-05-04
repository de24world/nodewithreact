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

app.post('/login', (req, res) => {

    // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
      
        }
        
            // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.

            user.comparePasword(req.body.password,  (err, isMatch ) => {
                if(!isMatch)
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})

                    // 비밀번호 까지 맞다면 토큰을 생성하기.
                      user.generateToken((err, user) => {
                          
                      })
            })


})

app.listen(port, () => console.log(`Example app listenling on port' ${port}!`))