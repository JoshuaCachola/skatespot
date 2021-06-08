"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const argon2_1 = __importDefault(require("argon2"));
const User_1 = require("./entity/User");
const createToken_1 = require("./utils/createToken");
const isAuth_1 = require("./utils/isAuth");
const sendRefreshTokenInCookie_1 = require("./utils/sendRefreshTokenInCookie");
const jsonwebtoken_1 = require("jsonwebtoken");
const graphql_upload_1 = require("graphql-upload");
const s3 = require('./config/s3');
let LoginResponse = class LoginResponse {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], LoginResponse.prototype, "accessToken", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", User_1.User)
], LoginResponse.prototype, "user", void 0);
LoginResponse = __decorate([
    type_graphql_1.ObjectType()
], LoginResponse);
let UserResolver = class UserResolver {
    register(email, password, firstName, lastName, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { email } });
            if (user) {
                return false;
            }
            try {
                const hashedPassword = yield argon2_1.default.hash(password);
                yield User_1.User.insert({
                    email,
                    password: hashedPassword,
                    firstName,
                    lastName,
                    username,
                });
            }
            catch (err) {
                console.error(err);
                return false;
            }
            return true;
        });
    }
    login(email, password, { res }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { email } });
            if (!user) {
                return {
                    accessToken: '',
                };
            }
            if (yield argon2_1.default.verify(user.password, password)) {
                const accessToken = createToken_1.createToken.access(user);
                sendRefreshTokenInCookie_1.sendRefreshTokenInCookie(res, createToken_1.createToken.refresh(user));
                return {
                    accessToken,
                    user,
                };
            }
            else {
                return {
                    accessToken: '',
                };
            }
        });
    }
    logout({ res }) {
        return __awaiter(this, void 0, void 0, function* () {
            sendRefreshTokenInCookie_1.sendRefreshTokenInCookie(res, '');
            return true;
        });
    }
    updateProfilePicture(profilePicture, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorization = req.headers['authorization'];
            if (!authorization) {
                return null;
            }
            const accessToken = authorization.split(' ')[1];
            const payload = jsonwebtoken_1.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const user = yield User_1.User.findOne(payload.userId);
            if (!user) {
                return null;
            }
            const picture = yield profilePicture[0];
            const { Location } = yield s3
                .upload({
                Body: picture.createReadStream(),
                Key: `${user.username}`,
                ContentType: picture.mimetype,
            })
                .promise();
            return new Promise((resolve, reject) => {
                if (Location) {
                    user.profilePicture = Location;
                    resolve(true);
                }
                else {
                    reject(false);
                }
            }).then(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield user.save();
                    return user;
                }
                catch (err) {
                    console.error(err);
                    return null;
                }
            }));
        });
    }
    hello() {
        return 'hi';
    }
    users() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.User.find();
        });
    }
    getUser({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorization = req.headers['authorization'];
            if (!authorization) {
                return null;
            }
            const accessToken = authorization.split(' ')[1];
            const payload = jsonwebtoken_1.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            return yield User_1.User.findOne(payload.userId);
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('email')),
    __param(1, type_graphql_1.Arg('password')),
    __param(2, type_graphql_1.Arg('firstName')),
    __param(3, type_graphql_1.Arg('lastName')),
    __param(4, type_graphql_1.Arg('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    type_graphql_1.Mutation(() => LoginResponse),
    __param(0, type_graphql_1.Arg('email')),
    __param(1, type_graphql_1.Arg('password')),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "logout", null);
__decorate([
    type_graphql_1.Mutation(() => User_1.User),
    __param(0, type_graphql_1.Arg('profilePicture', () => [graphql_upload_1.GraphQLUpload])),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateProfilePicture", null);
__decorate([
    type_graphql_1.Query(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], UserResolver.prototype, "hello", null);
__decorate([
    type_graphql_1.Query(() => [User_1.User]),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    type_graphql_1.Query(() => User_1.User),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUser", null);
UserResolver = __decorate([
    type_graphql_1.Resolver(() => User_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=UserResolver.js.map