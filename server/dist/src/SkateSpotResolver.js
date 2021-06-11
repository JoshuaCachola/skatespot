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
exports.SkateSpotResolver = void 0;
const type_graphql_1 = require("type-graphql");
const SkateSpot_1 = require("./entity/SkateSpot");
const isAuth_1 = require("./utils/isAuth");
const graphql_upload_1 = require("graphql-upload");
const geocoding_1 = require("./utils/geocoding");
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const s3Upload_1 = require("./utils/s3Upload");
const s3 = require('./config/s3');
let SkateSpotResolver = class SkateSpotResolver {
    createSkateSpot(name, street, city, state, categoryName, skatespotObstacles, imgFiles) {
        return __awaiter(this, void 0, void 0, function* () {
            const skateSpot = yield SkateSpot_1.SkateSpot.findOne({ where: { name } });
            if (skateSpot) {
                return false;
            }
            const location = yield geocoding_1.getGeocoding(street, city, state);
            let imgLinks = [];
            if (imgFiles === null || imgFiles === void 0 ? void 0 : imgFiles.length) {
                Promise.all(imgFiles).then((files) => {
                    files.forEach((file) => __awaiter(this, void 0, void 0, function* () {
                        const { Location } = yield s3
                            .upload({
                            Body: file.createReadStream(),
                            Key: `${uuid_1.v4()}`,
                            ContentType: file.mimetype,
                        })
                            .promise();
                        return new Promise((resolve, reject) => {
                            if (Location) {
                                resolve(Location);
                            }
                            else {
                                reject(undefined);
                            }
                        })
                            .then((url) => {
                            url && imgLinks.push(url);
                        })
                            .then(() => __awaiter(this, void 0, void 0, function* () {
                            try {
                                yield SkateSpot_1.SkateSpot.insert({
                                    name,
                                    city,
                                    state,
                                    street,
                                    categoryName,
                                    location,
                                    skatespotObstacles: skatespotObstacles ? JSON.stringify(skatespotObstacles) : JSON.stringify([]),
                                    imageUrls: imgLinks ? JSON.stringify(imgLinks.filter((img) => img !== undefined)) : undefined,
                                });
                                return true;
                            }
                            catch (err) {
                                console.error(err);
                                return false;
                            }
                        }));
                    }));
                });
            }
            else {
                try {
                    yield SkateSpot_1.SkateSpot.insert({
                        name,
                        city,
                        state,
                        street,
                        categoryName,
                        location,
                        skatespotObstacles: skatespotObstacles ? JSON.stringify(skatespotObstacles) : JSON.stringify([]),
                    });
                    return true;
                }
                catch (err) {
                    console.error(err);
                    return false;
                }
            }
            return true;
        });
    }
    getSkateSpots(cursor, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                order: { id: 'ASC' },
            };
            if (limit) {
                options.take = limit;
            }
            if (cursor) {
                options.where = { id: typeorm_1.MoreThan(cursor) };
            }
            let skateSpot = [];
            try {
                skateSpot = yield SkateSpot_1.SkateSpot.find(options);
            }
            catch (err) {
                console.error(err);
            }
            return skateSpot;
        });
    }
    getSkateSpot(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield SkateSpot_1.SkateSpot.findOne({ where: { name } });
            }
            catch (err) {
                console.error(err);
                return null;
            }
        });
    }
    search(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield typeorm_1.getConnection()
                    .createQueryBuilder(SkateSpot_1.SkateSpot, 's')
                    .where('document_with_weights @@ plainto_tsquery(:query)', {
                    query,
                })
                    .orderBy('ts_rank(document_with_weights, plainto_tsquery(:query))', 'DESC')
                    .getMany();
            }
            catch (err) {
                console.error(err);
                return [];
            }
        });
    }
    uploadPhotos(skateSpotId, imgFiles) {
        return __awaiter(this, void 0, void 0, function* () {
            const skateSpot = yield SkateSpot_1.SkateSpot.findOne({ where: { id: skateSpotId } });
            if (!skateSpot) {
                return null;
            }
            let imgLinks = [];
            yield s3Upload_1.s3MultipleUpload(imgFiles, imgLinks);
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    const imageUrls = JSON.parse(skateSpot.imageUrls);
                    skateSpot.imageUrls = JSON.stringify([...imageUrls, ...imgLinks]);
                    yield skateSpot.save();
                    return;
                }
                catch (err) {
                    console.error(err);
                    return;
                }
            }), 1000);
            return yield new Promise((res) => {
                setTimeout(() => res(skateSpot), 2000);
            });
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg('name')),
    __param(1, type_graphql_1.Arg('street')),
    __param(2, type_graphql_1.Arg('city')),
    __param(3, type_graphql_1.Arg('state')),
    __param(4, type_graphql_1.Arg('categoryName')),
    __param(5, type_graphql_1.Arg('skatespotObstacles', () => [String], { nullable: true })),
    __param(6, type_graphql_1.Arg('imgFiles', () => [graphql_upload_1.GraphQLUpload], { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, Array, Array]),
    __metadata("design:returntype", Promise)
], SkateSpotResolver.prototype, "createSkateSpot", null);
__decorate([
    type_graphql_1.Query(() => [SkateSpot_1.SkateSpot]),
    __param(0, type_graphql_1.Arg('cursor', () => type_graphql_1.Int, { nullable: true })),
    __param(1, type_graphql_1.Arg('limit', () => type_graphql_1.Int, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], SkateSpotResolver.prototype, "getSkateSpots", null);
__decorate([
    type_graphql_1.Query(() => SkateSpot_1.SkateSpot),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SkateSpotResolver.prototype, "getSkateSpot", null);
__decorate([
    type_graphql_1.Query(() => [SkateSpot_1.SkateSpot]),
    __param(0, type_graphql_1.Arg('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SkateSpotResolver.prototype, "search", null);
__decorate([
    type_graphql_1.Mutation(() => SkateSpot_1.SkateSpot),
    __param(0, type_graphql_1.Arg('skateSpotId', () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg('imgFiles', () => [graphql_upload_1.GraphQLUpload])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", Promise)
], SkateSpotResolver.prototype, "uploadPhotos", null);
SkateSpotResolver = __decorate([
    type_graphql_1.Resolver(() => SkateSpot_1.SkateSpot)
], SkateSpotResolver);
exports.SkateSpotResolver = SkateSpotResolver;
//# sourceMappingURL=SkateSpotResolver.js.map