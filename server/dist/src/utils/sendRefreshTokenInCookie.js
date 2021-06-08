"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRefreshTokenInCookie = void 0;
const sendRefreshTokenInCookie = (res, token) => {
    res.cookie('jrt', token, {
        httpOnly: true,
        path: '/refresh_token',
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });
};
exports.sendRefreshTokenInCookie = sendRefreshTokenInCookie;
//# sourceMappingURL=sendRefreshTokenInCookie.js.map