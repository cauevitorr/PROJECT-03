import express from 'express'
import cors from 'cors'
import conn from './config/conn.js'
import dotenv from "dotenv"
import userRouter from './router/userRouter.js'
import authRouter from './router/authRouter.js'

const port = 3333
const app = express()

dotenv.config()

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/', userRouter)
app.use('/auth', authRouter)

conn.sync().then(()=>{
    app.listen(port, ()=>{
        console.log(`Disponível em http://localhost:${port} `)
    })
}).catch((error)=> console.error(error))


