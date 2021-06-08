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
exports.getGeocoding = void 0;
const fetch = require('node-fetch');
const getGeocoding = (street, city, state) => __awaiter(void 0, void 0, void 0, function* () {
    street = street.split(' ').join('+');
    city = city.split(' ').join('+');
    state = state.split(' ').join('+');
    const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${street},${city},${state}&key=${process.env.GOOGLE_GEOCODING_API_KEY}`;
    let res = yield fetch(URL);
    res = yield res.json();
    return res.results[0].geometry.location;
});
exports.getGeocoding = getGeocoding;
//# sourceMappingURL=geocoding.js.map