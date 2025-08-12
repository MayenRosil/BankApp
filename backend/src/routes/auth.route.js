
import { Router } from "express";
import { getUsers, login, register } from "../controllers/auth.controller.js";
import { validateSession } from "../middlewares/auth.js";

// Login, Register and Auth defined routes


const router = Router();

router.post('/register/', register);
router.post('/login/', login);
router.get('/users/', validateSession, getUsers);


export default router;