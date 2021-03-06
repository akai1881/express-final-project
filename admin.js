const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroSequelize = require('@admin-bro/sequelize');
const db = require('./db.js');
AdminBro.registerAdapter(AdminBroSequelize);

const adminBro = new AdminBro({
    databases: [db],
    rootPath: '/admin',
});

const router = AdminBroExpress.buildRouter(adminBro);

module.exports = { adminBro, router };

console.log(adminBro);
