import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
    label: { type: String, required: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
    fieldId: { type: mongoose.Schema.Types.ObjectId, ref: 'DynamicField', required: true } // Reference to DynamicField
}, { timestamps: true });

const DynamicFieldOption = mongoose.model('DynamicFieldOption', optionSchema);
export default DynamicFieldOption;
