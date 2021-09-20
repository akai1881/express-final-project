require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const sequelize = require('./db.js');
const errorMiddleware = require('./middlewares/errorMiddleware.js');
const routes = require('./routes/index.js');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use('/static', express.static(path.resolve('public')));
app.use(morgan('tiny'));

app.use('/api/v1', routes);
app.use(errorMiddleware);

const run = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    app.listen(PORT, () => {
      console.log(`server running on port: ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

run();
