import { HTMLElement } from "node-html-parser";
import { Service } from "typedi";
import IProvider from "../../models/IProvider";
import ICurrency from "../../models/ICurrency";
import ICurrencyParser from "../../interfaces/ICurrencyParser";

@Service({ transient: true })
class DovizParser implements ICurrencyParser {
  extractData(
    fetchDom: (url: string) => Promise<HTMLElement> | null
  ): Promise<IProvider> | undefined {
    try {
      return fetchDom(`https://kur.doviz.com/`)?.then(
        (parsedData: HTMLElement) => {
          const convertedData: ICurrency[] = [];
          parsedData
            .querySelector("#currencies")
            .querySelector("tbody")
            .querySelectorAll("tr")
            .map((row) => {
              if (row.hasAttribute("data-table-subpage-key")) {
                var tableData = row.querySelectorAll("td");
                var currency: ICurrency = {
                  type:
                    tableData[0]
                      .querySelector("a")
                      .innerText.toString()
                      .trim() ?? "",
                  buy: tableData[1].innerText,
                  sell: tableData[2].innerText,
                };
                convertedData.push(currency);
              }
            });
          var preparedData: IProvider = {
            providerName: "kur.doviz.com",
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

export default DovizParser;
