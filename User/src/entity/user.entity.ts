import { UserModel } from "../models/user.schema";
import BaseEntity from "./base.entity";

class UserEntity extends BaseEntity{
    constructor(){
        super(UserModel)
    }
}

export const userEntity = new UserEntity();