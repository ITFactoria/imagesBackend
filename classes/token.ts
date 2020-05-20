import jwt from "jsonwebtoken";

export default class Token {
    private static seed = 'this-is-my-favorite-token';
    private static caducidad = '7d';

    constructor() { }

    static getJwtToken(payload: any): string {
        return jwt.sign({ user: payload }, this.seed, { expiresIn: this.caducidad })
    }

    static verifyToken(userToken: string) {

        return new Promise((resolve, reject) => {
            jwt.verify(userToken, this.seed, (err, decoded) => {
                if (err) {
                    console.log("reject")
                    reject();
                }
                else {
                    console.log("resolve: ", decoded);
                    
                    resolve(decoded);
                }
            })
        })
    }

}