import jwt from "jsonwebtoken"

const verifyToken = (request, response)=>{
    const token = request.headers.authorization

    if (!token) {
        return response.status(403).json({message: "Token não encontrado"})
    }
}