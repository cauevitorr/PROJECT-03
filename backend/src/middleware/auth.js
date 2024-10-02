import jwt from "jsonwebtoken"
import { nextTick } from "process"

export const verifyToken = (request, response, next)=>{
    const token = request.headers.authorization?.split(' ')[1]
    console.log(token)

    if (!token) {
        return response.status(403).json({message: "Token não encontrado"})
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded)=>{
        if (error) {
            return response.status(401).json({err: "Token inválido"})
        }
        request.user = decoded
        next()
    })
}