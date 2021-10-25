/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> node server.js
 *                2. If nodemon installed    cmd> npm start
 * 
 * Purpose      : Controls the operations of note creation and other CRUD
 * 
 * @package     : apollo-server-errors
 * @file        : app/graphql/resolvers/noteResolvers.js
 * @overview    : controls book creation,deletetion update and retrieval tasks
 * @module      : this is necessary to create new books
 * @author      : Arka Parui
 *********************************************************************/

const ApolloError = require('apollo-server-errors');
const bookModel = require('../../models/book.model');

const bookResolvers = {
  Query: {

    /**
     * @description Query to get all books from bookModel Schema in Database
     */
    books: async (_, __, context) => {
      if (!context.id) {
        return new ApolloError.AuthenticationError('UnAuthenticated');
      }
      const checkbooks = await bookModel.find()
      if (checkbooks.length === 0) {
        return new ApolloError.UserInputError('User has not created any books till now');
      }
      return checkbooks;
    }
  },
    Mutation: { 
      /**
        * @description Mutation to create a book and store it in bookModel Schema of
        * Database
        * @param {*} empty
        * @param {*} input 
        * @param {*} context
        */
      createBook: async (_, { input }, context) => {
        try {
          if (!context.id) {
            return new ApolloError.AuthenticationError('UnAuthenticated');
          }
          if (context.role === "Customer") {
            return new ApolloError.AuthenticationError('Only Admin role can perform this operation');
          }
          const bookmodel = new bookModel({
            title: input.title,
            description: input.description,
            emailId: context.email,
            genre: input.genre
          });
          await bookmodel.save();
          return ({
            genre: bookmodel.genre,
            title: input.title,
            description: input.description,
          })
        }
        catch (error) {
          console.log(error);
          return new ApolloError.ApolloError('Internal Server Error');
        }
      },

      /**
        * @description Mutation to edit a existing book
        * @param {*} empty
        * @param {*} input 
        * @param {*} context
        */
      editBook: async (_, { input }, context) => {
        try {
          if (!context.id) {
            return new ApolloError.AuthenticationError('UnAuthenticated');
          }
          if (context.role === "Customer") {
            return new ApolloError.AuthenticationError('Only Admin role can perform this operation');
          }
          const checkbooks = await bookModel.find({ emailId: context.email });
          if (checkbooks.length === 0) {
            return new ApolloError.UserInputError('User has not created any books till now');
          }
          let index = 0;
          while (index < checkbooks.length) {
            if (checkbooks[index].id === input.bookId) {
              await bookModel.findByIdAndUpdate(checkbooks[index], {
                title: input.title || checkbooks[index].title,
                description: input.description || checkbooks[index].description,
                genre: input.genre || checkbooks[index].genre
              }, { new: true });
              return ({
                genre: input.genre || checkbooks[index].genre,
                title: input.title || checkbooks[index].title,
                description: input.description || checkbooks[index].description
              })
            }
            index++;
          }
          return new ApolloError.UserInputError('Book with the given id was not found');
        }
        catch (error) {
          console.log(error);
          return new ApolloError.ApolloError('Internal Server Error');
        }
      },

      /**
        * @description Mutation to delete a book
        * @param {*} empty
        * @param {*} bookId
        * @param {*} context
        */
      deleteBook: async (_, { bookId }, context) => {
        try {
          if (!context.id) {
            return new ApolloError.AuthenticationError('UnAuthenticated');
          }
          if (context.role === "Customer") {
            return new ApolloError.AuthenticationError('Only Admin role can perform this operation');
          }
          const checkbooks = await bookModel.find({ emailId: context.email });
          if (checkbooks.length === 0) {
            return new ApolloError.UserInputError('User has not created any books till now');
          }
          let index = 0;
          while (index < checkbooks.length) {
            if (checkbooks[index].id === bookId) {
              await bookModel.findByIdAndDelete(checkbooks[index]);
              return `Book with id ${bookId} was deleted sucessfully`
            }
            index++;
          }
          return new ApolloError.UserInputError('Book with the given id was not found');
        }
        catch (error) {
          console.log(error);
          return new ApolloError.ApolloError('Internal Server Error');
        }
      },
    }
  }
 module.exports = bookResolvers;