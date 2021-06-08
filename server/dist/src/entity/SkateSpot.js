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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkateSpot = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Review_1 = require("./Review");
let SkateSpot = class SkateSpot extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], SkateSpot.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], SkateSpot.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], SkateSpot.prototype, "categoryName", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], SkateSpot.prototype, "city", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], SkateSpot.prototype, "state", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], SkateSpot.prototype, "street", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('text', { default: '' }),
    __metadata("design:type", String)
], SkateSpot.prototype, "postalCode", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('text', { default: 'US' }),
    __metadata("design:type", String)
], SkateSpot.prototype, "countryCode", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], SkateSpot.prototype, "phone", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('text', { nullable: true, default: '' }),
    __metadata("design:type", String)
], SkateSpot.prototype, "website", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ type: 'boolean', nullable: true, default: false }),
    __metadata("design:type", Boolean)
], SkateSpot.prototype, "temporarilyClosed", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ type: 'boolean', nullable: true, default: false }),
    __metadata("design:type", Boolean)
], SkateSpot.prototype, "permanentlyClosed", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('text', { default: [] }),
    __metadata("design:type", String)
], SkateSpot.prototype, "imageUrls", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], SkateSpot.prototype, "location", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column('text', { default: 0 }),
    __metadata("design:type", Number)
], SkateSpot.prototype, "reviewsCount", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('text', { default: [], nullable: true }),
    __metadata("design:type", String)
], SkateSpot.prototype, "skatespotObstacles", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('text', { default: { oneStar: 0, twoStar: 0, threeStar: 0, fourStar: 0, fiveStar: 0 } }),
    __metadata("design:type", String)
], SkateSpot.prototype, "reviewsDistribution", void 0);
__decorate([
    typeorm_1.OneToMany(() => Review_1.Review, (review) => review.skateSpot),
    __metadata("design:type", Array)
], SkateSpot.prototype, "reviews", void 0);
__decorate([
    typeorm_1.Column('tsvector', { select: false, nullable: true }),
    __metadata("design:type", Object)
], SkateSpot.prototype, "document_with_weights", void 0);
SkateSpot = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity('skatespots')
], SkateSpot);
exports.SkateSpot = SkateSpot;
//# sourceMappingURL=SkateSpot.js.map