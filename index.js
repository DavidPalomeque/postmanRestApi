//Simple API example
//Dependencies installed express , mongoose , nodemon -D , morgan(optional)
//Use Postman for manage the API

//VARIABLES
const express = require("express")
const morgan = require("morgan")

//INITIALIZATIONS
const app = express()
require("./database")

//SETTINGS
app.set("port" , process.env.PORT || 3103)
app.use(express.urlencoded({extended : false}))
app.use(express.json())

//MIDDLEWARES
app.use(morgan("dev"))

//ROUTES
app.use(require("./routes/index"))

//SERVER
app.listen(app.get("port") , () => {
    console.log("Server on port " + app.get("port"))
})