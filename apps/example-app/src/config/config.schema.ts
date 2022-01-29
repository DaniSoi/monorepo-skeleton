import * as Joi from 'joi'

export const configSchema = Joi.object({
    app: {
        greetSuffix: Joi.string().required(),
        port: Joi.number().required(),
    },
}).required().unknown()
