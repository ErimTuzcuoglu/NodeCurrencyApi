import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Controller, Get, Res } from "routing-controllers";
import { Inject } from "typedi";
import { CurrencyService } from "../../service/CurrencyService";

@Controller()
export default class CurrencyController {
  @Inject() private currencyService!: CurrencyService;

  @Get("/getAllCurrencies")
  public getAllCurrencies(@Res() res: Response) {
    try {
      return this.currencyService
        .getAllCurrencies()
        ?.then((parsedData: any) => {
          return res.status(StatusCodes.OK).send(parsedData);
        });
    } catch (error) {
      console.log(this.currencyService);
      console.log("Hata: " + error);
    }
  }
}
