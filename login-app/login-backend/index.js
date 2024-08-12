const bodyParser = require('body-parser');
const express=require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const jwt=require("jsonwebtoken");
require('dotenv').config();
const app=express();
app.use(cors());
app.use(bodyParser());

mongoose.connect('mongodb://0.0.0.0:27017/login-task');
const User = require('./models/user');

app.post('/login', async function (req, res) {
    try {
        const { userName, token, password } = req.body;
        let match = false;
        const user = await User.findOne({ userName });
        if (!user) {
            return res.send({
                status: 'failed',
                message: 'User not registered'
            });
        }
        match = user.password === password ? true : false;

        if (!match) {
            return res.send({
                status: 'failed',
                message: 'invalid credentials'
            });
        }
        let url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`
        const response = await fetch(url, {method: 'post'});
        let resObj = await response.json();
        let success = await resObj.success;
        let isVerified = false;
        if(success){
            isVerified = true;
        }
        res.send({
            status: 'success',
            isVerified: isVerified
        });
    } catch (e) {
        res.json({
            status: 'failed',
            message: e.message
        });

    }
});

app.post('/signup', async function (req, res) {
    try {
        const { name, userName, password } = req.body.userObj;
        await User.create({ name: name, userName: userName, password: password});
        res.send({
            status: 'success',
            message: 'User registered success'
        });
    } catch (e) {
        res.status(400).send({
            status: 'failed',
            message: e.message
        });
    }
});

app.post('/reset-password', async(req, res)=>{
    try{
        const {userName, token} = req.body;
        const user = await User.findOne({ userName });
        if (!user) {
            return res.send({
                status: 'failed',
                message: 'User not registered'
            });
        }
        let url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`
        const response = await fetch(url, {method: 'post'});
        let resObj = await response.json();
        let success = await resObj.success;
        let isVerified = false;
        if(success){
            isVerified = true;
        }
        res.send({
            status: 'success',
            isVerified: isVerified,
            id: user ? String(user._id) : ''
        });
    } catch (e) {
        res.status(400).send({
            status: 'failed',
            message: e.message
        });
    }
    
})

app.put('/new-password', async(req, res)=>{
    try{
        const body = req.body;
        const _id = body.id;
        const password = body.password;
        const user = await User.findByIdAndUpdate(_id,{password: password});
        res.send({status: 'success', message: "Password updated successfully"});
    } catch (e) {
        res.status(400).send({
            status: 'failed',
            message: e.message
        });
    }
})

app.listen('3070', console.log("server running port 3070"));