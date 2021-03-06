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
exports.Review = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const SkateSpot_1 = require("./SkateSpot");
const type_graphql_1 = require("type-graphql");
let Review = class Review extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Review.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], Review.prototype, "review", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User),
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.reviews),
    typeorm_1.JoinColumn({ name: 'userId', referencedColumnName: 'id' }),
    __metadata("design:type", User_1.User)
], Review.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Review.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(() => SkateSpot_1.SkateSpot),
    typeorm_1.ManyToOne(() => SkateSpot_1.SkateSpot, (skateSpot) => skateSpot.reviews),
    typeorm_1.JoinColumn({ name: 'skateSpotId', referencedColumnName: 'id' }),
    __metadata("design:type", SkateSpot_1.SkateSpot)
], Review.prototype, "skateSpot", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Review.prototype, "skateSpotId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('text', { default: [] }),
    __metadata("design:type", String)
], Review.prototype, "imageUrls", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Review.prototype, "rating", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Review.prototype, "createdAt", void 0);
Review = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity('reviews')
], Review);
exports.Review = Review;
//# sourceMappingURL=Review.js.map