import { Router } from "express";
import CurrencyController from "../controllers/CurrencyController";

const router = Router();

router.get("/getAllCurrencies", CurrencyController.getAllCurrencies);

export default router;
