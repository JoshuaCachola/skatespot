"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_request_1 = require("graphql-request");
const User_1 = require("../../src/entity/User");
const typeormConnection_1 = require("../../src/utils/typeormConnection");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield typeormConnection_1.typeormConnection.create();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield typeormConnection_1.typeormConnection.close();
}));
const client = new graphql_request_1.GraphQLClient("http://localhost:4008/graphql");
it('registers a user', () => __awaiter(void 0, void 0, void 0, function* () {
    const variables = {
        email: "test@user.com",
        password: "testpassword",
        firstName: "test",
        lastName: "user",
        username: "test_user"
    };
    const mutation = graphql_request_1.gql `
    mutation RegisterUser($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!){
      register(firstName: $firstName, lastName: $lastName, username: $username, email: $email, password: $password)
    }
  `;
    const data = yield client.request(mutation, variables);
    expect(data).toEqual({ "register": true });
    const users = yield User_1.User.find({ where: { email: "test@user.com" } });
    expect(users).toHaveLength(1);
    const user = users[0];
    expect(user.email).toEqual(variables.email);
    expect(user.password).not.toEqual(variables.password);
}));
it('logs in a user and returns an access token', () => __awaiter(void 0, void 0, void 0, function* () {
    const variables = {
        email: "test@user.com",
        password: "testpassword",
    };
    const mutation = graphql_request_1.gql `
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        accessToken
      }
    }
  `;
    const { login } = yield client.request(mutation, variables);
    expect(login.accessToken).not.toEqual('');
}));
it('does not log in user with invalid email', () => __awaiter(void 0, void 0, void 0, function* () {
    const variables = {
        email: "test@other-user.com",
        password: "testpassword"
    };
    const mutation = graphql_request_1.gql `
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        accessToken
      }
    }
  `;
    const { login } = yield client.request(mutation, variables);
    expect(login.accessToken).toEqual('');
}));
it('does not log in user with invalid password', () => __awaiter(void 0, void 0, void 0, function* () {
    const variables = {
        email: "test@user.com",
        password: "othertestpassword"
    };
    const mutation = graphql_request_1.gql `
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        accessToken
      }
    }
  `;
    const { login } = yield client.request(mutation, variables);
    expect(login.accessToken).toEqual('');
}));
//# sourceMappingURL=user.spec.js.map