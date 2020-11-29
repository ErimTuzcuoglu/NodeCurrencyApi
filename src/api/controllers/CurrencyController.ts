import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import CurrencyService from "../../service/CurrencyService";

function getAllCurrencies(req: Request, res: Response, next: NextFunction) {
  try {
    CurrencyService.getAllCurrencies()?.then((parsedData) => {
      res.status(StatusCodes.OK).send(parsedData);
    });
  } catch (error) {}
}

export default {
  getAllCurrencies,
};
