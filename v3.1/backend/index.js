const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const FormStorageManager = require('./src/utils/form-storage');
const { generateFormId } = require('./src/utils/id-generator');
const FormSchema = require('./src/models/formSchema.model');
const FormSubmission = require('./src/models/formSubmissionSchema.model');

const app = express();

app.use(cors({
  origin: ['http://localhost:4200'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

const MONGODB_URI = 'mongodb+srv://deepakkumarsahoo2002:deepakkumarsahoo2002@dynamicformscluster.hx12s.mongodb.net/?retryWrites=true&w=majority&appName=dynamicFormsCluster';
mongoose.connect(MONGODB_URI, {
  dbName: 'DynamicForms'
});


/* GET ALL WIDGETS */
app.get('/api/widgets', async (req, res) => {
    try {
      const widgetTypes = ['textfield', 'numberfield', 'radio', 'combo'];
      const widgets = [];
      
      for (const type of widgetTypes) {
        const content = await fs.readFile(
          path.join(__dirname, `widgets/${type}.json`),
          'utf8'
        );
        // widgets[type] = JSON.parse(content);
        widgets.push(JSON.parse(content));
      }
      
      res.json(widgets);
    } catch (error) {
      res.status(500).json({ error: 'Failed to load widget templates' });
    }
});


/* GET PARTICULAR FORM SCHEMA */
app.get('/api/forms/:formId', async (req, res) => {
    try {
      const formId = req.params.formId;
      
      // Try to get from MongoDB first
      const dbForm = await FormSchema.findOne({ formId });
      
      if (dbForm) {
        return res.status(200).json(dbForm);
      }
  
      // If not in DB, try to get from file
      const fileForm = await FormStorageManager.getFormSchema(formId);
      
      if (fileForm) {
        return res.json(fileForm);
      }
  
      res.status(404).json({ error: 'Form not found' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve form' });
    }
});


/* DELETE PARTICULAR FORM SCHEMA */
app.delete('/api/forms/:formId', async (req, res) => {
  try {
    const formId = req.params.formId;
    
    // Try to get from MongoDB first
    const dbForm = await FormSchema.findOneAndDelete({ formId });
    
    if (!dbForm) {
      return res.status(404).json({ error: 'Form not found in database' });
    }


    // Delete form schema file from the filesystem
    const filePath = path.join(__dirname, '../form-schemas', `${formId}.json`);

    if(!filePath) return res.status(404).json({ error: 'Form schema file not found' });

    FormStorageManager.deleteFormSchema(formId);

    return res.status(200).json({ message: 'Form deleted successfully' });  
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve form' });
  }
});
  
  // Create new form
  app.post('/api/forms', async (req, res) => {
    try {
      const formId = generateFormId();
      
      const formData = {
        ...req.body,
        formId,
        createdAt: new Date()
      };
  
      // Save to MongoDB
      const formSchema = new FormSchema(formData);
      await formSchema.save();
  
      // Save to JSON file
      await FormStorageManager.saveFormSchema(formData);
  
      res.status(201).json({
        message: 'Form schema saved successfully',
        formId,
        schema: formData
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save form schema' });
    }
  });
  
  // Submit form data
  app.post('/api/form-submissions', async (req, res) => {
    try {
      const { formId, submissions } = req.body;
      
      const formSubmission = new FormSubmission({
        formId,
        submissions: submissions.map(sub => ({
          fieldName: sub.name,
          value: sub.value
        }))
      });
      
      await formSubmission.save();
      res.status(201).json(formSubmission);
    } catch (error) {
      res.status(500).json({ error: 'Failed to save form submission' });
    }
  });

  // GET ALL FORMS
app.get('/api/get-all-forms', async (req, res) => {
  try {
      const forms = await FormSchema.find({}, { _id: 0, __v: 0 }); // Exclude _id and __v fields
      res.status(200).json(forms);
  } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve forms' });
  }
});

  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });