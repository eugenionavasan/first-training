const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const app = express()
const router = require('./router');




//call middlewares
app.use(router);
app.use(cors());
app.use(bodyParser.json());



const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});