import ICurrency from "../models/ICurrency";
import IProvider from "../models/IProvider";

interface ICurrencyParser {
  extractData(): Promise<IProvider> | undefined;
  fetchDom(): Promise<string> | null;
}

export default ICurrencyParser;
