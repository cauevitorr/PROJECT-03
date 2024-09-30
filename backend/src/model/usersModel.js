import conn from "../config/conn.js";
import { DataTypes } from 'sequelize'
import bcrypt from 'bcrypt'

const users = conn.define('users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false 
    }
})

users.beforeCreate( async (user)=>{
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
})

const syncDataBase = async ()=>{
    try {
        await conn.authenticate()
        console.log('Conexão estebelicida com sucesso.')

        await users.sync()
        console.log('tabela users criada com sucesso.')
    } catch (error) {
        console.log('Erro ao conectar-se com a tabela users no banco de dados.', error)
    }
}
syncDataBase()

export default users