/**************************************************************************************************************
 * @description   : It is the authorization middleware used for verifying token in the header
 * @package       : jsonwebtoken
 * @file          : app/utilities/middleware/is-auth.js
 * @author        : Arka Parui
*****************************************************************************************************************/

const jwt = require('jsonwebtoken');

/**
      * @description Takes the header as req and verifies the token and returns true or false
      * @param {*} req
      */
module.exports = ({ req }) => {
    const token = req.headers.authorization || ''
    try {
        if (!token) {
            return req=false;
        }
            let decodedToken;   
            decodedToken=jwt.verify(token, process.env.JWT_SECRET)       
            return decodedToken;
        }
    
    catch (err) {
        return false;
    }
    
};