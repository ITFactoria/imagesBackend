import Server from './classes/server'

//Routes
import userRoutes from './routes/user.route';
import postRoutes from './routes/post.route';

import mongoose from 'mongoose';
import bodyParser from 'body-parser';

//Upload files
import  fileupload from "express-fileupload";


const server = new Server();

//Body Parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

//File upload
server.app.use(fileupload());


//Routes
server.app.use('/api/user', userRoutes);
server.app.use('/api/post', postRoutes);

//DB Connection
mongoose.connect('mongodb://localhost:27017/fotosgram', {
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true
}, (err) => {
    if (err) throw err
    console.log("DB Conexion succesfull")
})


//Levanta Express
server.start(() => {
    console.log(`Server running in port  ${server.port}`);
});



