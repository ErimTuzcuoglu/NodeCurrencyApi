import { HTMLElement, parse } from "node-html-parser";
import { Service } from "typedi";
import IProvider from "../../models/IProvider";
import ICurrency from "../../models/ICurrency";
import ICurrencyParser from "../../interfaces/ICurrencyParser";

@Service({ transient: true })
class MilliyetParser implements ICurrencyParser {
  extractData(
    fetchDom: (url: string) => Promise<HTMLElement> | null
  ): Promise<IProvider> | undefined {
    try {
      return fetchDom(`https://uzmanpara.milliyet.com.tr/doviz-kurlari/`)?.then(
        (parsedData: HTMLElement) => {
          const convertedData: ICurrency[] = [];
          parsedData
            .querySelector(".box.box7.box11")
            .querySelector("table")
            .querySelector("tbody")
            .querySelectorAll("tr")
            .map((row) => {
              var tableData = row.querySelectorAll("td");
              if (tableData.length > 0) {
                var currency: ICurrency = {
                  type:
                    tableData[1]
                      .querySelector("a")
                      .innerText.toString()
                      .trim() ?? "",
                  buy: tableData[2].innerText,
                  sell: tableData[3].innerText,
                };
                convertedData.push(currency);
              }
            });
          var preparedData: IProvider = {
            providerName: "uzmanpara.milliyet.com.tr",
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

export default MilliyetParser;
