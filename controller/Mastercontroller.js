const db = require("../models");
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Master
      .find(req.query)
      .populate("users")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Master
      .findById(req.params.id)
      .populate("users")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: async function(req, res) {
    console.log(req.body);
    req.body.password = await bcrypt.hash(req.body.password, 12)
    db.Master
     .create(req.body)
     .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.log(err);
        res.status(422).json(err)
      });
  },
  find: async function (req, res, next) {
    const { email, password } = req.body;
  
    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    try {
      // Check for existing user
      const user = await db.Master.findOne({ email });
      if (!user) throw Error('User Does not exist');
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw Error('Invalid credentials');
  
     
  
      const token = await jwt.sign({
        userId: user.id,
        email: user.email,
        master:true
    }, 
    `abc`,
    {
        expiresIn: '1h'
    });
    return res.json({
        userId: user.id,
        token: token,
        tokenExpiration: 1,
        master:true
    })
}
catch (err){
    console.log({err});
    next(err)
}
 },
  update: function(req, res) {
    db.Master
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Master
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
