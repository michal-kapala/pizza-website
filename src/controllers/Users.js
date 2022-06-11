const {
  QueryUsers,
  UpdateUsers,
  InsertIntoUsers,
} = require("../service/Users");

const GetUser = async (req, res) => {
  const email = req.params.email;
  const user = await QueryUsers(email);
  return res.send(user[0]);
};

const InsertUser = (req, res) => {
  const userDetails = req.body.UserDetails;
  InsertIntoUsers(userDetails);
  return res.sendStatus(201);
};

const UpdateUser = (req, res) => {
  const userDetails = req.body.UserDetails;
  UpdateUsers(userDetails);
  return res.sendStatus(200);
};

module.exports = { GetUser, InsertUser, UpdateUser };
