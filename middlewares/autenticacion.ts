import { Request, Response, NextFunction } from "express";
import Token from "../classes/token";

export const verificarToken = (req: any, res: Response, next: NextFunction) => {

    const userToken: any = req.get('x-token');
    console.log("usetToken: ", userToken);

    Token.verifyToken(userToken)
        .then((decoded: any) => {
            console.log("decoded: ", decoded);
            req.user = decoded.user;
            next();
        })
        .catch((err) => {
            res.json({
                ok: false,
                message: "Invalid token"
            })

        }

        );
}