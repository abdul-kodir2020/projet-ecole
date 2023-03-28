const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
    .then((reponse) => console.log("db connectée"))
    } catch (error) {
        console.log(error)
        process.exit()
    }
    
}

module.exports = connectDB