const mongoose = require('mongoose');
const Manager = require('./API/Models/Manager');
async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27777/TestDatabase',{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("Connected successfully")
        
    }
    catch(error){
        console.log(`Connect fail ${error}`)
    }

}
module.exports = {connect};