const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
users.use(cors())

users.get('/', async (req, res) => {
	const userss = await User.find()
    res.json(userss)
})

users.post('/createuser', async (req, res) => {
    const data = {
        user: req.body.user,
        password: req.body.password,
        status: req.body.status
    }

    try {
        const createUser = await User.create(data)
        if (createUser) {
            res.json({status: 'ok', data: createUser})
        }else{
            res.json({status:'bad'})
        }
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

users.put('/edituser', async (req, res) => {
    const data = {
        id: req.body.id,
        user: req.body.user,
        password: req.body.password,
        status: req.body.status
    }
    try {
        const verifyUser = await User.find({user:data.user})
        
        if (verifyUser.length > 0 && verifyUser[0]._id != data.id) {
            res.json({status: 'User already registered'})
        }else{
            try {
                const editUser = await User.findByIdAndUpdate(data.id, {
                    $set: {
                        user: data.user,
                        password: data.password,
                        status: data.status
                    }
                })
                if (editUser) {
                    res.json({status: 'ok', data: editUser})
                }else{
                    res.json({status:'bad'})
                }
            } catch (err) {
                console.log(err)
                res.json(err)
            }
        }
    } catch (err) {
        console.log(err)
    }
        
})

users.post('/login', async (req, res) => {

    try {
        const findUser = await User.find({$and:[{user:req.body.user}, {password: req.body.password}]} )
        if (findUser.length > 0) {
            res.json({status: 'ok', data: findUser})
        }else{
            res.json({status:'bad'})
        }
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

users.delete('/:id', async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndRemove(req.params.id)
        
        if (deleteUser) {
            res.json({status: 'ok', data: 'deleteUser'})
        }else{
            res.json({status: 'bad'})
        }
    } catch (err) {
        console.log(err)
    }
        
})

module.exports = users