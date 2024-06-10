import bcrypt from "bcrypt"

const userModel ={

    async registerUserModel(newUserData){
        //: Punto 1
        const url = 'http://localhost:4000/users'
        const peticion = await fetch(url,{
            method:'POST',                               
            body:JSON.stringify(newUserData),              
            headers:{'Content-Type':'application/json'} 
        })
        const data = await  peticion.json()
        //: Punto 2
        return data
    }
    ,

    async loginUserModel(userName,password){
        //: Punto 1
        const url = 'http://localhost:4000/users'
        const peticion = await fetch(url)
        const users = await  peticion.json()
        const user =users.find(user=> user.username===userName)
        if(!user){
            return{error:"Username o password invalid"}
            }
            const passwordMatch = await bcrypt.compare(password,user.password)
            if(user && passwordMatch){
                //Punto2
                return user
            }else{
                return{error:"Username o password invalid"}
            }
    }

}


export default userModel