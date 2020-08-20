const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Order = require('../../models/Order');

router.get('/admin',auth,async (req, res)=>{
    try{
    const user = await User.findById(req.user.id);
    if(!user.admin)
    {
        res.status(401).send('Access Denied');
    }
    else{
    const orders = await Order.find({}).sort({orderDate: -1});
    res.json(orders);
    }
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/admin/completed',auth,async (req, res)=>{
    try{
    const user = await User.findById(req.user.id);
    if(!user.admin)
    {
        res.status(401).send('Access Denied');
    }
    else{
    const orders = await Order.find({completed:true});
    res.json(orders);
    }
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
router.get('/admin/notcompleted',auth,async (req, res)=>{
    try{
    const user = await User.findById(req.user.id);
    console.log(user);
    if(!user.admin)
    {
        res.status(401).send('Access Denied');
    }
    else{    
    const orders = await Order.find({completed:false});
    console.log(orders);
    res.json(orders);
    }
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/',auth,async (req, res)=>{
    try{
        const user = await User.findById(req.user.id);
        console.log(user);
        //console.log("Not an Admin")
    if(user.admin)
    {
        res.status(401).send('Access Denied');
    }
    else{    
    const orders = await Order.find({userID : req.user.id}).sort({orderDate: -1});
    console.log(req.user.id);
    res.json(orders);
    }
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/completed',auth,async (req, res)=>{
    try{
    const user = await User.findById(req.user.id);
    if(user.admin)
    {
        res.status(401).send('Access Denied');
    }
    else{
    const orders = await Order.find({completed:true});
    res.json(orders);
    }
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
router.get('/notcompleted',auth,async (req, res)=>{
    try{
    const user = await User.findById(req.user.id);
    
    console.log(user);
    if(user.admin)
    {
        res.status(401).send('Access Denied');
    }
    else{    
    const orders = await Order.find({completed:false});
    console.log(orders);
    res.json(orders);
    }
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.put('/admin/mark/',auth, async (req, res)=>{
    //const {orderID,userID,orderItems,orderTotal,paymentMethod,address,completed} = req.body;
    try{
        const order = await Order.findById(req.body._id);
        const user = await User.findById(req.user.id);
        //console.log(req.body)
        if(!user.admin)
        {
            res.status(401).send('Access Denied');
        }
        else{
        order.completed=!order.completed;
         //res.json(order);
         await order.save();
         res.send("order updated");
    }
    }
    catch(err){
        
        console.error(err.message);
        res.status(500).send("Server error");
    }

});


router.post('/',auth,
async (req, res)=>{
    const {orderItems,orderTotal,paymentMethod,address} = req.body;
    try{
        const user = req.user.id;
        //console.log(user.admin);
        
        let order = new Order({
            userID:user,orderItems,orderTotal,paymentMethod,address
         });
         //console.log(order);
         await order.save();
         res.json(order);
    
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }

});


module.exports = router;