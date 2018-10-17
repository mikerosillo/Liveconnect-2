const mongoose = require("mongoose");
//this is how we connect to database to our app
const URI = "mongodb://localhost/mongodatabase"
mongoose.connect(URI, { useNewUrlParser: true })
   .then(db => console.log("DB is connected mike is awesome"))
   .catch(err => console.error(err));


module.exports = mongoose;
