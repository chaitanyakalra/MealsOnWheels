// const express = require('express');
// const router = express.Router();
// const Order = require('../models/Orders');
// const e = require('express');

// router.post('/orderData', async (req, res) => {
//     let data = req.body.order_data;

//     await data.splice(0, 0, { Order_data: req.body.order_data })

//     let eId = await Order.findOne({ 'email': req.body.email })
//     console.log("OrderData",eId)
//     if (eId === null) {
//         try {
//             await Order.create({
//                 email: req.body.email,
//                 order_data: [data]
//             }).then(() => {
//                 res.json({ success: true })
//             })
//         } catch (error) {
//             console.log(error.message)
//             res.send("Server Error" + error.message)
//         }
//     }

//     else {
//         try {
//             await Order.findOneAndUpdate(
//                 { email: req.body.email },
//                 { $push: { order_data: { Order_data: data } } },
//                 { upsert: true }
//             )
//             res.json({ success: true });
//         } catch (error) {
//             console.error('Error processing order:', error);
//             res.status(500).send(error.message);
//         }
//     }
// })

// router.post('/myorderData', async (req, res) => {
//     try{
//         let myData = await Order.findOne({'email':req.body.email})
//         res.json({orderData:myData})
//     }catch(error){
//         res.send("Server Error in Order Data" , error.message)
//     }
// })

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Order = require('../models/Orders');

// router.post('/orderData', async (req, res) => {
//     let data = req.body.order_data;

//     console.log("Received order data:", data);

//     // Ensure data is structured correctly
//     await data.splice(0, 0, { Order_data: req.body.order_data });

//     let eId = await Order.findOne({ 'email': req.body.email });
//     console.log("Existing Order ID:", eId);

//     if (eId === null) {
//         try {
//             await Order.create({
//                 email: req.body.email,
//                 order_data: [data]
//             }).then(() => {
//                 res.json({ success: true });
//             }).catch((error) => {
//                 console.log("Error creating order:", error.message);
//                 res.status(500).send("Server Error: " + error.message);
//             });
//         } catch (error) {
//             console.log("Error in try-catch:", error.message);
//             res.status(500).send("Server Error: " + error.message);
//         }
//     } else {
//         try {
//             await Order.findOneAndUpdate(
//                 { email: req.body.email },
//                 { $push: { order_data: { Order_data: data } } },
//                 { upsert: true }
//             ).then(() => {
//                 res.json({ success: true });
//             }).catch((error) => {
//                 console.log("Error updating order:", error.message);
//                 res.status(500).send("Server Error: " + error.message);
//             });
//         } catch (error) {
//             console.log("Error in try-catch:", error.message);
//             res.status(500).send("Server Error: " + error.message);
//         }
//     }
// });

// router.post('/myorderData', async (req, res) => {
//     try {
//         console.log("Fetching orders for email:", req.body.email);
//         let myData = await Order.findOne({ 'email': req.body.email });
//         console.log("Fetched Order Data:", myData);
//         if (!myData) {
//             return res.json({ orderData: [] }); // Handle case when no orders are found
//         }
//         res.json({ orderData: myData });
//     } catch (error) {
//         console.error("Server Error in Order Data:", error.message);
//         res.status(500).send("Server Error in Order Data: " + error.message);
//     }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

// Endpoint to handle order creation
router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    data.splice(0, 0, { Order_date: req.body.order_date });

    data = data.map(item => ({
        ...item,
        img: item.img || item.name // Default image URL if img is not provided
    }));

    let eId = await Order.findOne({ email: req.body.email });
    if (eId === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
            res.json({ success: true });
        } catch (error) {
            console.error('Error creating order:', error.message);
            res.status(500).send('Server Error');
        }
    } else {
        try {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } },
                { upsert: true }
            );
            res.json({ success: true });
        } catch (error) {
            console.error('Error updating order:', error.message);
            res.status(500).send('Server Error');
        }
    }
});

// Endpoint to retrieve orders
router.post('/myOrderData', async (req, res) => {
    try {
        let myData = await Order.findOne({ email: req.body.email });
        res.json({ orderData: myData });
    } catch (error) {
        console.error('Server Error in Order Data:', error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
