import { FileUpload } from "../interfaces/file-upload";
import path from 'path';
import fs from 'fs';



export default class FileSystem {
    constructor() { }

    saveImgTemporal(file: FileUpload, idUser: string) { 
        let path = this.createDirUser(idUser)
    }

    createDirUser(idUser: string) {

        let pathUser = path.resolve(__dirname, '../uploads', idUser);
        console.log("pathUser: ", pathUser);

        let pathUserTemp = pathUser + '/temp';

        let existeDirectorio = fs.existsSync(pathUser);

        if (!existeDirectorio) {
            fs.mkdirSync(pathUser);
            fs.mkdirSync(pathUserTemp);

        }
        return pathUser;


    }
}