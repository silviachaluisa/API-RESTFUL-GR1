import bcrypt from "bcrypt"
import { v4 as uuidv4 }  from 'uuid'

import userModel from "../models/user.js"
import { createToken } from "../middlewares/auth.js"

const registerUserController = async(req,res)=>{
    //:PUNTO  1 
    // Desestructuración- rest
    const {password,...otherDataUser}= req.body
    // encriptar el password
    const hashedPassword = await bcrypt.hash(password,10)
    // creación del objeto - spread 
    const newUserData ={
        id:uuidv4(),
        password:hashedPassword,
        ...otherDataUser
    }
    //: PUNTO 2
    const user = await userModel.registerUserModel(newUserData)
    //: PUNTO 3
    res.status(201).json(user)
}


const loginUserController = async (req,res)=>{
    const{username,password} = req.body
    try {
        const user = await userModel.loginUserModel(username,password)
        const token = createToken(user)
        res.status(200).json({user,token})
    } catch (error) {
        res.status(500).json({msg:error})
    }

}


export{
    registerUserController,
    loginUserController
}

