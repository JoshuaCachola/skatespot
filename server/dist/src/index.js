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
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const UserResolver_1 = require("./UserResolver");
const SkateSpotResolver_1 = require("./SkateSpotResolver");
const typeormConnection_1 = require("./utils/typeormConnection");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jsonwebtoken_1 = require("jsonwebtoken");
const createToken_1 = require("./utils/createToken");
const User_1 = require("./entity/User");
const sendRefreshTokenInCookie_1 = require("./utils/sendRefreshTokenInCookie");
const cors_1 = __importDefault(require("cors"));
const UploadResolver_1 = require("./UploadResolver");
const graphql_upload_1 = require("graphql-upload");
const ReviewResolver_1 = require("./ReviewResolver");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    app.use(cookie_parser_1.default());
    app.use(cors_1.default({
        origin: `${process.env.NODE_ENV} === 'production' ? 'http://skatespot-alb-1172579719.us-west-2.elb.amazonaws.com' : 'http://localhost:3007'`,
        credentials: true,
    }));
    app.use(graphql_upload_1.graphqlUploadExpress());
    app.get('/ping', (_, res) => {
        res.status(200).send('pong');
    });
    app.post('/refresh_token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.cookies.jrt;
        if (!token) {
            return res.json({ accessToken: '' });
        }
        let payload;
        try {
            payload = jsonwebtoken_1.verify(token, process.env.REFRESH_TOKEN_SECRET);
        }
        catch (err) {
            console.error(err);
            return res.json({ accessToken: '' });
        }
        let user;
        if (payload.userId) {
            user = yield User_1.User.findOne({ id: payload.userId });
        }
        if (!user) {
            return res.json({ accessToken: '' });
        }
        sendRefreshTokenInCookie_1.sendRefreshTokenInCookie(res, createToken_1.createToken.refresh(user));
        return res.json({ accessToken: createToken_1.createToken.access(user) });
    }));
    yield typeormConnection_1.typeormConnection.create();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [UserResolver_1.UserResolver, SkateSpotResolver_1.SkateSpotResolver, UploadResolver_1.UploadResolver, ReviewResolver_1.ReviewResolver],
        }),
        context: ({ req, res }) => ({ req, res }),
        uploads: false,
        playground: true,
        introspection: true,
    });
    apolloServer.applyMiddleware({ app, cors: false });
    const port = process.env.PORT || 6000;
    app.listen(port, () => {
        console.log('express server started...');
    });
}))();
//# sourceMappingURL=index.js.map