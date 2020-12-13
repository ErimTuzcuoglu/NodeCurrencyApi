"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BloombergParser_1 = __importDefault(require("./parser/BloombergParser"));
function getAllCurrencies() {
    var bloombergParser = new BloombergParser_1.default();
    return bloombergParser.extractData();
}
exports.default = {
    getAllCurrencies: getAllCurrencies,
};
