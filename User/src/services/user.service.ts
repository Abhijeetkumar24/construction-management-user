
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
        this.loadService()
    }

    loadService() {
        this.service=new this.package.Property("0.0.0.0:7000",credentials.createInsecure());
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
    
            console.log("hii 1")
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