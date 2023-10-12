import { Request, Response } from "express"
import { authService } from "../services/auth.service";
import { userEntity } from "../entity/user.entity";
import { responseUtils } from "../utils/response.utils";
import { ExceptionMessage, HttpStatusMessage, SuccessMessage } from "../interface/enum";

class AuthController {

    constructor() { }

    userSignup = async (req: Request, res: Response) => {

        const { name, username, email, password } = req.body;
        try {
            const existingUser = await userEntity.findOne({ email })
            if (existingUser) {
                let error = responseUtils.errorResponse(
                    ExceptionMessage.EMAIL_ALREADY_EXIST,
                    ExceptionMessage.EMAIL_ALREADY_EXIST,
                    HttpStatusMessage.CONFLICT
                );
                return res.status(error.code).send(error);

            }

            const response = await authService.userSignup(name, username, email, password);
            let finalResponse = responseUtils.successResponse(
                response,
                HttpStatusMessage.CREATED,
                HttpStatusMessage.CREATED
            )
            res.status(finalResponse.code).send(finalResponse);
        } catch (error) {
            const err = responseUtils.errorResponse(
                error,
                ExceptionMessage.SOMETHING_WENT_WRONG
            );
            res.status(err.code).send(err);
        }
    }

    userLogin = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        
        try {
            const response = await authService.userLogin(email, password);
            let finalResponse = responseUtils.successResponse(
                response,
                // SuccessMessage.ADMIN_LOGIN_SUCCESS,
                HttpStatusMessage.OK,
                HttpStatusMessage.OK
            )
            res.status(finalResponse.code).send(finalResponse);
        } catch (error) {
            const err = responseUtils.errorResponse(
                error,
                ExceptionMessage.LOGIN_FAILED
            );
            res.status(err.code).send(err);
        }
    }
}

export const authController = new AuthController();