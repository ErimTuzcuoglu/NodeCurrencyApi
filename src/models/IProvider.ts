import ICurrency from "./ICurrency";

interface IProvider {
  providerName: string;
  currencies: ICurrency[];
}

export default IProvider;
