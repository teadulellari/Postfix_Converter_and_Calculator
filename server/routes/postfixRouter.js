import express from 'express';
const router = express.Router();
import { postfixCalculator, postfixConverter } from '../controllers/postfixController.js';

/**
 * @swagger
 * tags:
 *   name: Routes
 *   description: The Postfix Expression Converter and Calculator API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ConvertRequest:
 *       type: object
 *       required:
 *         - expression
 *         - delimiter
 *       properties:
 *         expression:
 *           type: string
 *           description: The infix expression to be converted
 *         delimiter:
 *           type: string
 *           description: The delimiter for the expression
 *         variables:
 *           type: object
 *           description: An object containing dynamic variable names and their values (optional)
 *           additionalProperties:
 *             type: string
 *       example:
 *         expression: 2.5,/,(,1.5,+,0.5,),+,n,+,m
 *         delimiter: ,
 *         variables:
 *           n: "2"  
 *           m: "3" 
 */

/**
 * @swagger
 * /api/convert:
 *   post:
 *     summary: Convert an infix expression into postfix expression
 *     tags: [Routes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConvertRequest'
 *             example:
 *               $ref: '#/components/schemas/ConvertRequestExample'
 *     responses:
 *       200:
 *         description: The expression is converted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: The converted postfix expression
 *       400:
 *         description: The expression is not valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 *       404:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 */
router.post('/convert', postfixConverter);

/**
 * @swagger
 * /api/calculate:
 *   post:
 *     summary: Calculate a postfix expression
 *     tags: [Routes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConvertRequest'
 *             example:
 *               $ref: '#/components/schemas/ConvertRequestExample'
 *     responses:
 *       200:
 *         description: The expression is calculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: The value of the postfix expression
 *       400:
 *         description: The expression is not valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 *       404:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 */
router.post('/calculate', postfixCalculator);


export default router;
