const db = require('./models');

const User = db.User;

async function getUsers(req, res) {
  const users = await User.findAll();
  res.json(users);
};

//POST USER

async function createUser (req, res) {
  const {name, age, email} = req.body;
  const newUser = await User.create({name, age, email});
  res.json(newUser);
};

//DELETE USER

 async function deleteUser (req, res) {
  const id = req.params.id;
  await User.destroy({ where: { id } });
  res.sendStatus(204);
};

//PUT USER

 async function editUser(req, res) {
  const id = req.params.id;
  const {name, age, email} = req.body;
  await User.update({name, age, email}, { where: { id } });
  const updatedUser = await User.findByPk(id);
  res.sendStatus(204);
};

module.exports = { getUsers, createUser, deleteUser, editUser };