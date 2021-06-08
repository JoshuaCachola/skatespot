"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
exports.createToken = {
    access(user) {
        return jsonwebtoken_1.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15m',
        });
    },
    refresh(user) {
        return jsonwebtoken_1.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '30d',
        });
    },
};
//# sourceMappingURL=createToken.js.map