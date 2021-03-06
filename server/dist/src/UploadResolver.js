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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadResolver = void 0;
const type_graphql_1 = require("type-graphql");
const graphql_upload_1 = require("graphql-upload");
const fs_1 = require("fs");
const User_1 = require("./entity/User");
const jsonwebtoken_1 = require("jsonwebtoken");
const typeorm_1 = require("typeorm");
const s3 = require('./config/s3');
let UploadResolver = class UploadResolver {
    singleUpload({ createReadStream, filename }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                createReadStream()
                    .pipe(fs_1.createWriteStream(__dirname + `/images/${filename}`))
                    .on('finish', () => resolve(true))
                    .on('error', () => reject(false));
            }));
        });
    }
    uploadProfilePicture({ createReadStream, filename, mimetype, }, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorization = req.headers['authorization'];
            if (!authorization) {
                return false;
            }
            const accessToken = authorization.split(' ')[1];
            const payload = jsonwebtoken_1.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            if (!payload.userId) {
                return false;
            }
            const { Location } = yield s3.upload({
                Body: createReadStream(),
                Key: `${filename}`,
                ContentType: mimetype
            }).promise();
            return new Promise((resolve, reject) => {
                if (Location) {
                    resolve(true);
                }
                else {
                    reject(false);
                }
            }).then(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield typeorm_1.getConnection()
                        .createQueryBuilder()
                        .update(User_1.User)
                        .set({ profilePicture: Location })
                        .where('id = :id', { id: payload.userId })
                        .execute();
                    return true;
                }
                catch (err) {
                    console.error(err);
                    return false;
                }
            }));
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('file', () => graphql_upload_1.GraphQLUpload)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadResolver.prototype, "singleUpload", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('picture', () => graphql_upload_1.GraphQLUpload)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UploadResolver.prototype, "uploadProfilePicture", null);
UploadResolver = __decorate([
    type_graphql_1.Resolver()
], UploadResolver);
exports.UploadResolver = UploadResolver;
;
//# sourceMappingURL=UploadResolver.js.map