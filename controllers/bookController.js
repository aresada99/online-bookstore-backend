import BookModel from "../models/bookModel.js"


export const test = (req, res) => {
    res.json({
        message: "Test route"
    })
}

export const getAllBooks = async (req, res, next) => {
    try {
        const books = await BookModel.find();
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
}

export const getBookById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const book = await BookModel.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Kitap Bulunamadı' })
        }
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
}

export const createBook = async (req, res, next) => {
    const { title, author, price, description, stock } = req.body;
    const newBook = new BookModel({
        title,
        author,
        price,
        description,
        stock
    });

    try {
        const createdBook = await newBook.save();
        res.status(201).json(createdBook);
    } catch (error) {
        next(error);
    }
}

export const updateBook = async (req, res, next) => {
    const { id } = req.params;
    const { title, author, price, description, stock } = req.body;

    try {
        const book = await BookModel.findByIdAndUpdate(id, { title, author, price, description, stock }, { new: true })
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
}

export const deleteBook = async (req, res, next) => {

    const { id } = req.params;

    try {
        await BookModel.findByIdAndDelete(id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }

}