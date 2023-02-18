const express=require("express")
const {connection}=require("./db")
const { userRouter } = require("./routes/User.routes")
require("dotenv").config()
const swaggerUI=require("swagger-ui-express")
const swaggerJsDoc=require("swagger-jsdoc")

const app=express()
app.use(express.json())

//openapi specifications
const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Learning Swagger for First time",
            version:"1.0.0"
        },
        servers:[
            {
                url: "https://localhost:8080"
            }
        ]
    },
    apis:["./routes/*.js"]
}

//swagger specs
const swaggerSpec=swaggerJsDoc(options)
//build the UI
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerSpec))


app.use("/users",userRouter)

app.listen(process.env.port,async ()=>{
    try{
        await connection
        console.log("Connected to the DB")
    } catch(err){
        console.log(err)
    }
    console.log(`Running at port ${process.env.port}`)
})