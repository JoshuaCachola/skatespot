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
exports.s3MultipleUpload = void 0;
const s3 = require('../config/s3');
const uuid_1 = require("uuid");
const s3MultipleUpload = (imgFiles, imgLinks) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Promise.all(imgFiles).then((files) => {
        files.forEach((file) => __awaiter(void 0, void 0, void 0, function* () {
            const { Location } = yield s3
                .upload({
                Body: file.createReadStream(),
                Key: `${uuid_1.v4()}`,
                ContentType: file.mimetype,
            })
                .promise();
            return new Promise((res) => __awaiter(void 0, void 0, void 0, function* () {
                if (Location) {
                    imgLinks.push(Location);
                    setTimeout(res, 1000);
                }
            }));
        }));
    });
});
exports.s3MultipleUpload = s3MultipleUpload;
//# sourceMappingURL=s3Upload.js.map