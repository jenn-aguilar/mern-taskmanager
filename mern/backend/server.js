const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose')
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/user');

dotenv.config();

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
});

// routes
app.use('/api/tasks', taskRoutes);
app.use('/api/user', userRoutes);

// connect to db
mongoose.connect(process.env.MONG_URI)
.then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
        console.log('connected to db & listening to port', process.env.PORT);
    })
})
.catch((error) => {
    console.log(error)
})

