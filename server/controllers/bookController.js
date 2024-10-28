import errorHandler from '../middleware/errorHandler.js';
import Book from '../models/Book.js';


export const postBooks = async (req, res, next) => {

    try {
        const books = req.body.books;
        if (!books || books.length === 0) {
            return next(400, "No Book data provided");
        }
        const savedBook = await Book.insertMany(books);
        res.status(201).json({
            success: true,
            statusCode: 201,
            data: savedBook
        })
    } catch (error) {
        next(error)
    }
}

export const postBook = async (req, res, next) => {
    console.log("inside the postBook")
    try {
        const newBook = new Book(req.body)
        const savedBook = await newBook.save()
        res.status(200).json({
            success: true,
            statusCode: 201,
            data: savedBook
        })
    } catch (error) {
        next(error);
    }
}

export const getAllBooks = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;
        const books = await Book.find().sort({ title: sortDirection, author: sortDirection }).skip(startIndex).limit(limit);

        const totalBooks = await Book.countDocuments();

        if (books) {
            res.status(200).json({
                success: true,
                statusCode: 200,
                data: books,
                totalBooks
            })
        } else {
            errorHandler(400, 'Unknown error')
        }

    } catch (error) {
        next(error)
    }
}

export const getBestSellerByCategory = async (req, res, next) => {
    try {
        const { BisacCode } = req.query;
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;

        if (!BisacCode) {
            return next(errorHandler(400, "Missing required 'BisacCode' parameter"));
        }

        const books = await Book.find({ BisacCode: { $regex: BisacCode, $options: "i" } })
        .sort({ no_of_views: sortDirection })
        .skip(startIndex)
        .limit(limit);

        if (books) {
            res.status(200).json({
                success: true,
                statusCode: 200,
                data: books
            })
        } else {
            return errorHandler(400, "Unknow error")
        }
    } catch (error) {
        next(error)
    }
}

export const getSingleBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return next(errorHandler(404, "No book found with the give Id"))
        }
        return res.status(200).json({
            success: true,
            statusCode: 200,
            data: book
        })
    } catch (error) {
        next(error)
    }

}

export const UpdateBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, {
            $set: { ...req.body },
        }, { new: true })
        if (!updatedBook) {
            return next(errorHandler(404, "No book found with the given ID"));
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            data: updatedBook
        })
    } catch (error) {
        next(error);
    }
}

export const deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return next(errorHandler(404, "No book found with the given ID"));
        }

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Book deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const searchBooks = async (req, res, next) => {
    try {
        const { query } = req.query;
        const searchRegex = new RegExp(query, 'i');  // Case-insensitive search
        const books = await Book.find({
            $or: [
                { title: searchRegex }, // index utilized
                { author: searchRegex }, // index utilized
            ]
        }).explain();

        res.status(200).json({
            success: true,
            statusCode: 200,
            data: books
        });
    } catch (error) {
        next(error);
    }
};
