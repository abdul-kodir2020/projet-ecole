const express = require("express")
const app = express()
const dotenv = require("dotenv")
const connectDB = require("./config/db")

dotenv.config()

//Base de donnée
connectDB()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/students',require("./routes/students.route"))

//serveur
app.listen(process.env.PORT, () =>{
    console.log("Serveur démarré")
})


