import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        bookId: { type: String, required: true },
        title: { type: String, required: true, trim: true },
        author: { type: String, required: true, trim: true },
        ISBN: {
            type: String, unique: true, trim: true,
            validate: {
                validator: function (v) {
                    return /^(97(8|9))?\d{9}(\d|X)$/.test(v);  // Simple ISBN-10 and ISBN-13 validation
                },
                message: props => `${props.value} is not a valid ISBN!`
            }
        },
        rating: {
            type: Number, default: 0, min: [0, 'rating can not be less than 0'], max: [5, 'rating can not be more than 5'],
            validate: {
                validator: function (v) {
                    return v === Math.floor(v * 10) / 10; // Allows only one decimal place
                },
                message: props => `${props.value} has too many decimal places, only one decimal place is allowed`
            }
        },
        review: [{
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            comment: { Type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        }],
        publisher: { type: String, trim: true },
        publicationDate: { type: Date, default: Date.now },
        price: { type: Number, required: true, min: [0, 'Price must be a positive value'] },
        quantityInStock: { type: Number, default: 0, min: [0, 'Stock cannot be negative'] },
        description: { type: String, trim: true },
        imageUrl: { type: String, trim: true }
    },
    { timestamps: true }
);

// Index fields that are frequently queried
bookSchema.index({ title: 1, author: 1 });

export default mongoose.model('Book', bookSchema)