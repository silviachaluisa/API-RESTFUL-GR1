import jwt from "jsonwebtoken"

const createToken = (userInfo) =>{
    //:                 1          2        3
    return jwt.sign(userInfo,'secret_key',{expiresIn:'1h'})
}

const verifyToken = (req,res,next) =>{
    //req.body rq.params
    const authHeader = req.headers.authorization

    //Validar si se esta enviando el token
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message:'Token no proporcionado.'})
    }

    //Dividir el tokern "Bearer 2300402302"
    //Token =['Bearer','2300402302']

    const token = authHeader.split(' ')[1]


    //Verififcar el token
    jwt.verify(token,'secret_key',(err,decoded)=>{
        if(err){
            return res.status(403).json({message:'Fallo al autentificar el token.'})
        }
        req.user = decoded
        next()    
    })
}

export{
    createToken,
    verifyToken
}