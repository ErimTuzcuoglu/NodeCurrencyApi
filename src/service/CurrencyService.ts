import BloombergParser from "./parser/BloombergParser";

function getAllCurrencies() {
    var bloombergParser = new BloombergParser();

    return bloombergParser.extractData();
}

export default {
  getAllCurrencies,
};
