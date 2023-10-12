import Joi, { string } from "joi";

export const JOI_VALIDATION = {
    USER: {
        SIGN_IN: {
            name: Joi.string().required(),
            username: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string().required()
        },

        LOGIN: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            emailOtp: Joi.string(),
            token: Joi.string(),
        },

    },


    
}