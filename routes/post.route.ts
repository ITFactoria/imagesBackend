import { Request, Response, Router } from "express";
import { Post } from "../models/post.model";
import { verificarToken } from "../middlewares/autenticacion";
import { json } from "body-parser";
import { FileUpload } from "../interfaces/file-upload";
import FileSystem from "../classes/file-system";


const postRoutes = Router();

postRoutes.post('/', verificarToken, (req: any, res: Response) => {
    const body = req.body;
    body.user = req.user._id;

    Post.create(body)
        .then(async postDB => {
            console.log("ok");

            await postDB.populate('user', '-password').execPopulate();
            res.json({
                ok: true,
                post: postDB
            })
        })
        .catch(err => {
            console.log("err");
            res.json({
                ok: false,
                err
            })
        });

});

//get all posts
postRoutes.get('/', verificarToken, async(req: Request, res: Response) => {

    let page = Number(req.query.page) || 1;
    let limit = 10;
    let skip = (page - 1) * limit;


    const posts = await Post.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit)
        .populate('user', '-password')
        .exec()
        .then(posts => {
            res.json({
                ok: true,
                posts: posts
            })
        })
        .catch(err => {
            res.json({
                ok: false,
                err
            })
        });
});

//Post images
postRoutes.post('/upload/:idUser', verificarToken, (req: any, res: Response) => {

    let idUser = req.params.idUser;
    console.log("idUser: ", idUser)

    if(!req.files){
        return res.status(400).json({
            ok: false,
            message : "File not found"
        })
    }

    let file :FileUpload = req.files.image;

    if(!file){
        return res.status(400).json({
            ok: false,
            message : "File not found - image"
        })
    }
    
    if(!file.mimetype.includes('image')){
        return res.status(400).json({
            ok: false,
            message : "File not image"
        })
    }

    let fileSystem = new FileSystem();
    fileSystem.saveImgTemporal(file, idUser)




    res.json({
        ok: true,
        file: file.mimetype
    })


});




export default postRoutes;