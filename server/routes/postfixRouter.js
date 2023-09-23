import express from 'express';
const router = express.Router();
import { postfixCalculator, postfixConverter } from '../controllers/postfixController.js';
 router.post('/convert', postfixConverter);
 router.post('/calculate', postfixCalculator)


export default router;