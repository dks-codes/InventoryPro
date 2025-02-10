const mongoose = require('mongoose');

const formSchemaModel = new mongoose.Schema({
    formId: { type: String, required: true, unique: true },
    fields: [{ type: mongoose.Schema.Types.Mixed }],
    createdAt: { type: Date, default: Date.now }
  });

  const FormSchema = mongoose.model('FormSchema', formSchemaModel);

  module.exports = FormSchema;