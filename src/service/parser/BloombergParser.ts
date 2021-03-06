import { HTMLElement } from "node-html-parser";
import { Service } from "typedi";
import IProvider from "../../models/IProvider";
import ICurrency from "../../models/ICurrency";
import ICurrencyParser from "../../interfaces/ICurrencyParser";

@Service({ transient: true })
class BloombergParser implements ICurrencyParser {
  extractData(
    fetchDom: (url: string) => Promise<HTMLElement> | null
  ): Promise<IProvider> | undefined {
    try {
      return fetchDom(`https://www.bloomberght.com/doviz`)?.then(
        (parsedData: HTMLElement) => {
          const convertedData: ICurrency[] = [];
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
            providerName: "bloomberght.com",
            currencies: convertedData,
          };
          return preparedData;
        }
      );
    } catch (error) {
      return undefined;
    }
  }
}

export default BloombergParser;
