"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_html_parser_1 = require("node-html-parser");
var fetch = require("node-fetch");
var BloombergParser = /** @class */ (function () {
    function BloombergParser() {
    }
    BloombergParser.prototype.extractData = function () {
        var _a;
        try {
            return (_a = this.fetchDom()) === null || _a === void 0 ? void 0 : _a.then(function (dom) {
                var convertedData = [];
                var parsedData = node_html_parser_1.parse(dom);
                parsedData
                    .querySelector(".marketsData")
                    .querySelector("tbody")
                    .querySelectorAll("tr")
                    .map(function (row) {
                    var tableData = row.querySelectorAll("td");
                    var currency = {
                        type: tableData[1].querySelector("a").hasAttribute("title")
                            ? tableData[1].querySelector("a").getAttribute("title") || ""
                            : "",
                        buy: tableData[2].innerText,
                        sell: tableData[3].innerText,
                    };
                    convertedData.push(currency);
                });
                var preparedData = {
                    providerName: "Bloomberg",
                    currencies: convertedData,
                };
                return preparedData;
            });
        }
        catch (error) {
            return undefined;
        }
    };
    BloombergParser.prototype.fetchDom = function () {
        try {
            return fetch("https://www.bloomberght.com/doviz")
                .then(function (res) { return res.text(); })
                .then(function (body) {
                return body;
            });
        }
        catch (error) {
            return null;
        }
    };
    return BloombergParser;
}());
exports.default = BloombergParser;
