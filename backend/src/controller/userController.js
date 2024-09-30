import users from "../model/usersModel.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

export const createUser = (request, response) => {

    const { username, email, password } = request.body

    try {
        users.create({
            username,
            email,
            password
        })

        response.status(201).json('Usuário cadastrado com sucesso.')
        return
    } catch (error) {
        response.status(400).json('Não foi possível registra um novo usuário.')
        return
    }
}

export const loginUser = async (request, response) =>{
    const {email, password} = request.body

    try {
        const user = await users.findOne({where: {email}})
        if(!user){
            return response.status(404).json({message: 'Usuário não encontrado.'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return response.status(400).json('Senha incorreta.')
        }

        const token = jwt.sign({
            id: user.id, 
            email: user.email
        }, process.env.JWT_SECRET, {expiresIn: 500})

        response.status(200).json({message: 'Login concluído.', token})
    } catch (error) {
        response.status(500).json(error)
    }
}