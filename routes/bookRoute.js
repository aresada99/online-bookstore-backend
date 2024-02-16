import express from "express";

import {test, getAllBooks, getBookById, createBook, updateBook, deleteBook} from '../controllers/bookController.js';


const router = express.Router();


router.get('/test', test);
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);


export default router;