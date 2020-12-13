import { HTMLElement } from "node-html-parser";
import { Service } from "typedi";
import IProvider from "../../models/IProvider";
import ICurrency from "../../models/ICurrency";
import ICurrencyParser from "../../interfaces/ICurrencyParser";

@Service({ transient: true })
class HurriyetParser implements ICurrencyParser {
  extractData(
    fetchDom: (url: string) => Promise<HTMLElement> | null
  ): Promise<IProvider> | undefined {
    try {
      return fetchDom(`https://bigpara.hurriyet.com.tr/doviz/`)?.then(
        (parsedData: HTMLElement) => {
          const convertedData: ICurrency[] = [];
          parsedData
            .querySelector(".tableBox.srbstPysDvz")
            .querySelector(".tBody")
            .querySelectorAll("ul")
            .map((row) => {
              var tableData = row.querySelectorAll("li");
              var currency: ICurrency = {
                type: tableData[0].querySelector("a").innerText ?? "",
                buy: tableData[2].innerText,
                sell: tableData[3].innerText,
              };
              convertedData.push(currency);
            });
          var preparedData: IProvider = {
            providerName: "bigpara.hurriyet.com",
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

export default HurriyetParser;
