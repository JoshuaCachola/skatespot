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
exports.ReviewResolver = void 0;
const graphql_upload_1 = require("graphql-upload");
const type_graphql_1 = require("type-graphql");
const Review_1 = require("./entity/Review");
const isAuth_1 = require("./utils/isAuth");
const SkateSpot_1 = require("./entity/SkateSpot");
const User_1 = require("./entity/User");
const s3Upload_1 = require("./utils/s3Upload");
const ratingKeys = {
    '1': 'oneStar',
    '2': 'twoStar',
    '3': 'threeStar',
    '4': 'fourStar',
    '5': 'fiveStar',
};
let ReviewResolver = class ReviewResolver {
    getSkateSpotReviews(skateSpotId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Review_1.Review.find({ where: { skateSpotId } });
            }
            catch (err) {
                console.error(err);
                return [];
            }
        });
    }
    getUserReviews(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Review_1.Review.find({ where: { userId } });
            }
            catch (err) {
                console.error(err);
                return [];
            }
        });
    }
    createReview(review, skateSpotId, userId, rating, imgFiles) {
        return __awaiter(this, void 0, void 0, function* () {
            const skateSpot = yield SkateSpot_1.SkateSpot.findOne({ where: { id: skateSpotId } });
            if (!skateSpot) {
                return false;
            }
            const updatedReviewsDistribution = JSON.parse(skateSpot.reviewsDistribution);
            const updatedReviewsCount = Math.floor(skateSpot.reviewsCount) + 1;
            updatedReviewsDistribution[ratingKeys[rating]] += 1;
            skateSpot.reviewsCount = updatedReviewsCount;
            skateSpot.reviewsDistribution = updatedReviewsDistribution;
            let imgLinks = [];
            if (imgFiles) {
                yield s3Upload_1.s3MultipleUpload(imgFiles, imgLinks);
            }
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    const imageUrls = JSON.parse(skateSpot.imageUrls);
                    skateSpot.imageUrls = JSON.stringify([...imageUrls, ...imgLinks]);
                    yield skateSpot.save();
                    yield Review_1.Review.insert({
                        review,
                        skateSpotId,
                        userId,
                        rating,
                        imageUrls: imgLinks.length ? JSON.stringify(imgLinks) : JSON.stringify([]),
                    });
                    return;
                }
                catch (err) {
                    console.error(err);
                    return;
                }
            }), (imgFiles === null || imgFiles === void 0 ? void 0 : imgFiles.length) ? 1000 * imgFiles.length : 1000);
            return yield new Promise((res) => {
                setTimeout(() => res(true), (imgFiles === null || imgFiles === void 0 ? void 0 : imgFiles.length) ? 1000 * imgFiles.length + 1000 : 2000);
            });
        });
    }
    skateSpot(review) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SkateSpot_1.SkateSpot.findOne({ where: { id: review.skateSpotId } });
        });
    }
    user(review) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.User.findOne({ where: { id: review.userId } });
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Review_1.Review]),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg('skateSpotId', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "getSkateSpotReviews", null);
__decorate([
    type_graphql_1.Query(() => [Review_1.Review]),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg('userId', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "getUserReviews", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg('review')),
    __param(1, type_graphql_1.Arg('skateSpotId', () => type_graphql_1.Int)),
    __param(2, type_graphql_1.Arg('userId', () => type_graphql_1.Int)),
    __param(3, type_graphql_1.Arg('rating', () => type_graphql_1.Int)),
    __param(4, type_graphql_1.Arg('imgFiles', () => [graphql_upload_1.GraphQLUpload], { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Number, Array]),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "createReview", null);
__decorate([
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Review_1.Review]),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "skateSpot", null);
__decorate([
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Review_1.Review]),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "user", null);
ReviewResolver = __decorate([
    type_graphql_1.Resolver(() => Review_1.Review)
], ReviewResolver);
exports.ReviewResolver = ReviewResolver;
//# sourceMappingURL=ReviewResolver.js.map