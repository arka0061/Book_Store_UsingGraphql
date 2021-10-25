/**************************************************************************************************************
 * @description   : It is used to generate Token.
 * @package       : bcryptjs
 * @file          : app/utilities/jwtToken.js
 * @author        : Arka Parui
*****************************************************************************************************************/

const jwt = require('jsonwebtoken');
class GetToken {
    
    /**
      * @description Used to create token by fetching data
      * @param {*} details
      */
    getToken = (details) => {
        const token = jwt.sign({
            id: details._id,
            email: details.email,
            role:details.role
        }, process.env.JWT_SECRET)
        return token;
    }
}
module.exports=new GetToken();