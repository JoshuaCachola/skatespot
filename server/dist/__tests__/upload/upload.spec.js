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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_testing_1 = __importDefault(require("apollo-server-testing"));
const typeormConnection_1 = require("../../src/utils/typeormConnection");
const fs_1 = require("fs");
const path = require('path');
const apollo_server_express_1 = require("apollo-server-express");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield typeormConnection_1.typeormConnection.create();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield typeormConnection_1.typeormConnection.close();
}));
const resolvers = {
    Mutation: {},
};
const testServer = new apollo_server_express_1.ApolloServer({
    resolvers,
});
const client = apollo_server_testing_1.default.createTestClient(testServer);
it('adds file to aws and returns url for file', () => __awaiter(void 0, void 0, void 0, function* () {
    const filename = '';
    const file = fs_1.createReadStream(path.resolve(__dirname, `../utils/${filename}`));
    const mutation = `
    mutation ($picture: Upload!) {
      uploadProfilePicture(picture: $picture)
    } 
  `;
    const res = yield client.mutate({
        mutation,
        variables: {
            picture: new Promise((resolve) => resolve({
                createReadStream: () => file,
                stream: file,
                filename,
            })),
        },
    });
    if (res.errors) {
        throw res;
    }
    expect(res.data.ok).toBe(true);
    expect(res.data.url).not.toBe('');
}));
//# sourceMappingURL=upload.spec.js.map