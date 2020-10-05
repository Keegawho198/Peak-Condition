const db = require("../models");
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const cookie =require('universal-cookie');

// Defining methods for the booksController
module.exports = {
  findAll: function (req, res) {
    db.User
      .find(req.query)
      .populate("programs")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.User
      .findById(req.params.id)
      .populate("programs")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  find: async function (req, res, next) {
    const { email, password } = req.body;
  
    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    try {
      // Check for existing user
      const user = await db.User.findOne({ email });
      if (!user) throw Error('User Does not exist');
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw Error('Invalid credentials');
  
     
  
      const token = await jwt.sign({
        userId: user.id,
        email: user.email,
        master:false
    }, 
    `abc`,
    {
        expiresIn: '1h'
    }
    );
  res.cookie('token', token);
    
    return res.json({
        userId: user.id,
        token: token,
        tokenExpiration: 1000000,
        master:false
    })

    
}
catch (err){
    console.log({err});
    next(err)
}   
  
},
  create: async function (req, res) {
    console.log(req.body, req.body.masterId);
    console.log(req.body.email);
    req.body.password = await bcrypt.hash(req.body.password, 12)
    db.User
      .create(req.body)
      .then(({ _id }) => db.Master.findOneAndUpdate({ _id: req.body.masterId }, { $push: { users: _id } }, { new: true }))
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.log(err);
        res.status(422).json(err)
      });
  },



  update: function (req, res) {
    console.log(req.body);

    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })

      .then(dbModel => {
        console.log(dbModel)
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }




};


