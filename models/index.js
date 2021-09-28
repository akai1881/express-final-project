const sequelize = require('./../db.js');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'teacher' },
    isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
    activationLink: { type: DataTypes.STRING },
});

const Profile = sequelize.define('profile', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    age: { type: DataTypes.INTEGER },
    img: { type: DataTypes.STRING },
    gender: { type: DataTypes.ENUM('male', 'female') },
    phone: { type: DataTypes.STRING },
});

const School = sequelize.define('school', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
    address: { type: DataTypes.STRING },
});

// const Lesson = sequelize.define('lesson', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     name: { type: DataTypes.STRING, allowNull: false, unique: true },
//     hours: { type: DataTypes.INTEGER },
// });

// const Task = sequelize.define('task', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     title: { type: DataTypes.STRING },
//     mark: { type: DataTypes.INTEGER },
//     completed: { type: DataTypes.BOOLEAN, defaultValue: false },
//     deadline: { type: DataTypes.DATE },
//     description: { type: DataTypes.TEXT },
//     type: { type: DataTypes.STRING },
// });

// const Lesson_user = sequelize.define('Lesson_user', {
//     lessonId: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: Lesson,
//             key: 'id',
//         },
//     },
//     userId: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: User,
//             key: 'id',
//         },
//     },
// });

User.hasOne(Profile);
Profile.belongsTo(User);

School.hasMany(User);
User.belongsTo(School);

// Lesson.belongsToMany(User, {
//     through: Lesson_user,
//     as: 'StudentLesson',
//     foreignKey: 'student',
//     as: 'studentId',
//     foreignKey: 'studentId',
// });
// Lesson.belongsToMany(User, { through: Lesson_user });
// User.belongsToMany(Lesson, { through: Lesson_user });

// Lesson.hasMany(Task);
// Task.belongsTo(Lesson);

// User.hasMany(Task);
// Task.belongsTo(User);

module.exports = {
    User,
    Profile,
    // Lesson,
    // Lesson_user,
    // Task,
    School,
};
