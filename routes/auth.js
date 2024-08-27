const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = require('../model/User')

router.get('/login' , async (req , res) => {
    const {userName , password} = req.body;

    try {
        const foundUser = await User.findOne({userName})
        if(!foundUser) {
            return req.json({'message' : `User - ${userName} not found , Kindly sign up first`})
        }

        const pwdMatch = await bcrypt.compare(password , foundUser.password);

        if(!pwdMatch) {
            return res.json({'message' : `Incorrect UserName or Password`})
        }

        res.status(200).json({'message' : `User ${foundUser} logged In!`})
    } catch(err) {
        console.log(err)
        return res.status(500).json({'message' : `Internal Server Error`})
    }
})

router.post('/signUp' , async (req , res) => {
    const {userName , password , email} = req.body;

    console.log('inside signUp function')

    try {
        const foundUser = await User.findOne({userName})

        if(foundUser) {
            return res.json({'message' : `Duplicate userName , try another userName`})
        }

        const hashedPwd = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            userName : userName , 
            password : hashedPwd ,
            email : email
        })

        console.log(newUser)

        res.status(200).json({'message' : `New User - ${newUser} created`})
    } catch(err) {
        console.log(err)
        return res.status(500).json({'message' : `Internal Server Error`})
    }
})

module.exports = router;