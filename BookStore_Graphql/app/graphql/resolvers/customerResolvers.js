/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> node server.js
 *                2. If nodemon installed    cmd> npm start
 * 
 * Purpose      : Controls the operations  of customer role
 * 
 * @package     : apollo-server-errors
 * @file        : app/graphql/resolvers/noteResolvers.js
 * @overview    : controls addtocart,buy and view books tasks
 * @module      : this is necessary to allow customers to peform operations on books
 * @author      : Arka Parui
 *********************************************************************/

const ApolloError = require('apollo-server-errors');
const bookModel = require('../../models/book.model');
const addToCartModel = require('../../models/addToCart.model')

const bookResolvers = {
    Mutation: {
        /**
          * @description Mutation to create a book and store it in bookModel Schema of
          * Database
          * @param {*} empty
          * @param {*} input 
          * @param {*} context
          */
        addBookToCart: async (_, { bookId }, context) => {
            try {
                if (!context.id) {
                    return new ApolloError.AuthenticationError('UnAuthenticated');
                }
                if (context.role === "Admin") {
                    return new ApolloError.AuthenticationError('Only Customer role can perform this operation');
                }
                const checkStateOfBook=await bookModel.findOne({_id:bookId})
                if(checkStateOfBook.state=='Sold Out')
                {
                    return new ApolloError.UserInputError('The book is already sold out')
                }
                const checkaddToCart = await addToCartModel.findOne({ emailId: context.email });
                if (checkaddToCart) {
                    for (index = 0; index < checkaddToCart.bookIds.length; index++) {
                        if (JSON.stringify(checkaddToCart.bookIds[index]) === JSON.stringify(bookId)) {
                            return new ApolloError.UserInputError('This book is already added');
                        }
                    }
                    checkaddToCart.bookIds.push(bookId)
                    await checkaddToCart.save();
                    return "New Book added into existing user Sucessfully"
                }
                const addToCartmodel = new addToCartModel({
                    emailId: context.email,
                    bookIds: bookId
                });
                //labelmodel.bookIds.push(input.noteID)
                await addToCartmodel.save();
                return "New Bokk Added Created Sucessfully"
            }
            catch (error) {
                console.log(error);
                return new ApolloError.ApolloError('Internal Server Error');
            }
        },

        /**
          * @description Mutation to remove a book from cart
          * @param {*} empty
          * @param {*} input 
          * @param {*} context
          */
        removeFromCart: async (_, { bookId }, context) => {
            try {
                if (!context.id) {
                    return new ApolloError.AuthenticationError('UnAuthenticated');
                }
                if (context.role === "Admin") {
                    return new ApolloError.AuthenticationError('Only Customer role can perform this operation');
                }
                const checkaddToCart = await addToCartModel.findOne({ emailId: context.email });
                if (checkaddToCart) {
                    for (index = 0; index < checkaddToCart.bookIds.length; index++) {
                        if (JSON.stringify(checkaddToCart.bookIds[index]) === JSON.stringify(bookId)) {
                            let itemToBeRemoved = bookId;
                            await addToCartModel.findOneAndUpdate(
                                {
                                    emailId: context.email
                                },
                                {
                                    $pull: {
                                        bookIds: itemToBeRemoved
                                    },
                                })
                            return `Item with id: ${bookId} removed sucessfully from cart`
                        }
                    }
                    return `Item with id: ${bookId} not found`
                }
                return `Item with id: ${bookId} not found`
            }
            catch (error) {
                console.log(error);
                return new ApolloError.ApolloError('Internal Server Error');
            }
        },
        /**
          * @description Mutation to showCartItems
          * @param {*} empty
          * @param {*} empty
          * @param {*} context
          */
        showCartItems: async (_, __, context) => {
            try {
                if (!context.id) {
                    return new ApolloError.AuthenticationError('UnAuthenticated');
                }
                if (context.role === "Admin") {
                    return new ApolloError.AuthenticationError('Only Customer role can perform this operation');
                }
                const checkaddToCart = await addToCartModel.findOne({ emailId: context.email });
                if (checkaddToCart) {
                    const getBooks = await addToCartModel.
                        findOne({ emailId: checkaddToCart.emailId }).
                        populate('bookIds');
                    return getBooks.bookIds
                }
                return ApolloError.UserInputError("No books added in cart")
            }
            catch (error) {
                console.log(error);
                return new ApolloError.ApolloError('Internal Server Error');
            }
        },    
        buy: async (_, { bookId }, context) => {
            try {
                if (!context.id) {
                    return new ApolloError.AuthenticationError('UnAuthenticated');
                }
                if (context.role === "Admin") {
                    return new ApolloError.AuthenticationError('Only Customer role can perform this operation');
                }
                const checkaddToCart = await addToCartModel.findOne({ emailId: context.email });
                if (checkaddToCart) {
                    for (index = 0; index < checkaddToCart.bookIds.length; index++) {
                        if (JSON.stringify(checkaddToCart.bookIds[index]) === JSON.stringify(bookId)) {
                            let itemToBeRemoved = bookId;
                            const bookState=await bookModel.findOne({_id:bookId});
                            bookState.state="Sold Out"
                            await bookState.save();
                            await addToCartModel.findOneAndUpdate(
                                {
                                    emailId: context.email
                                },
                                {
                                    $pull: {
                                        bookIds: itemToBeRemoved
                                    },
                                })
                            return `Item with id: ${bookId} Purchased sucessfully from cart`
                        }
                    }
                    return `Item with id: ${bookId} not found`
                }
                return `Item with id: ${bookId} not found`
            }
            catch (error) {
                console.log(error);
                return new ApolloError.ApolloError('Internal Server Error');
            }
        }
    }
}
module.exports = bookResolvers;