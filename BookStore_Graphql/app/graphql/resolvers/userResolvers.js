/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> node server.js
 *                2. If nodemon installed    cmd> npm start
 * 
 * Purpose      : Controls the operations of user creation and other CRUD
 * 
 * @package     : bcrypt,apollo-server-errors
 * @file        : app/graphql/resolvers/userResolvers.js
 * @overview    : controls user creation, update and retrieval tasks
 * @module      : this is necessary to create new user.
 * @author      : Arka Parui
 *********************************************************************/

 const bcrypt = require('bcryptjs');
 const ApolloError = require('apollo-server-errors');
 const userModel = require('../../models/user.model');
 const adminModel=require('../../models/admin.model');
 const bcryptPassword = require('../../utilities/bcryptpassword');
 const joiValidation = require('../../utilities/joiValidation');
 const jwt = require('../../utilities/jwtToken');
 const userResolvers = {

   Query: {
 
     /**
       * @description Query to get all users from usermodel Schema in Database
       */
     users: async () => await userModel.find(),
   },
 
   Mutation: {
 
     /**
       * @description Mutation to get create user and store them in database
       * @param {*} empty
       * @param {*} input 
       */
     createUser: async (_, { input }) => {
       try {
         const usermodel = new userModel({
           firstName: input.firstName,
           lastName: input.lastName,
           email: input.email,
           password: input.password,
           role:input.role
         });
         const registerValidation = joiValidation.authRegister.validate(usermodel._doc);
         if (registerValidation.error) {
           return new ApolloError.ValidationError(registerValidation.error);
         }
         const existingUser = await userModel.findOne({ email: input.email });
         if (existingUser) {
           return new ApolloError.UserInputError('User Already Exists');
         }
         const checkIfAdmin=await adminModel.findOne({email:input.email});
         if (!checkIfAdmin) {
          return new ApolloError.AuthenticationError('Permission unauthorised');
        }
         bcryptPassword.hashpassword(input.password, (error, data) => {
           if (data) {
             usermodel.password = data;
           } else {
             throw error;
           }
           usermodel.save();
         });
         return usermodel;
       } catch (error) {
         console.log(error);
         return new ApolloError.ApolloError('Internal Server Error');
       }
     },
 
     /**
      * @description Mutation to get login user and return login credentials with token
      * @param {*} empty
      * @param {*} input 
      */
     loginUser: async (_, { input }) => {
       try {
         const loginmodel = {
           email: input.email,
           password: input.password,
         };
         const loginValidation = joiValidation.authLogin.validate(loginmodel);
         if (loginValidation.error) {
           return new ApolloError.ValidationError(loginValidation.error);
         }
         const userPresent = await userModel.findOne({ email: input.email });
         if (!userPresent) {
           return new ApolloError.AuthenticationError('Invalid Email id', { email: 'Not Found' });
         }
         const check = await bcrypt.compare(input.password, userPresent.password);
         if (!check) {
           return new ApolloError.AuthenticationError('Invalid password', { password: 'Does Not Match' });
         }
         const token = jwt.getToken(userPresent);
         if (!token) {
           throw new ApolloError.ApolloError('Internal Server Error');
         } return {
           _id: userPresent.id,
           token,
           firstName: userPresent.firstName,
           lastName: userPresent.lastName,
           email: userPresent.email,
         };
       } catch (error) {
         return new ApolloError.ApolloError('Internal Server Error');
       }
     },
     admin: async (_, { email }) => {
      try {
        const adminmodel = new adminModel({
          emailId: email,
        });
        const existingUser = await adminModel.findOne({ emailId: email });
        if (existingUser) {
          return new ApolloError.UserInputError('User Already Exists');
        }
          adminmodel.save();
        return "New Admin Added Sucessfully"
      } catch (error) {
        console.log(error);
        return new ApolloError.ApolloError('Internal Server Error');
      }
    },
   },
 };
 module.exports = userResolvers;