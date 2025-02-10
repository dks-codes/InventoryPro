const mongoose = require('mongoose');

const formSubmissionSchema = new mongoose.Schema({
    formId: { type: String, required: true },
    submissions: [{
      fieldName: String,
      value: mongoose.Schema.Types.Mixed,
      submittedAt: { type: Date, default: Date.now }
    }]
  });

  const FormSubmission = mongoose.model('FormSubmission', formSubmissionSchema);

  module.exports = FormSubmission;