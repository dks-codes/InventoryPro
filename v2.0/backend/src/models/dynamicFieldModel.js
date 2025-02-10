import mongoose from 'mongoose';

  const dynamicFieldSchema = new mongoose.Schema({
    fieldName: { type: String, required: true },
    displayName: { type: String, required: true },
    fieldType: {
      type: String,
      required: true,
      enum: [
        'textfield',
        'numberfield',
        'radio',
        'combo',
        'fileupload',
        'date',
        'email',
        'checkbox',
        'phonenumber'
      ]
    },
    entity: {
      type: String,
      required: true,
      enum: ['user', 'inventory']
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    isGlobal: {
      type: Boolean,
      default: false
    },
    configuration: {
      maxLength: { type: Number },
      minLength: { type: Number },
      defaultValue: { type: mongoose.Schema.Types.Mixed },
      required: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false },
      isHidden: { type: Boolean, default: false },
      multiselect: { type: Boolean },
      options: [{                             // For Multi Data
        label: { type: String },
        value: { type: mongoose.Schema.Types.Mixed }
      }]
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  dynamicFieldSchema.index(
    { fieldName: 1, createdBy: 1, entity: 1 }, 
    { unique: true }
  );

const DynamicField = mongoose.model('DynamicField', dynamicFieldSchema);
export default DynamicField;
