import { Router } from "express";
import CurrencyRoutes from "./CurrencyRoutes";

const router = Router();

router.use(CurrencyRoutes);

router.all("*", (req, res, next) => next("Error"));

export default router;
