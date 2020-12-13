import IProvider from "../models/IProvider";

interface ICurrencyService {
  getAllCurrencies(): Promise<(IProvider | undefined)[]>;
}

export default ICurrencyService;
