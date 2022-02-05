const Joi = require('joi');


async function getLeastVisitedSchema(req, res, next) {
    // create schema object
    const schema = Joi.object({
        day: Joi.string().required(),
        from: Joi.number().required(),
        to: Joi.number().required(),
    });

    // schema options
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    // validate request body against schema
    const { error, value } = schema.validate(req.query, options);
    
    if (error) {
       return res.sendStatus(400)
    } else {
        next();
    }
}
module.exports = {
    getLeastVisitedSchema
}