import { Schema, model, Document, SchemaType } from "mongoose";

const postSchema = new Schema({
    created: { type: Date },
    message: { type: String },
    img: [{ type: String }],
    coordenadas: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'user', required: [true, 'Should exist an User Reference XXX'] },


})

postSchema.pre<IPost>('save', function (next) {
    this.created = new Date();
    next();
})

interface IPost extends Document {
    created: Date,
    message: string,
    img: string[],
    coordenadas: string,
    user: Schema.Types.ObjectId,


}

export const Post = model<IPost>('post', postSchema)