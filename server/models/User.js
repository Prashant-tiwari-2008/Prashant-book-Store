import mongose from 'mongoose';
import bcrypt from 'bcrypt'

const userSchema = new mongose.Schema(
    {
        customerId: { type: String, required: true, unique: true },
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, trim: true },
        email: {
            type: String, required: true, unique: true, trim: true, lowercase: true,
            validate: {
                validator: function (v) {
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
                },
                message: props => `${props.value} is not a valid email!`
            }
        },
        phoneNumber: {
            type: Number, required: true,
            validate: {
                validator: function (v) {
                    return /^(?:(?:\+91|0)?[7-9][0-9]{9})$/.test(v);
                },
                message: props => `${props.value} is not a valid Phone Number!`
            }
        },
        password: { type: String, required: true },
        Address: addressSchema,
        timestamps: true
    }
)

const addressSchema = new mongose.Schema({
    addressLine1: { type: String, trim: true },
    addressLine2: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    country: { type: String, trim: true },
    zipCode: {
        type: String, trim: true,
        validation: {
            validator: function (v) {
                return /^\d{5}(-\d{4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid ZIP code !`
        }
    },

})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next(); // if passwrod hasn't changed,continue
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt) // Hash the password
        next();
    } catch (error) {
        next(error)
    }
})

// Add an instance method to compare passwords
userSchema.methods.comparePassword = async function (condidatePassword) {
    return await bcrypt.compare(condidatePassword, this.password)
}

// Index fields that are frequently queried
userSchema.index({ email: 1, customerId: 1 });
export default mongose.model('User', userSchema)