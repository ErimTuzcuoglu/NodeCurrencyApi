import { HTMLElement, parse } from "node-html-parser";
import { Inject, Service } from "typedi";
import IProvider from "../models/IProvider";
import ICurrencyService from "../interfaces/ICurrencyService";

import BloombergParser from "./parser/BloombergParser";
import CanliDovizParser from "./parser/CanliDovizParser";
import DovizParser from "./parser/DovizParser";
import ForeksParser from "./parser/ForeksParser";
import HurriyetParser from "./parser/HurriyetParser";
import InvestingParser from "./parser/InvestingParser";
import MilliyetParser from "./parser/MilliyetParser";
import MynetParser from "./parser/MynetParser";
import TCMBParser from "./parser/TCMBParser";

const fetch = require("node-fetch");

@Service()
export class CurrencyService implements ICurrencyService {
  @Inject() private bloombergParser!: BloombergParser;
  @Inject() private canliDovizParser!: CanliDovizParser;
  @Inject() private dovizParser!: DovizParser;
  @Inject() private foreksParser!: ForeksParser;
  @Inject() private hurriyetParser!: HurriyetParser;
  @Inject() private investingParser!: InvestingParser;
  @Inject() private milliyetParser!: MilliyetParser;
  @Inject() private mynetParser!: MynetParser;
  @Inject() private tcmbParser!: TCMBParser;

  public getAllCurrencies(): Promise<(IProvider | undefined)[]> {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.bloombergParser.extractData(this.fetchDom),
        // this.canliDovizParser.extractData(this.fetchDom),
        this.dovizParser.extractData(this.fetchDom),
        // this.foreksParser.extractData(this.fetchDom),
        this.hurriyetParser.extractData(this.fetchDom),
        this.investingParser.extractData(this.fetchDom),
        this.milliyetParser.extractData(this.fetchDom),
        this.mynetParser.extractData(this.fetchDom),
        this.tcmbParser.extractData(this.fetchDom),
      ]).then((allData) => {
        resolve(allData);
      });
    });
  }

  private fetchDom(url: string): Promise<HTMLElement> | null {
    try {
      return fetch(url)
        .then((res: { text: () => any }) => res.text())
        .then((body: string) => {
          return parse(body);
        });
    } catch (error) {
      return null;
    }
  }
}
