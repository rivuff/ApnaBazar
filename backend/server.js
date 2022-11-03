const app = require('./app')
const connectDatabase = require('./config/database')
const dotenv = require('dotenv')

//handel the uncaught exceptions
process.on('uncaughtException', err=>{
    console.log(`error ${err.message}`);

    console.log('Shutting down dute to uncaught exceptions');;
    process.exit(1);
})


//setting up config file
dotenv.config({path: 'backend/config/config.env'})


//connecting to database
connectDatabase();


const server = app.listen(process.env.PORT, ()=>{
    console.log(`server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV}`)
})

//handle unhandeld promise rejection

process.on('unhandledRejection', err=>{ 
    console.log(`ERROR: ${err.message}`);
    console.log(`shutting down the server due to unhaldeld prormise rejection`);
    server.close(() => {
        process.exit(1)
    })
}) 