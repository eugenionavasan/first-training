const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const db = require('./models');
const app = express()
const router = require('./router');




//call middlewares
app.use(router);
app.use(cors());
app.use(bodyParser.json());
const User = db.User;


//ROUTES

//GET USERS
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

//POST USER

app.post('/users', async (req, res) => {
  const {name, age, email} = req.body;
  const newUser = await User.create({name, age, email});
  res.json(newUser);
});

//DELETE USER

app.delete('/users/:id', async (req, res) => {
  const id = req.params.id;
  await User.destroy({ where: { id } });
  res.sendStatus(204);
});

//PUT USER

app.put('/users/:id', async (req, res) => {
  const id = req.params.id;
  const {name, age, email} = req.body;
  await User.update({name, age, email}, { where: { id } });
  const updatedUser = await User.findByPk(id);
  res.sendStatus(204);
});

const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});