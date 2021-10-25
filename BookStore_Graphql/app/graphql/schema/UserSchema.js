/***********************************************************************************
 * @description   : This file contains all the schemas required for execution
 *  of queries in graphql
 * @package       : {gql} from apollo-server-express
 * @file          : UserSchema.js
 * @author        : Arka Parui
************************************************************************************/

const { gql } = require('apollo-server-express');

module.exports = gql(`
    type User{
        _id:ID!
        firstName:String!
        lastName:String!
        email:String!
        password:String!
    }
    input UserInput{
        firstName:String!
        lastName:String!
        email:String!
        password:String!
        role:String!
    }
    input LoginInput{     
        email:String!
        password:String!
    }
    type authUser
    {
        _id:ID
        token:String
        firstName:String
        lastName:String
        email:String
    }
    type Book{
        title:String
        description:String
    }
    type Query{
        books:[Book!]!
        users:[User!]!
    }
    input CreateBookInput
    {
        genre:String
        title:String!
        description:String!
    }
    type CreateBookOutput
    {
        genre:String
        title:String
        description:String
    }
  
    type Mutation{
        admin(email:String!):String
        createUser(input:UserInput):User
        loginUser(input:LoginInput):authUser
        createBook(input:CreateBookInput):CreateBookOutput   
        }`);