import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: [ 'Electronics', 'Furniture', 'Groceries', 'Fashion' ],
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    }
},
{
    timestamps: true
});

const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;