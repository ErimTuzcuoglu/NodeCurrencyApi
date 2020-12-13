import { HTMLElement, parse } from "node-html-parser";
import { Service } from "typedi";
import IProvider from "../../models/IProvider";
import ICurrency from "../../models/ICurrency";
import ICurrencyParser from "../../interfaces/ICurrencyParser";

@Service({ transient: true })
class TCMBParser implements ICurrencyParser {
  extractData(
    fetchDom: (url: string) => Promise<HTMLElement> | null
  ): Promise<IProvider> | undefined {
    try {
      return fetchDom(
        `https://www.tcmb.gov.tr/kurlar/today.xml?_=${Date.parse(
          Date()
        ).toString()}`
      )?.then((parsedData: HTMLElement) => {
        const convertedData: ICurrency[] = [];
        parsedData.querySelectorAll("Currency").map((row) => {
          var currency: ICurrency = {
            type:
              row.querySelector("CurrencyName").innerText.toString().trim() ??
              "",
            buy: row.querySelector("ForexBuying").innerText,
            sell: row.querySelector("ForexSelling").innerText,
          };
          convertedData.push(currency);
        });
        var preparedData: IProvider = {
          providerName: "tcmb.gov.tr",
          currencies: convertedData,
        };
        return preparedData;
      });
    } catch (error) {
      return undefined;
    }
  }
}

export default TCMBParser;
