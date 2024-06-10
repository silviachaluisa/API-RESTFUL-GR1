
import tourModel from "../models/tour.js"
import {v4 as uuidv4} from 'uuid'
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs-extra'

        


//! Método del Controlador
//? 1. Tomar el request de la ruta 
//? 2. Invocar el método del modelo
//? 3.- Mandar la respuesta al frontend
                                   //: Punto 1
const getAllToursController = async( req     ,res)=>{
    try {
        console.log("Verificar-------");
        //: Punto 2
        const tours = await tourModel.getAllToursModel()
        console.log(tours);
        //: Punto 3 
        res.status(200).json(tours)
    } catch (error) {
        res.status(500).json({mgs:error})
    }
}

//! Método del Controlador
//? 1. Tomar el request de la ruta 
//? 2. Invocar el método del modelo
//? 3.- Mandar la respuesta al frontend
const createTourController = async(req,res)=>{
    //:PUNTO  1 
    const newTourData ={ // spread  req.body = {name:"Tour1", foto="bus.png"}
        id:uuidv4(),
        ...req.body

    }
    //: PUNTO 2
    const cloudinaryResponse = await cloudinary.uploader.upload(req.files.imagen.tempFilePath,{folder:'tours'})
    newTourData.image = cloudinaryResponse.secure_url
    newTourData.public_id =cloudinaryResponse.public_id

    const tour = await tourModel.createTourModel(newTourData)
    await fs.unlink(req.files.imagen.tempFilePath)
    //: PUNTO 3
    res.status(201).json(tour)
}

const getTourByIdController = async (req,res)=>{
    //: PUNTO 1
    const {id} = req.params
    try {
        //: PUNTO 2
        const tour = await tourModel.getTourByIDModel(id)
        console.log(tour);
        const status = tour.error ? 404 : 200
        //: PUNTO 3
        res.status(status).json(tour)
    } catch (error) {
        res.status(500).json({mgs:error})
    }
}


const updateTourController = async (req,res)=>{
    //: PUNTO 1
    const {id} = req.params
    try {
        //: PUNTO 2
        const tour = await tourModel.updateTourModel(id,req.body)
        const status = tour.error ? 404 : 200
        //: PUNTO 3
        res.status(status).json(tour)
    } catch (error) {
        res.status(500).json({mgs:error})
    }
}


const deleteTourController = async (req,res)=>{
    //: PUNTO 1
    const {id} = req.params
    try {
        //: PUNTO 2
        const TourFind= await tourModelo.getTourByIDModel(id)
        await cloudinary.uploader.destroy(TourFind.public_id)

        const tour = await tourModel.deleteTourModel(id)
        const status = tour.error ? 404 : 200
        //: PUNTO 3
        res.status(status).json(tour)
    } catch (error) {
        res.status(500).json({mgs:error})
    }
}



export {
    getAllToursController,
    createTourController,
    getTourByIdController,
    updateTourController,
    deleteTourController
}

