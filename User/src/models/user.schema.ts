import mongoose from "mongoose";
import { mongoConnection } from "../provider/mongo/mongo.connection";
import { COLLECTION } from "../interface/enum";


interface IUser {
    name: string,
    username: string,
    email: string,
    password: string,
    role?: string,
    stripeId?: string,
    driveQrCode?: string,
}

const userSchema = new mongoose.Schema<IUser>({
    name: String,
    username: String,
    email: String,
    password: String,
    role: String,
    stripeId: String,
    driveQrCode: String,

})

export const UserModel= mongoConnection.getConnection().model<IUser>(COLLECTION.USER,userSchema)