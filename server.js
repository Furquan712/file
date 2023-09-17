const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

const connectDB = require("./config/db")
connectDB();


//template

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');


//routes

app.use('/api/files', require('./routes/file'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));



app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})