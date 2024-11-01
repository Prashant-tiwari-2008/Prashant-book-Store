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

export const getBooks = async (req, res, next) => {
    try {
        const { BisacCode, Price, Author, Publisher, Discount, Language, Casing, startIndex, limit, sort } = req.query;

        const startIndexValuee = parseInt(startIndex) || 0;
        const limitValue = parseInt(limit) || 15;
        const sortDirection = sort === 'asc' ? 1 : -1;

        const filters = {};

        const bisacCodeRegex = new RegExp(BisacCode, 'i');
        filters.BisacCode = bisacCodeRegex

        // add multiple price selection code
        //  
        if (Price) {
            let minPrice = 0;
            let maxPrice = 0
            Price.split(",").map((a) => {
                let [t2, t3] = a.split('-');
                minPrice = Math.min(t2, minPrice);
                maxPrice = Math.max(t3, maxPrice)
            });
            filters.selling_price = { $gte: minPrice, $lte: maxPrice }
        }

        if (Author) {
            filters.author = { $in: Author.split(",").map(a => a.trim()) };
        }

        if (Publisher) {
            filters.publisher = { $in: Publisher.split(",").map(a => a.trim()) };
        }

        if (Discount) {
            filters.discount_ranges = Discount;
        }

        if (Language) {
            filters.PublishedLanguage = { $in: Language.split(",").map(a => a.trim()) };
        }

        if (Casing) {
            filters.Casing = { $in: Casing.split(",").map(a => a.trim()) };
        }

        const books = await Book.find(filters).sort({ title: sortDirection, author: sortDirection }).skip(startIndexValuee).limit(limitValue);

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

export const getFilterOptions = async (req, res, next) => {
    try {
        const { BisacCode } = req.query;
        if (!BisacCode) {
            return errorHandler(400, "BisacCode is missing in query parameter");
        }

        // Prepare case-insensitive regex for BisacCode matching
        const bisacCodeRegex = new RegExp(BisacCode, 'i');
        const [Author, Publisher, Discount, Language, Casing] = await Promise.all([
            Book.distinct('author', { BisacCode: bisacCodeRegex }),
            Book.distinct('publisher', { BisacCode: bisacCodeRegex }),
            Book.distinct('discount_ranges', { BisacCode: bisacCodeRegex }),
            Book.distinct('PublishedLanguage', { BisacCode: bisacCodeRegex }),
            Book.distinct('Casing', { BisacCode: bisacCodeRegex })
        ])

        const price_range = [
            "0 - 500", "501 - 1000", "1001 - 1500", "1501 - 5000"
        ]
        res.status(200).json({
            statusCode: 200,
            success: true,
            data: [
                { label: "Price", value: price_range },
                { label: "Author", value: Author },
                { label: "Publisher", value: Publisher },
                { label: "Discount", value: Discount },
                { label: "Language", value: Language },
                { label: "Casing", value: Casing },
            ]

        })

    } catch (error) {
        next(error);
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
