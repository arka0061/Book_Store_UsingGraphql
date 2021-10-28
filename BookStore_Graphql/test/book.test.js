const EasyGraphQLTester = require('easygraphql-tester')
const fs = require('fs')
const path = require('path')

const userSchema = fs.readFileSync(
  path.join(__dirname, ".", "schema.gql"),
  "utf8"
);

describe("Query", () => {
  let tester;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });

  test("Mocking Book Query", () => {
    const query = `
    query
    {
      books {
        _id
       title
       description
      }
    }
    `;

    const fixture = {
      data: {
        books: [{
          _id:"6176947ec34dc1ea8188f6a5",
         title:"Titanic",
         description:"Love Story",
    
        }]
      }
    }
    tester.setFixture(fixture);
    const result = tester.mock({ query });
    expect(result.data.books[0]._id).toBe("6176947ec34dc1ea8188f6a5");
    expect(result.data.books[0].title).toBe("Titanic");
    expect(result.data.books[0].description).toBe("Love Story");
  });
});
describe("Mutations", () => {
  let tester;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });


  describe("Mutations", () => {

    //createbook Mutation Test Cases
    test("Given_createBook_MutationShouldPass_IfTheFirstArgIsFalse_AndTheInputIsEmpty", () => {
      const mutation = `
        mutation createBook($input: ) {
          createBook(input: $input) {
           title
           description
          }
        }
      `;
      // First arg: false because the query is valid but the input value is empty
      // Second arg: query to test
      // Third argument is the input of the mutation
      tester.test(false, mutation, {});
    });
    test("Given_createBook_MutationShouldPass_IfTheFirstArg_IsFalse_And_TheInputHasInvalidField", () => {
      const mutation = `
      mutation createBook($input:InvalidInput ) {
        createBook(input: $input) {
         title
         description
        }
      }
      `;
      // First arg: false because the mutation is valid but the input value has invalid field
      // Second arg: mutation to test
      // Third argument is the input of the mutation
      tester.test(false, mutation, [
        {
         title:"Titanic",
         description:"Love Story"
        }
      ]);
    });
    test("Given_createBook_MutationShouldPass_IfTheFirstArgIsTrue_And_TheInputIsValid", () => {
      const mutation = `
      mutation createBook($input:CreateBookInput ) {
        createBook(input: $input) {
         title
         description
        }
      }
      `;
      // First arg: true because the mutation is valid
      // Second arg: mutation to test
      // Third argument is the input of the mutation
      tester.test(true, mutation, {
       title:"Titanic",
       description:"Love Story"
      });
    });


    //editBook Mutation Testing
    test("Given_editBook_MutationShouldPass_IfTheFirstArgIsFalse_AndTheInputIsEmpty", () => {
      const mutation = `
      mutation editBook($input: ) {
        editBook(input: $input) {
         title
         description
        }
      }
      `;
      // First arg: false because the query is valid but the input value is empty
      // Second arg: query to test
      // Third argument is the input of the mutation
      tester.test(false, mutation, {});
    });
    test("Given_editBook_MutationShouldPass_IfTheFirstArg_IsFalse_And_TheInputHasInvalidField", () => {
      const mutation = `
      mutation editBook($input:InvalidInput ) {
        editBook(input: ) {
         title
         description
        }
      }
      `;
      // First arg: false because the mutation is valid but the input value has invalid field
      // Second arg: mutation to test
      // Third argument is the input of the mutation
      tester.test(false, mutation, [
        {
          title:"Titanic",
       description:"Love Story"
        }
      ]);
    });
    test("Given_editBook_MutationShouldPass_IfTheFirstArgIsTrue_And_TheInputIsValid", () => {
      const mutation = `
      mutation editBook($input: EditBookInput) {
        editBook(input: $input) {
         title
         description
        }
      }
      `;
      // First arg: true because the mutation is valid
      // Second arg: mutation to test
      // Third argument is the input of the mutation
      tester.test(true, mutation, {
        title:"Titanic",
        description:"Love Story"
      });
    }); 
  })
})
