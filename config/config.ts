import * as dotenv from 'dotenv';
dotenv.config()

const config = {
    host: process.env.HOST,
    port: process.env.PORT,
    password: process.env.PASSWORD,
    username: process.env.USERNAME,
    database: process.env.DATABASE,
    dbUserName: process.env.DBUSERNAME,
    jwtKey: process.env.JWTKEY
}
export default config