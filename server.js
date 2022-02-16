require('dotenv').config();
const express = require('express');

const connectDB=require('./config/dbconn');

// connect DB
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/class/', require('./routes/class'));
app.use('/api/student/', require('./routes/student'));

app.get('/',(req,res)=>{
    res.send('server running')
})
const PORT = process.env.PORT || 5000;


const server = app.listen(PORT,()=>{
    console.log(`server running on port http://localhost:${PORT}`)
})

