"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.all("*", function (req, res, next) { return next("Error"); });
exports.default = router;
