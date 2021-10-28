/**************************************************************************************************************
 * @description   : It is use to validate the inputs we are getting from client side using joi and
 *                  also using Regular expression to follow the pattern properly.
 * @package       : joi
 * @file          : app/utilities/joiValidation.js
 * @author        : Arka Parui
*****************************************************************************************************************/

const Joi = require('joi');
class joiValidation {

    /**
 * @description   : validating all parameters we are getting from the user for registration
 * @method        : string, min, required, regex pattern
*/
    authRegister =
        Joi.object({
            firstName: Joi.string()
                .min(2)
                .required()
                .pattern(new RegExp('[A-Za-z]{2,}')),

            lastName: Joi.string()
                .min(2)
                .required()
                .pattern(new RegExp('[A-Za-z]{2,}')),

            email: Joi.string()
                .pattern(new RegExp('^[a-zA-z]{3}([+-_ .]*[a-zA-Z0-9]+)*[@][a-zA-z0-9]+(.[a-z]{2,3})*$'))
                .required(),

            password: Joi.string()
                .pattern(new RegExp('[A-Za-z0-9]{4,}[$&+,:;=?@#|<>.^*()%!-]{2,}'))
                .required(),
            _id: Joi.required(),
            role:Joi.required()
        })

    /**
* @description   : validating all parameters we are getting from the user for login
* @method        : string, min, required, regex pattern
*/
    authLogin =
        Joi.object({
            email: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]+([+_.-][a-zA-Z0-9]+)*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$'))
                .required(),

            password: Joi.string()
                .required()
                .pattern(new RegExp('[A-Za-z0-9]{4,}[$&+,:;=?@#|<>.^*()%!-]{2,}'))
        });
}
module.exports = new joiValidation();