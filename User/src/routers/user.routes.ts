import { Router } from "express";
import { sessionValidation } from "../middleware/session";
import { validate } from "../middleware/validation/validation";
import Joi from "joi";
import { JOI_VALIDATION } from "../middleware/validation/joi.validation";
import { userController } from "../controllers/user.controller";

class UserRouter {
    private router!: Router;

    constructor() {
        this.router = Router();
    }

    userRouter() {

        this.router.post(
            '/express-nest-signup',
            userController.expressNestSignup
        );

        this.router.get(
            '/get-property/:propertyId',
            userController.getProperty
        )

        this.router.get(
            '/grpc/property',
            userController.grpcProperty
        )

        this.router.get(
            '/grpc/all-property',
            userController.allProperty
        )

        return this.router
    }

}

export const userRouter = new UserRouter();