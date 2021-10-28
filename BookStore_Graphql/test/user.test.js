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

  test("Mocking User Query", () => {
    const query = `
    query
    {
      users {
        _id
        firstName
        lastName
        email
        password
      }
    }
    `;

    const fixture = {
      data: {
        users: [{
          _id: "61488ff550242b75f88e41f8",
          firstName: "arka",
          lastName: "Parui",
          email: "ark@gmail.com",
          password: "dawsddsd"
        }]
      }
    }
    tester.setFixture(fixture);
    const result = tester.mock({ query });
    expect(result.data.users[0]._id).toBe("61488ff550242b75f88e41f8",);
    expect(result.data.users[0].firstName).toBe("arka");
    expect(result.data.users[0].lastName).toBe("Parui");
    expect(result.data.users[0].email).toBe("ark@gmail.com");
    expect(result.data.users[0].password).toBe("dawsddsd");

  });
});
describe("Mutations", () => {
  let tester;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });


  describe("Mutations", () => {

    //createUser Mutation Test Cases
    test("Given_createUser_MutationShouldPass_IfTheFirstArgIsFalse_AndTheInputIsEmpty", () => {
      const mutation = `
        mutation createUser($input: UserInput!) {
          createUser(input: $input) {
            firstName
            lastName
            email
            password
          }
        }
      `;
      // First arg: false because the query is valid but the input value is empty
      // Second arg: query to test
      // Third argument is the input of the mutation
      tester.test(false, mutation, {});
    });
    test("Given_createUser_MutationShouldPass_IfTheFirstArg_IsFalse_And_TheInputHasInvalidField", () => {
      const mutation = `
      mutation createUser($input: UserInput!) {
        createUser(input: $input) {
          firstName
          lastName
          email
          password
        }
        }
      `;
      // First arg: false because the mutation is valid but the input value has invalid field
      // Second arg: mutation to test
      // Third argument is the input of the mutation
      tester.test(false, mutation, [
        {
          firstName: "Arka",
          lastName: "parui",
          email: "arka.spectacular@gmail.com",
        }
      ]);
    });
    test("Given_createUser_MutationShouldPass_IfTheFirstArgIsTrue_And_TheInputIsValid", () => {
      const mutation = `
        mutation createUser($input: UserInput) {
          createUser(input: $input) {
          firstName
          }
        }
      `;
      // First arg: true because the mutation is valid
      // Second arg: mutation to test
      // Third argument is the input of the mutation
      tester.test(true, mutation, {
        firstName: "Arka",
        lastName: "Parui",
        email: "arka.spectacular@gmail.com",
        password: "lkjoi@!#"
      });
    });


    //loginUser Mutation Testing
    test("Given_loginUser_MutationShouldPass_IfTheFirstArgIsFalse_AndTheInputIsEmpty", () => {
      const mutation = `
        mutation loginUser($input:LoginInput) {
          loginUser(input: $input) {
            _id
            token
            firstName
            lastName
            email
            getNotes
          }
        }
      `;
      // First arg: false because the query is valid but the input value is empty
      // Second arg: query to test
      // Third argument is the input of the mutation
      tester.test(false, mutation, {});
    });
    test("Given_loginUser_MutationShouldPass_IfTheFirstArg_IsFalse_And_TheInputHasInvalidField", () => {
      const mutation = `
      mutation loginUser($input:InvalidInput) {
        loginUser(input: $input) {
          _id
          token
          firstName
          lastName
          email
          getNotes
        }
      }
      `;
      // First arg: false because the mutation is valid but the input value has invalid field
      // Second arg: mutation to test
      // Third argument is the input of the mutation
      tester.test(false, mutation, [
        {
          firstName: "Arka",
          lastName: "parui",
          email: "arka.spectacular@gmail.com",
        }
      ]);
    });
    test("Given_loginUser_MutationShouldPass_IfTheFirstArgIsTrue_And_TheInputIsValid", () => {
      const mutation = `
      mutation loginUser($input:LoginInput) {
        loginUser(input: $input) {
          _id
          token
          firstName
          lastName
          email
        }
      }
      `;
      // First arg: true because the mutation is valid
      // Second arg: mutation to test
      // Third argument is the input of the mutation
      tester.test(true, mutation, [{
        _id: "6163d84a2137afa6e34d6c86",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjNkODE4MjEzN2FmYTZlMzRkNmM4MyIsImVtYWlsIjoiYXJrYS5zcGVjdGFjdWxhckBnbWFpbC5jb20iLCJpYXQiOjE2MzM5MzQ0Mjd9.rfwA-VzUFhfYfrUjk_TcolrzrU3mJOkODwODrstdKYc",
        firstName: "Arka",
        lastName: "parui",
        email: "arka.spectacular@gmail.com",
      }]);
    });

    //admin Mutation Testing
    test("Given_admin_MutationShouldPass_IfTheFirstArgIsFalse_AndTheInputIsEmpty", () => {
        const mutation = `
          mutation admin($input:String) {
            admin(input: ) {
            }
          }
        `;
        // First arg: false because the query is valid but the input value is empty
        // Second arg: query to test
        // Third argument is the input of the mutation
        tester.test(false, mutation, {});
      });
      test("Given_admin_MutationShouldPass_IfTheFirstArg_IsFalse_And_TheInputHasInvalidField", () => {
        const mutation = `
        mutation admin($input:String) {
            admin(input: ) {
            }
          }
        `;
        // First arg: false because the mutation is valid but the input value has invalid field
        // Second arg: mutation to test
        // Third argument is the input of the mutation
        tester.test(false, mutation, [
          {
            String
          }
        ]);
      });
      test("Given_admin_MutationShouldPass_IfTheFirstArgIsTrue_And_TheInputIsValid", () => {
        const mutation = `
        mutation admin($input:String!) {
            admin(input:emailId ) {
            }
          }
        `;
        // First arg: true because the mutation is valid
        // Second arg: mutation to test
        // Third argument is the input of the mutation
        tester.test(false, mutation, { 
            admin:`User with emailId : arka.spec@gmail.com role changed to admin sucessfully`
          });
      });  
  })
})
