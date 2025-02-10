import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ['furniture', 'fashion', 'electronics', 'groceries']
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dynamicFields: { type: Map, of: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

const Inventory = mongoose.model('Inventory', inventorySchema);
export default Inventory;
