import { Schema, model, Document } from 'mongoose'
import bcrypt from "bcrypt";



const userSchema = new Schema({
    name: { type: String, required: [true, 'The name is required'] },
    email: { type: String, unique: true, required: [true, 'The email is required'] },
    password: { type: String, required: [true, 'The password is required'] },

})

userSchema.method('compararPassword', function (password?: string | undefined): boolean{
    if (bcrypt.compareSync(password, this.password)) {
        return true;
   }
    else { return false}
})

interface IUser extends Document {
    name: string,
    email: string,
    password: string
    compararPassword(password: String): boolean;
}
export const User = model<IUser>('user', userSchema)