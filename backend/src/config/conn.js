import { Sequelize } from 'sequelize'

const conn = new Sequelize('project_03', 'root', 'Sen@iDev77!.', {
    host: 'localhost',
    dialect: 'mysql'
}) 

export default conn