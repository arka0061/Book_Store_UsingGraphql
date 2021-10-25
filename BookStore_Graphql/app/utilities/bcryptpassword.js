/**************************************************************************************************************
 * @description   : It is used to encrypt password for security
 * @package       : bcryptjs
 * @file          : app/utilities/bcryptpassword.js
 * @author        : Arka Parui
*****************************************************************************************************************/

const bcrypt = require('bcryptjs');
const saltRounds = 10;
class bcryptPassword {
    /**
      * @description Used to hash password
      * @param {*} details
      * @param {*} callback
      */
    hashpassword = (details, callback) => {
        try{
        bcrypt.hash(details, saltRounds, function (err, hash) {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, hash);
            }
        })
    }
    catch (error) {
        return callback(error,null)
    }
}
}
module.exports = new bcryptPassword()