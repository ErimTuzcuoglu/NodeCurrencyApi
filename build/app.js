"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var index_1 = __importDefault(require("./config/env/index"));
var routing_controllers_1 = require("routing-controllers");
var controllers_1 = __importDefault(require("./api/controllers"));
var app = routing_controllers_1.createExpressServer({
    controllers: controllers_1.default,
});
// app.get("/", (req, res, next) => {
//   res.send(
//     '<img src="https://i.kym-cdn.com/photos/images/newsfeed/001/862/049/57a.jpg"></img'
//   );
// });
// app.use(routes);
app.listen(index_1.default.port);
