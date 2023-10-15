const mongoose = require('mongoose');

const dbConnection = async()=>{
    try {
      await  mongoose.connect(process.env.MONGODB_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
       // useCreateIndex: true,
       // useFindAndModify: false
      }, 60000);
      console.log('DB ONLINE');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos');
    }
}


module.exports = {
    dbConnection
}