// Importaar módulos
import express from 'express';
import routerTour from './routers/tour_routes.js'
import routerUser from './routers/user_routes.js'

import cloudinary from "cloudinary"
import dotenv from "dotenv"
import fileupload from "express-fileupload"

dotenv.config()
// Inicializaciones
const app = express()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(fileupload({
    useTempFiles : true,
    tempFileDir : './uploads'
}))

// Variables 
app.set('port',process.env.port || 3000)

// Middlewares
app.use(express.json())

// Rutas
app.get('/',(req,res)=>res.send("Server on"))

app.use('/api/v1/',routerTour)
app.use('/api/v1/',routerUser)

// Exportar la variable
export default app

