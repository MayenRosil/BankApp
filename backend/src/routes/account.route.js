
import { Router } from "express";
import { assignAccount, assignCard, listUserProducts } from "../controllers/account.controller.js";
import { validateSession } from "../middlewares/auth.js";

// Account defined routes


const router = Router();

router.post('/assign/account', validateSession, assignAccount);
router.post('/assign/card', validateSession, assignCard);
router.get('/list/:id', validateSession, listUserProducts);


export default router;