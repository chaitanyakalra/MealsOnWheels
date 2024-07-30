const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');
const e = require('express');

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;

    await data.splice(0, 0, { Order_data: req.body.order_data })

    let eId = await Order.findOne({ 'email': req.body.email })
    console.log(eId)
    if (eId === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error" + error.message)
        }
    }

    else {
        try {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: { Order_data: data } } },
                { upsert: true }
            )
            res.json({ success: true });
        } catch (error) {
            console.error('Error processing order:', error);
            res.status(500).send(error.message);
        }
    }
})

router.post('/myorderData', async (req, res) => {
    try{
        let myData = await Order.findOne({'email':req.body.email})
        res.json({orderData:myData})
    }catch(error){
        res.send("Server Error in Order Data" , error.message)
    }
})

module.exports = router;