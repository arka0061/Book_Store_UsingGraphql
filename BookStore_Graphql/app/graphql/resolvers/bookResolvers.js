/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> node server.js
 *                2. If nodemon installed    cmd> npm start
 * 
 * Purpose      : Controls the operations of note creation and other CRUD
 * 
 * @package     : apollo-server-errors
 * @file        : app/graphql/resolvers/noteResolvers.js
 * @overview    : controls note creation,deletetion update and retrieval tasks
 * @module      : this is necessary to create new books
 * @author      : Arka Parui
 *********************************************************************/

 const ApolloError = require('apollo-server-errors');
 const userModel = require('../../models/user.model');
 const bookModel = require('../../models/book.model');

 const bookResolvers = {
   Query: {
 
     /**
      * @description Query to get all books from noteModel Schema in Database
      */
     books: async () => await bookModel.find()
   },
   Mutation: {
 
     /**
       * @description Mutation to get book of a registered user
       * @param {*} empty
       * @param {*} empty 
       * @param {*} context
       */
    //  getbooks: async (_, { }, context) => {
    //    try {
    //      if (!context.id) {
    //        return new ApolloError.AuthenticationError('UnAuthenticated');
    //      }
    //      const checkbooks = await noteModel.find({ emailId: context.email });
    //      if (checkbooks.length === 0) {
    //        return new ApolloError.UserInputError('User has not created any books till now');
    //      }
    //      return checkbooks
    //    }
    //    catch (error) {
    //      console.log(error);
    //      return new ApolloError.ApolloError('Internal Server Error');
    //    }
    //  },
 
     /**
       * @description Mutation to create a note and store it in noteModel Schema of
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
         if(context.role==="Customer")
         {
          return new ApolloError.AuthenticationError('Only Admin role can perform this operation');
         }
         const bookmodel = new bookModel({
           title: input.title,
           description: input.description,
           emailId: context.email,
           genre:input.genre
         });
         await bookmodel.save();
         return ({
          genre:bookmodel.genre,
          title:input.title,
          description:input.description,
         })
       }
       catch (error) {
         console.log(error);
         return new ApolloError.ApolloError('Internal Server Error');
       }
     },
 
     /**
       * @description Mutation to edit a existing note
       * @param {*} empty
       * @param {*} input 
       * @param {*} context
       */
    //  editNote: async (_, { input }, context) => {
    //    try {
    //      if (!context.id) {
    //        return new ApolloError.AuthenticationError('UnAuthenticated');
    //      }
    //      const checkbooks = await noteModel.find({ emailId: context.email });
    //      if (checkbooks.length === 0) {
    //        return new ApolloError.UserInputError('User has not created any books till now');
    //      }
    //      let index = 0;
    //      while (index < checkbooks.length) {
    //        if (checkbooks[index].id === input.noteId) {
    //          await noteModel.findByIdAndUpdate(checkbooks[index], {
    //            title: input.title || checkbooks[index].title,
    //            description: input.description || checkbooks[index].description
    //          }, { new: true });
    //          return ({
    //            title: input.title || checkbooks[index].title,
    //            description: input.description || checkbooks[index].description
    //          })
    //        }
    //        index++;
    //      }
    //      return new ApolloError.UserInputError('Note with the given id was not found');
    //    }
    //    catch (error) {
    //      console.log(error);
    //      return new ApolloError.ApolloError('Internal Server Error');
    //    }
    //  },
 
    //  /**
    //    * @description Mutation to delete a note 
    //    * @param {*} empty
    //    * @param {*} input 
    //    * @param {*} context
    //    */
    //  deleteNote: async (_, { input }, context) => {
    //    try {
    //      if (!context.id) {
    //        return new ApolloError.AuthenticationError('UnAuthenticated');
    //      }
    //      const checkbooks = await noteModel.find({ emailId: context.email });
    //      if (checkbooks.length === 0) {
    //        return new ApolloError.UserInputError('User has not created any books till now');
    //      }
    //      let index = 0;
    //      while (index < checkbooks.length) {
    //        if (checkbooks[index].id === input.noteId) {
    //          const trashmodel = new trashModel(
    //            {
    //              noteID: input.noteId,
    //              email: checkbooks[index].emailId,
    //              title: checkbooks[index].title,
    //              description: checkbooks[index].description
    //            })
    //          await noteModel.findByIdAndDelete(checkbooks[index]);
    //          const checkLabel = await labelModel.findOne({ noteId: input.noteId });
    //          if (checkLabel) {
    //            trashmodel.label = checkLabel.labelName
    //            await trashmodel.save();
    //            if (checkLabel.noteId.length === 1) {
    //              await labelModel.findByIdAndDelete(checkLabel.id);
    //            }
    //            await labelModel.findOneAndUpdate(
    //              {
    //                labelName: checkLabel.labelName
    //              },
    //              {
    //                $pull: {
    //                  noteId: input.noteId
    //                },
    //              }
    //            )
    //          }
    //          await trashmodel.save();
    //          return ({
    //            title: checkbooks[index].title,
    //            description: checkbooks[index].description
    //          })
    //        }
    //        index++;
    //      }
    //      return new ApolloError.UserInputError('Note with the given id was not found');
    //    }
    //    catch (error) {
    //      console.log(error);
    //      return new ApolloError.ApolloError('Internal Server Error');
    //    }
    //  },
    //  /**
    //    * @description Mutation to display books in trash
    //    * @param {*} empty
    //    * @param {*} empty 
    //    * @param {*} context
    //    */
   }
 }
 module.exports = bookResolvers;