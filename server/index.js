const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config(); // loads .env variables
const UserModel = require('./models/Users');



const app = express();
app.use(cors());
app.use(express.json());


// Connect MongoDB
connectDB();
// Get all the users
app.get('/getUser', (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err))
})


// Create user
app.post('/createUser', (req, res) => {
    UserModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

// Create single User
app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById(id)
        .then(users => res.json(users))
        .catch(err => res.json(err))

})

// update user
app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate(id,
        {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        },
        { new: true } )
        .then(users => res.json(users))
        .catch(err => res.json(err))
})


// delete User
app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

 

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});