require('dotenv').config();
const models = require('./models/index.js'); // ! require on top of the file
const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const { adminBro, router } = require('./admin');
const path = require('path');
const sequelize = require('./db.js');
const errorMiddleware = require('./middlewares/errorMiddleware.js');
const routes = require('./routes/index.js');
const formidableMiddleware = require('express-formidable');

const PORT = process.env.PORT || 5000;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'School API',
            version: '1.0.0',
            description: 'This is school api for teachers and students',
        },
        servers: [
            {
                url: process.env.API,
            },
        ],
    },
    apis: ['./routes/*.js'],
};

// const specs = swaggerJsDoc(options);

const app = express();

// localhost:8001/api/v1/docs

// app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors());
app.use(express.json());
app.use(formidableMiddleware());
app.use(express.static(path.resolve('public')));
app.use(fileUpload({}));
app.use(morgan('tiny'));

app.use(adminBro.options.rootPath, router);
app.use('/api/v1', routes);
app.use(errorMiddleware);

const run = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`server running on port: ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

run();
