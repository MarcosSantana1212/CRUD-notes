const mongoose = require('mongoose'); //importando mongoose

const {FAZTCODE_MONGODB_HOST,FAZTCODE_MONGODB_DATABASE} = process.env;
const MONGODB_URI = `mongodb://${FAZTCODE_MONGODB_HOST}/${FAZTCODE_MONGODB_DATABASE}`;

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(((db) => console.log('Database is connected')))
    .catch((err) => console.log(err));