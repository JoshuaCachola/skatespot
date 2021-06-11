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
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeormConnection = void 0;
const typeorm_1 = require("typeorm");
exports.typeormConnection = {
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            const connectionOptions = yield typeorm_1.getConnectionOptions(process.env.NODE_ENV);
            console.log(process.env.NODE_ENV);
            console.log(process.env.DATABASE_HOST);
            console.log(process.env.DATABASE_PASSWORD);
            console.log(process.env.DATABASE_USERNAME);
            if (process.env.NODE_ENV === 'production') {
                connectionOptions['host'] = process.env.DATABASE_HOST;
                connectionOptions['password'] = process.env.DATABASE_PASSWORD;
                connectionOptions['username'] = process.env.DATABASE_USERNAME;
            }
            return typeorm_1.createConnection(Object.assign(Object.assign({}, connectionOptions), { name: 'default' }));
        });
    },
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield typeorm_1.getConnection().close();
        });
    },
};
//# sourceMappingURL=typeormConnection.js.map