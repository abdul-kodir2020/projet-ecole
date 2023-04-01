const express = require("express")
const app = express()
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const cors = require("cors")
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // for some legacy browsers
  }

dotenv.config()

//Base de donnée
connectDB()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors(corsOptions))

app.use('/students',require("./routes/students.route"))



//serveur
app.listen(process.env.PORT, () =>{
    console.log("Serveur démarré")
})


