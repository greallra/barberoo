const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_ATLAS_URL,{
 useNewUrlParser: true,
 useCreateIndex: true
})

//export db connect
const db = mongoose.connection
module.exports = db;
