import { HTMLElement } from "node-html-parser";
import IProvider from "../models/IProvider";

interface ICurrencyParser {
  extractData(
    fetchDom: (url: string) => Promise<HTMLElement> | null
  ): Promise<IProvider> | undefined;
}

export default ICurrencyParser;
