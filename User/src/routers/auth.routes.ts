
import express, { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { validate } from "../middleware/validation/validation";
import Joi from "joi";
import { JOI_VALIDATION } from "../middleware/validation/joi.validation";

class AuthRouter {
    private router!: Router;
    constructor() {
        this.router = Router();
    }

    authrouter() {
        this.router.post(
            '/signup',
            validate.body(Joi.object(JOI_VALIDATION.USER.SIGN_IN)),
            authController.userSignup
        );

        this.router.post(
            '/login',
            validate.body(Joi.object(JOI_VALIDATION.USER.LOGIN)),
            authController.userLogin
        )

        return this.router
    }
}
export const authRouter = new AuthRouter()

