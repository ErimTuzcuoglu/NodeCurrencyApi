import { HTMLElement, parse } from "node-html-parser";
import { Service } from "typedi";
import IProvider from "../../models/IProvider";
import ICurrency from "../../models/ICurrency";
import ICurrencyParser from "../../interfaces/ICurrencyParser";

@Service({ transient: true })
class MynetParser implements ICurrencyParser {
  extractData(
    fetchDom: (url: string) => Promise<HTMLElement> | null
  ): Promise<IProvider> | undefined {
    try {
      return fetchDom(`https://finans.mynet.com/doviz/`)?.then(
        (parsedData: HTMLElement) => {
          const convertedData: ICurrency[] = [];
          parsedData
            .querySelector(".wfull.table-data.search-table")
            .querySelector("tbody")
            .querySelectorAll("tr")
            .map((row) => {
              var tableData = row.querySelectorAll("td");
              var currency: ICurrency = {
                type:
                  tableData[0].querySelector("a").innerText.toString().trim() ??
                  "",
                buy: tableData[2].innerText,
                sell: tableData[3].innerText,
              };
              convertedData.push(currency);
            });
          var preparedData: IProvider = {
            providerName: "finans.mynet.com",
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

export default MynetParser;
