const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

const connectDB = require("./config/db")
connectDB();


//routes

app.use('/api/files', require('./routes/file'));



app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})