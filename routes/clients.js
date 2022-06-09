const express = require('express')
const clients = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Client = require('../models/clients')
clients.use(cors())

clients.get('/', async (req, res) => {
	const clients = await Client.find()
    res.json(clients)
})

clients.post('/createclient', async (req, res) => {
    const data = {
        key: new Date().getTime(),
        businessCode: req.body.businessCode,
        name: req.body.name,
        items: []
    }
    
    try {
        const createClient = await Client.create(data)
        if (createClient) {
            res.json({status: 'ok', data: createClient})
        }else{
            res.json({status:'bad'})
        }
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

clients.post('/createpc', async (req, res) => {
    
    try {
        const verifyPc = await Client.find({items: {$elemMatch: {$or:[{ip: req.body.pcData.ip}, {mac: req.body.pcData.mac}]}}})
        var valid = true
        if (verifyPc.length > 0 ) {
            for (const item of verifyPc[0].items) {
                if (item.ip == req.body.pcData.ip && item.key != req.body.pcData.key || item.mac == req.body.pcData.mac && item.key != req.body.pcData.key) {
                    valid = false
                    res.json({status: 'pc already registered'})
                }
            }
        }
        if (valid) {
            try {
                var data = req.body.pcData
                data.key = new Date().getTime()
                const createPc = await Client.updateOne(
                    {_id: req.body.id},
                    {$push: {items: req.body.pcData}}
                )
                if (createPc) {
                    try {
                        const data = await Client.findById(req.body.id)
                        console.log(data)
                        if (data) {
                            res.json({status: 'ok', data: data})
                        }
                    } catch (error) {
                        console.log(error)
                    }
                    
                }else{
                    res.json({status:'bad'})
                } 
            } catch (error) {
                console.log(error)
            }
        }
        
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

clients.put('/editclient', async (req, res) => {
    const data = {
        id: req.body.id,
        name: req.body.name,
        code: req.body.code
    }
    try {
        const verifyClient = await Client.find({businessCode:data.code})
        
        if (verifyClient.length > 0 && verifyClient[0]._id != data.id) {
            res.json({status: 'client already registered'})
        }else{
            try {
                const editClient = await Client.findByIdAndUpdate(data.id, {
                    $set: {
                        name: data.name,
                        businessCode: data.code
                    }
                })
                if (editClient) {
                    res.json({status: 'ok', data: editClient})
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

clients.put('/editpc', async (req, res) => {
    const data = {
        key: req.body.key,
        site: req.body.site,
        monitoring: req.body.monitoring,
        description: req.body.description,
        ip: req.body.ip,
        ipAdmin: req.body.ipAdmin,
        mac: req.body.mac
    }
    try {
        const verifyPc = await Client.find({items: {$elemMatch: {$or:[{ip: data.ip}, {mac: data.mac}]}}})
        var valid = true
        if (verifyPc.length > 0 ) {
            for (const item of verifyPc[0].items) {
                if (item.ip == data.ip && item.key != data.key || item.mac == data.mac && item.key != data.key) {
                    valid = false
                    res.json({status: 'pc already registered'})
                }
            }
        }
        if(valid){
            try {
                const editPc = await Client.updateOne({items: { $elemMatch: {key: data.key}}}, {
                    $set: {
                        "items.$.site": data.site,
                        "items.$.description": data.description,
                        "items.$.monitoring": data.monitoring,
                        "items.$.ip": data.ip,
                        "items.$.ipAdmin": data.ipAdmin,
                        "items.$.mac": data.mac,
                    }
                })
                if (editPc) {
                    try {
                        const findPc =  await Client.find({items: {$elemMatch: {key: data.key}}})
                        res.json({status: 'ok', data: findPc})
                    } catch (error) {
                        console.log(error)
                    }
                    
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

clients.delete('/:id', async (req, res) => {
    try {
        const deleteClient = await Client.findByIdAndRemove(req.params.id)
        
        if (deleteClient) {
            res.json({status: 'ok', data: deleteClient})
        }else{
            res.json({status: 'bad'})
        }
    } catch (err) {
        console.log(err)
    }   
})

clients.put('/deletepc', async (req, res) => {
    try {
        console.log(req.body.key)
        const findPc =  await Client.find({items: {$elemMatch: {key: req.body.key}}})
        console.log("fino1")
        console.log(findPc)
        console.log("fino")
        try {
            const deletePc = await Client.updateOne({items: {$elemMatch: {key: req.body.key}}}, {$pull: {items:{key:req.body.key}}})
            console.log(deletePc)
            if (deletePc) {
                try {
                    const findPcc =  await Client.findById(findPc[0]._id)
                    res.json({status: 'ok', data: findPcc})
                } catch (error) {
                    console.log(error)
                }
            }else{
                res.json({status: 'bad'})
            }
        } catch (err) {
            console.log(err)
        }  
    } catch (error) {
        console.log(error)
    }
     
})

module.exports = clients