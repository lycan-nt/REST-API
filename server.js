require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const subscribersRouter = require('./routes/subscribers');

const app = express();

app.use(express.json());
app.use('/subscribers', subscribersRouter);


mongoose.connect(process.env.DATABASE_URL, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connect to Database'));





app.listen(3000, () => console.log('Server Start'));