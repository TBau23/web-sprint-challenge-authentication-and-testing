const router = require('express').Router();
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const jwtConfig = require("../api/config.js");

const Users = require("./usersModel.js");

router.get('/users', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(500).json({message: "Error fetching users"})
    })
})

router.post('/register', (req, res) => {
  // implement registration
  const credentials = req.body;

  const rounds = process.env.BCRYPT_ROUNDS || 7;

  const hash = bcryptjs.hashSync(credentials.password, rounds);

  credentials.password = hash;

  Users.add(credentials)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    })



});

router.post('/login', (req, res) => {
  // implement login
  const {username, password} = req.body;

  Users.findBy({ username: username})
    .then(([user]) => {
      if (user && bcryptjs.compareSync(password, user.password)) {
        const token = getJwt(user)

        res.status(200).json({message : "Login successful", token: token});
      } else {
        res.status(401).json({ message: "Invalid credentials"})
      }
    })
    .catch(err => {
      res.status(500).json({message : err.message})
    })

});

function getJwt(user) {
  const payload = {
    username: user.username
  };

  const jwtOptions = {
    expiresIn : '8h'
  };

  return jwt.sign(payload, jwtConfig.jwtSecret, jwtOptions);

};

module.exports = router;
