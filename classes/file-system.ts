import { FileUpload } from "../interfaces/file-upload";
import path from 'path';
import fs from 'fs';
import uniqId from 'uniqid';



export default class FileSystem {
    constructor() { }

    saveTemporalFile(file: FileUpload, idUser: string) {

        return new Promise((resolve, reject) => {

            //Set File Path
            let filePath = this.setPathFile(idUser);

            //Set File Name
            let fileName = this.setUniqueFileName(file.name);
            console.log("fileName: ", fileName);

            //Save file
            file.mv(`${filePath}/${fileName}`, (err: any) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    
                }
                else {
                    console.log("File crated OK");
                    resolve();

                }
            })


        })




    }

    setPathFile(idUser: string) {

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

    setUniqueFileName(fileName: string) {

        let fileNameSplit = fileName.split('.');
        let fileExtension = fileNameSplit[fileNameSplit.length - 1];
        let uniqueId = uniqId();
        let fileNameUnique = `${uniqueId}.${fileExtension}`;
        return fileNameUnique;

    }
}