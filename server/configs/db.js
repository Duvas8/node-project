const mongoose = require('mongoose');

const connectDB = () => {
  mongoose
    .connect('mongodb://127.0.0.1:27017/node_projectDB')
    .then(() => console.log('Connected to node_projectDB!'))
    .catch((error) => console.log(error));
};

module.exports = connectDB;