import { Request, Response } from "express";
import { responseUtils } from "../utils/response.utils";
import { ExceptionMessage, HttpStatusCode, HttpStatusMessage, SuccessMessage } from "../interface/enum";
import { userService } from "../services/user.service";

class UserController {
    constructor() { }

    // allProperty = async (req: Request, res: Response) => {
    //     try {
    //         // const user = req['user'];
    //         // const propertyId = req.params.propertyId;
    //         let response = await userService.allProperty()

    //         let finalResponse = responseUtils.successResponse(
    //             response,
    //             SuccessMessage.PROPERTY_DETAILS_SUCCESS,
    //             HttpStatusMessage.FOUND
    //         )
    //         res.status(finalResponse.code).send(finalResponse);

    //     } catch (error) {
    //         let err = responseUtils.errorResponse(
    //             error,
    //             ExceptionMessage.PROPERTY_DETAILS_ERROR,
    //         );
    //         res.status(err.code).send(err);
    //     }
    // }


    getProperty = async (req: Request, res: Response) => {
        try {

            const propertyId = req.params.propertyId;
            let response = await userService.getProperty(propertyId);
            
            res.status(HttpStatusCode.OK).json({message: response});

        } catch (error) {
            
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error);
        }
    }


    grpcProperty = async (req:Request,res:Response)=>{
        const { propertyId } = req.body;
        let data=await userService.grpcProperty(propertyId)
        res.send(data);
    }

    allProperty = async (req:Request,res:Response)=>{
        let data=await userService.allProperty()
        res.send(data);
    }

   
}

export const userController = new UserController()