import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default : "Bu kitap için mevcut bir açıklama bulunmamakta."
    },
    stock: {
        type: Number,
        required: true,
        default: 0 
    }
},{timestamps:true});

const BookModel = mongoose.model('Book', bookSchema);

export default BookModel;