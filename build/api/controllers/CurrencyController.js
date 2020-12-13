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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_codes_1 = require("http-status-codes");
var routing_controllers_1 = require("routing-controllers");
var CurrencyService_1 = __importDefault(require("../../service/CurrencyService"));
var CurrencyController = /** @class */ (function () {
    function CurrencyController(currencyService) {
        this.currencyService = currencyService;
    }
    CurrencyController.prototype.getAllCurrencies = function (res) {
        var _a;
        try {
            return (_a = this.currencyService.getAllCurrencies()) === null || _a === void 0 ? void 0 : _a.then(function (parsedData) {
                return res.status(http_status_codes_1.StatusCodes.OK).send(parsedData);
            });
        }
        catch (error) { }
    };
    var _a;
    __decorate([
        routing_controllers_1.Get("getAllCurrencies"),
        __param(0, routing_controllers_1.Res()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], CurrencyController.prototype, "getAllCurrencies", null);
    CurrencyController = __decorate([
        routing_controllers_1.Controller(),
        __metadata("design:paramtypes", [typeof (_a = typeof CurrencyService_1.default !== "undefined" && CurrencyService_1.default) === "function" ? _a : Object])
    ], CurrencyController);
    return CurrencyController;
}());
exports.default = CurrencyController;
