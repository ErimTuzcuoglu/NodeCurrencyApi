import { parse } from "node-html-parser";
import IProvider from "../../models/IProvider";
import ICurrency from "../../models/ICurrency";
import ICurrencyParser from "../../interfaces/ICurrencyParser";

const fetch = require("node-fetch");

class BloombergParser implements ICurrencyParser {
  extractData(): Promise<IProvider> | undefined {
    try {
      return this.fetchDom()?.then((dom) => {
        const convertedData: ICurrency[] = [];
        var parsedData = parse(dom);
        parsedData
          .querySelector(".marketsData")
          .querySelector("tbody")
          .querySelectorAll("tr")
          .map((row) => {
            var tableData = row.querySelectorAll("td");
            var currency: ICurrency = {
              type: tableData[1].querySelector("a").hasAttribute("title")
                ? tableData[1].querySelector("a").getAttribute("title") || ""
                : "",
              buy: tableData[2].innerText,
              sell: tableData[3].innerText,
            };
            convertedData.push(currency);
          });
        var preparedData: IProvider = {
          providerName: "Bloomberg",
          currencies: convertedData,
        };
        return preparedData;
      });
    } catch (error) {
      return undefined;
    }
  }

  fetchDom(): Promise<string> | null {
    try {
      return fetch(`https://www.bloomberght.com/doviz`)
        .then((res: { text: () => any }) => res.text())
        .then((body: string) => {
          return body;
        });
    } catch (error) {
      return null;
    }
  }
}

export default BloombergParser;
