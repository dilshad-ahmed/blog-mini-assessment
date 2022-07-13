const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect(process.env.DB_URI).then(() => {
        console.log("database is running")
    }).catch((error) => {
        console.log("Database Error ===>", error);
    })
}

module.exports = dbConnect;