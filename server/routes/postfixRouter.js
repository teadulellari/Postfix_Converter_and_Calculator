import express from 'express';
const router = express.Router();
import { postfixController } from '../controllers/postfixController.js';
// this is fkin controller cuz it LITERALLY handles HTTP URLS in your case it handles /convert
export default router.post('/convert', postfixController);


