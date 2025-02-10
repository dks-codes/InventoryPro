const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/dynamicFormsDB', { dbName: dynamicFormsDB });

// Define Schema
const DynamicDataSchema = new mongoose.Schema({}, { strict: false });
const DynamicData = mongoose.model('DynamicData', DynamicDataSchema);

// Save Form Data
router = express.Router();
router.get('/getSavedData', async (req, res) => {
    try {
      const savedData = await DynamicData.find(); // Fetch all saved data from the database
      res.status(200).json(savedData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

router.post('/save', async (req, res) => {
    try {
        const newData = new DynamicData(req.body);
        await newData.save();
        res.status(200).json({ message: 'Data saved successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3939, () => console.log('Server running on port 3939'));
