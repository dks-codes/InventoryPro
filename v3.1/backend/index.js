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


  // Create new form
  app.post('/api/forms/create-form', async (req, res) => {
    try {
      const { formName, ...restBody } = req.body;
      const formId = generateFormId(formName);
      
      const formData = {
        ...restBody,
        formId,
        formName,
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
        formName,
        schema: formData
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save form schema' });
    }
});

/* GET PARTICULAR FORM SCHEMA (FORM) */
app.get('/api/forms/get-form/:formId', async (req, res) => {
    try {
      const formId = req.params.formId;
      
      // Try to get from MongoDB first
      const dbForm = await FormSchema.findOne({ formId });
      
      if (dbForm) {
        return res.status(200).json(dbForm);
      }
      else{
        console.log("Not found in DB, Searching in folder for json file...")
      }
  
      // If not in DB, try to get from file
      const fileForm = await FormStorageManager.getFormSchema(formId);
      
      if (fileForm) {
        console.log("Found form in folder in json format")
        return res.json(fileForm);
      }
  
      res.status(404).json({ error: 'Form not found' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve form' });
    }
});

/* UPDATE FORM SCHEMA */
app.put('/api/forms/update-form/:formId', async (req, res) => {
  try {
    const formId = req.params.formId;
    const updatedFields = req.body.fields;
    
    // Try to get from MongoDB first
    const updatedForm  = await FormSchema.findOneAndUpdate({ formId }, { fields: updatedFields }, { new: true, upsert: false });
    
    if (!updatedForm) {
      return res.status(404).json({ error: 'Form not found' });
    }

    // If not in DB, try to get from file
    const fileForm = await FormStorageManager.updateFormSchema(formId, updatedFields);
    
    if (fileForm) {
      return res.status(200).json({ message: 'Form updated successfully', form: updatedForm });;
    }

    res.status(404).json({ error: 'Form not found' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update form' });
  }
});

/* DELETE PARTICULAR FORM SCHEMA (FORM) */
app.delete('/api/forms/delete-form/:formId', async (req, res) => {
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

    await FormStorageManager.deleteFormSchema(formId);

    return res.status(200).json({ message: 'Form deleted successfully' });  
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve form' });
  }
});
  

  
  // Submit form data
  app.post('/api/form-submissions', async (req, res) => {
    try {
      const { formId, formName, submissions } = req.body;
      
      const formSubmission = new FormSubmission({
        formId,
        formName,
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

    const schemas = await FormStorageManager.getAllFormSchemas();

    if (schemas.length > forms.length) {
      res.status(200).json(schemas);
    } else {
      res.status(200).json(forms);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve forms' });
  }
});

  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });