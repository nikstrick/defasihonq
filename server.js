const express = require('express');
const connectDB = require('./config/db');
const app = express();


connectDB();

app.use(express.json({extended:false}));

app.get('/',(req,res)=>res.send(`Api running`)); 

app.use('/api/otp',require('./routes/api/otp'));
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/product', require('./routes/api/product'));
app.use('/api/order',require('./routes/api/order'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));