import { Request, Response } from "express";
import { responseUtils } from "../utils/response.utils";
import { ExceptionMessage, HttpStatusCode, HttpStatusMessage, SuccessMessage } from "../interface/enum";
import { userService } from "../services/user.service";

class UserController {
    constructor() { }

   
    async expressNestSignup(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password, role, notification } = req.body;
            const response = await userService.expressNestSignup(name, email, password, role, notification);

            let finalResponse = responseUtils.successResponse(
                response['message'],
                response['message'],
                response['status']
            )
            res.status(finalResponse.code).send(finalResponse);


        } catch (error) {
            let err = responseUtils.errorResponse(
                error,
                ExceptionMessage.ERROR_IN_REGISTRATION,
            );
            res.status(err.code).send(err);
        }

    }


    getProperty = async (req: Request, res: Response) => {
        try {

            const propertyId = req.params.propertyId;
            let response = await userService.getProperty(propertyId);

            res.status(HttpStatusCode.OK).json({ message: response });

        } catch (error) {

            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error);
        }
    }


    grpcProperty = async (req: Request, res: Response) => {
        const { propertyId } = req.body;
        let data = await userService.grpcProperty(propertyId)
        res.send(data);
    }

    allProperty = async (req: Request, res: Response) => {
        let data = await userService.allProperty()
        res.send(data);
    }


}

export const userController = new UserController()