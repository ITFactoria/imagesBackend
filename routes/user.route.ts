import { Router, Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import Token from "../classes/token";
import { verificarToken } from "../middlewares/autenticacion";


const userRoutes = Router();

userRoutes.get('/test', (req, res) => {
    res.json({
        ok: true,
        message: 'Todo bien todo bien'
    })
})

userRoutes.post('/login', (req: Request, res: Response) => {

    const body = req.body;
    User.findOne({ email: body.email }, (err, userDB) => {
        if (err) throw err;

        if (!userDB) {
            res.json({
                ok: false,
                message: 'User or password not valid'
            })

        }

        if (userDB != null && userDB.compararPassword(body.password)) {

            const tokenUser = Token.getJwtToken({
                _id: userDB._id,
                name: userDB.name,
                email: userDB.email
            })

            res.json({
                ok: true,
                token: tokenUser
            })
        }
        else {
            res.json({
                ok: false,
                message: 'User or password not valid xxxxxx'
            })
        }


    })

})


userRoutes.post('/', (req, res) => {

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)

    };

    User.create(user)
        .then(userDB => {
            const tokenUser = Token.getJwtToken({
                _id: userDB._id,
                name: userDB.name,
                email: userDB.email
            })
            res.json({
                ok: true,
                user,
                token: tokenUser
            })
        })
        .catch(err => {
            res.json({
                ok: false,
                err
            })

        })

})

userRoutes.put('/:idUser', verificarToken, (req: any, res: Response) => {
    console.log("put: ", req.params.idUser);
    const idUser = req.params.idUser;
    const user = req.body;
    console.log("user: ", user)

    User.findByIdAndUpdate(idUser, user, { new: true }, (err, userDB) => {
        if (err) throw err;

        if (!userDB) {
            res.json({
                ok: false,
                message: 'Error: User not found'
            })

        }

        res.json({
            ok: true,
            user: userDB

        })
    })
    
});




export default userRoutes;