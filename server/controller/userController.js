const { Users } = require("../dbConfig");
const bcrypt = require("bcrypt");

// user registration
const addUser = (req, res) => {
  const data = req.body;
  Users.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        Users.create(data)
          .then((user) => {
            res.json(user);
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json({ error: error.message });
          });
      } else {
        res.json({ error: "Error id already taken" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
};

// user login
const loginUser = (req, res) => {
  const loginData = req.body;
  Users.findOne({
    email: loginData.email,
  })
    .then((user) => {
      if (user.role === "basic" && user.disable === false) {
        // if (bcrypt.compareSync(loginData.password, user.password)) {
          Users.findOneAndUpdate(
            {
              email: user.email,
            },
            {
              lastActive: Date.now(),
            }
          )
            .then((userData) => {
              res.json({ success: true, data: userData });
            })
            .catch((error) => {
              res.status(500).json({ error: error.message });
            });
        // } else {
        //   res.status(400).json({ error: error.message });
        // }
      } else if (user.role === "admin" && user.disable === false) {
        // if (bcrypt.compareSync(loginData.password, user.password)) {
          res.json({success: true, data: user})
        }
        else{
          res.status(400).json({error: "Unauthorized login"})
        }
      // } else {
      //   res.status(400).json("Unauthorized login: ");
      // }
    })
    .catch((error) => {
      res.status(500).json({ error: "invalid  credentials" });
    });
};

// get all user
const getAllUsers = (req, res) => {
  Users.find({
    role: "basic"
  })
  .then(users => {
    res.json(users)
  })
  .catch(error => {
    res.status(500).json({error: error.message})
  })
};

// toggle disable user
const toggleDisable = (req, res) => {
  if(req.params._id){
    Users.findById({
      _id: req.params._id
    })
    .then(user => {
      user.disable = !user.disable;
      user.save();
      res.json(user)
    })
    .catch(err => {
      res.status(500).json({err: err.message})
    })
  }
}
module.exports = {
  addUser,
  loginUser,
  getAllUsers,
  toggleDisable
};
