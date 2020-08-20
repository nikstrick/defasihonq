const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator/check')
const config = require('config');
const Product = require('../../models/Product');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('phone', 'Phone no. is required').isLength({min:10,max:10}),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password must conatin 6 or more characters').isLength({min:6})
],
async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors.array)
        return res.status(400).json({errors : errors.array()});
    }
    const { name,phone,email,password,admin} = req.body;
    try{
         let user = await User.findOne({phone});
         if(user){
             return res.status(400).json({
                 errors : [{msg:"User already exists"}]
             });
         }
         user = new User({
             name,phone,email,password,admin
         });
         const salt = await bcrypt.genSalt(10);
         user.password = await bcrypt.hash(password,salt);
         //res.send("user registered");
         await user.save();

         const payload = {
             user:{
                 id : user.id
             }
         }

         jwt.sign(payload, config.get('jwtSecret'),
         {expiresIn: 360000},
         (err,token)=>{
             if(err) throw err;
             res.json({token});
         }
         );


    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }

});

router.put('/cart', [auth], async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    try {
      const product = await Product.findById(req.body._id);
      const user = await User.findById(req.user.id).select('-password');
      let flag= false;
      const cart = user.cart;
      cart.map((e)=>{
        if(e._id === req.body._id)
        {
            flag = true;
            e.quantity=req.body.quantity+e.quantity;
        }
      })

      if(flag)
      {
        user.cart=[];
        user.cart=cart;
        await user.save();
        console.log(user.cart);
        res.json(user.cart);
      }
      else{
      const newCartItem = {
        name: product.productName,
        _id: req.body._id,
        brand: product.productBrand,
        productId: product.productId,
        quantity: req.body.quantity,
        mrp: product.mrp,
        price: product.price,
      };
      user.cart.unshift(newCartItem);
      await user.save();
      res.json(user.cart);
    }
      // res.json(products);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  // @route  Delete api/users/cart/:id
  // @desc   Add Items to the cart of user by product id
  // @access Private
  router.delete('/cart', [auth], async (req, res) => {
    try {
      // const product = await Product.findById(req.body._id);
      console.log(req.body.body);
      const user = await User.findById(req.user.id).select('-password');
      user.cart = user.cart.filter((item) => item._id !== req.body.body);
      await user.save();
      res.json(user.cart);
  
      // res.json(products);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


  router.get('/cart', [auth], async (req, res) => {
    try {
      // const product = await Product.findById(req.body._id);
      // console.log(req.body);
      const user = await User.findById(req.user.id).select('-password');
      res.json(user.cart);
  
      // res.json(products);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


  router.put('/deletecart',auth, async (req, res)=>{
    //const {orderID,userID,orderItems,orderTotal,paymentMethod,address,completed} = req.body;
    try{
        const user = await User.findById(req.user.id);
        //console.log(user);
        user.cart=[];
         await user.save();
         res.send("user cart deleted");
    
    }
    catch(err){
        console.log(err);
        console.error(err.message);
        res.status(500).send("Server error");
    }

});



module.exports = router;