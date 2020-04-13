const mongoose = require('mongoose');

const MONGOURI = "mongodb+srv://pisckipy:nopassword@reviewapi-a48cn.mongodb.net/test?retryWrites=true&w=majority";

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log("connected to db!!");
  } catch (error) {
    console.error(error);
  }
}

module.exports = InitiateMongoServer;