const mongoose = require("mongoose")

const StudentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            min: 5,
            max: 20,
            required:true
        },
        age: {
            type: String,
            min: 2,
            max: 2,
            required:true
            
        },
        class: {
            type: String,
            required:true
            
        },
        phone_number: {
            type: String,
            required:true
            
        }
        
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Student',StudentSchema)