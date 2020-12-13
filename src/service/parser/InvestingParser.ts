import { HTMLElement, parse } from "node-html-parser";
import { Service } from "typedi";
import IProvider from "../../models/IProvider";
import ICurrency from "../../models/ICurrency";
import ICurrencyParser from "../../interfaces/ICurrencyParser";

@Service({ transient: true })
class InvestingParser implements ICurrencyParser {
  extractData(
    fetchDom: (url: string) => Promise<HTMLElement> | null
  ): Promise<IProvider> | undefined {
    try {
      return fetchDom(
        `https://tr.investing.com/currencies/single-currency-crosses`
      )?.then((parsedData: HTMLElement) => {
        const convertedData: ICurrency[] = [];
        parsedData
          .querySelector(".genTbl.closedTbl.crossRatesTbl.elpTbl.elp20")
          .querySelector("tbody")
          .querySelectorAll("tr")
          .map((row) => {
            var tableData = row.querySelectorAll("td");
            var currency: ICurrency = {
              type:
                tableData[1].querySelector("a").innerText.toString().trim() ??
                "",
              buy: tableData[2].innerText,
              sell: tableData[3].innerText,
            };
            convertedData.push(currency);
          });
        var preparedData: IProvider = {
          providerName: "tr.investing.com",
          currencies: convertedData,
        };
        return preparedData;
      });
    } catch (error) {
      return undefined;
    }
  }
}

export default InvestingParser;
