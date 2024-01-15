
import { AcceptAny } from "../interface/type";
import { CustomException } from "../utils/exception.utils";
import { ExceptionMessage, HttpStatusMessage, SuccessMessage } from "../interface/enum";
import axios from "axios";
import { GrpcClass } from "../provider/grpc/grpc";
import { credentials } from "@grpc/grpc-js";

class UserService extends GrpcClass {

    private service!:any;

    constructor( ) { 
        super('property.proto','propertyPackage')
        // super('auth.proto','auth')                                 // when using movie microservice auth (Nestjs) then uncomment this line for using express nestjs signup api
        this.loadService()
    }

    loadService() {
        this.service=new this.package.Property("0.0.0.0:7000",credentials.createInsecure());
        // this.service=new this.package.AuthService("localhost:50051",credentials.createInsecure());         // when using movie microservice auth (Nestjs) then uncomment this line

    }


    async expressNestSignup(name: string, email:string, password:string, role:string[], notification:string): Promise<any> {                // uncomment above two line to use nest auth microservice server 
        
        const data = await new Promise((resolve, reject) => {
            this.service.Signup({ name, email, password, role, notification }, (err, response) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(response);
                }
            });
        });

        return data;

    }


    getProperty = async (propertyId: string) => {

        const result = await axios.get(`http://localhost:5001/admin/get-property/${propertyId}`)
        return result.data;

    }


    async grpcProperty(propertyId: string) {
        try {

            const productId = { id: propertyId };
    
            const data = await new Promise((resolve, reject) => {
                this.service.GetProperty(productId, (err, response) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(response);
                    }
                });
            });
    
            return data;
        } catch (err) {
            return err;
        }
    }


    async allProperty() {
        try {
    
            const data = new Promise((resolve, reject) => {
                this.service.GetAllProperty({},(err, response) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(response);
                    }
                });
            });
    
            return data;
        } catch (err) {
            return err;
        }
    }
}

export const userService = new UserService();