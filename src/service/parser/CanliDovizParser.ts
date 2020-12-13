import { HTMLElement } from "node-html-parser";
import { Service } from "typedi";
import IProvider from "../../models/IProvider";
import ICurrency from "../../models/ICurrency";
import ICurrencyParser from "../../interfaces/ICurrencyParser";

@Service({ transient: true })
class CanliDovizParser implements ICurrencyParser {
  extractData(
    fetchDom: (url: string) => Promise<HTMLElement> | null
  ): Promise<IProvider> | undefined {
    try {
      return fetchDom(`https://canlidoviz.co/doviz-kurlari.php`)?.then(
        (parsedData: HTMLElement) => {
          const convertedData: ICurrency[] = [];
          parsedData
            .querySelector(".table.table-hover")
            .querySelector("tbody")
            .querySelectorAll("tr")
            .map((row) => {
              var tableData = row.querySelectorAll("td");
              console.log(tableData.toString() + "/n");
              var currency: ICurrency = {
                type: tableData[1].innerText,
                buy: tableData[6].innerText,
                sell: tableData[7].innerText,
              };
              convertedData.push(currency);
            });
          var preparedData: IProvider = {
            providerName: "Bloomberg",
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

export default CanliDovizParser;
