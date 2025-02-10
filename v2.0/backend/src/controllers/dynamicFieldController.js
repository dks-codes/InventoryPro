import mongoose from 'mongoose';
import DynamicField from '../models/dynamicFieldModel.js'

export const dynamicFieldController = {

  // ADD FIELD
  async addField(req, res) {
    try {
      const { isGlobal, fieldName, displayName, fieldType, entity, configuration } = req.body;

      if(isGlobal && req.user.role !== 'admin') {
        return res.status(403).json({ error: "Only admins can create global fields." });
      }

      const newField = new DynamicField({
        fieldName, displayName, fieldType, entity, isGlobal,  configuration, 
        createdBy: req.user.id
      });

      await newField.save();
      res.status(201).json(newField);

    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ 
          error: 'A field with this name already exists for your account' 
        });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  },

  // GET DYNAMIC FIELDS
  async getDynamicFields(req, res) {
    try {
      const { entity } = req.params;
      //As userID is a string but createdBy is a ObjectId,so, we convert the type.
      //Although mongoose explictly converts the string to ObjectId, but its best practice to do it explicitly.

      if( entity !== 'user' && entity !== 'inventory') {
        return res.status(400).json({ error: 'Invalid entity type' });
      }

      const userId = new mongoose.Types.ObjectId(req.user.id);

      const fields = await DynamicField.find({
        entity,
        $or: [
          { createdBy: userId },
          { isGlobal: true }
        ]
      }).sort({ createdAt: -1 });

      res.status(200).json(fields);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // GET FORM [INVENTORY/ADMIN] FIELDS
  async getFormFields(req, res) {
    try {
      const { entity } = req.params; //(either 'inventory' or 'user')
      const userId = req.user.id;
  
      // Define static fields for inventory and user
      const staticFields = {
        inventory: [
          { fieldName: 'itemName', displayName: 'Item Name', fieldType: 'textfield' },
          { fieldName: 'category', displayName: 'Category', fieldType: 'textfield' },
          { fieldName: 'quantity', displayName: 'Quantity', fieldType: 'number' },
          { fieldName: 'price', displayName: 'Price', fieldType: 'number' }
        ],
        user: [
          { fieldName: 'username', displayName: 'Username', fieldType: 'textfield' },
          { fieldName: 'email', displayName: 'Email', fieldType: 'email' },
          { fieldName: 'password', displayName: 'Password', fieldType: 'textfield' }
        ]
      };
  
      // Validate the entity and get the corresponding static fields
      const fieldsForEntity = staticFields[entity];
  
      if (!fieldsForEntity) {
        return res.status(400).json({ error: 'Invalid entity type' });
      }
  
      // Fetch dynamic fields created by the user for the specific entity
      const dynamicFields = await DynamicField.find({
        entity: entity,
        $or: [{ createdBy: userId }, { isGlobal: true }]
      }).select('fieldName displayName fieldType configuration');  // Fetch necessary dynamic field details
  
      // Combine static and dynamic fields
      const allFields = [...fieldsForEntity, ...dynamicFields.map(field => ({
        fieldName: field.fieldName,
        displayName: field.displayName,
        fieldType: field.fieldType,
        configuration: field.configuration  // Optional: Include configuration details like required, default value, etc.
      }))];
  
      // Send combined fields to the frontend
      res.status(200).json(allFields);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },


  // GET ALL FIELDS (FOR ADMIN ONLY)
  async getAllFields(req, res) {
    try {
      if (!req.user.isAdmin) {
        return res.status(403).json({ error: 'Admin access required' });
      }

      const fields = await DynamicField.find()
        .populate('createdBy', 'username email')
        .sort({ createdAt: -1 }); // Sort on basis of createdAt in desc order

      res.status(200).json(fields);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // UPDATE FIELD
  async updateField(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const field = await DynamicField.findById(id);
      
      if (!field) {
        return res.status(404).json({ error: 'Field not found' });
      }

      // Field is not global && Field is not created by User && User is not Admin
      if (!field.isGlobal && field.createdBy.toString() !== userId && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Not authorized to modify this field' });
      }


      // If options is an array of strings, convert it to an array of objects
      if (req.body.configuration?.options) {
        req.body.configuration.options = req.body.configuration.options.map(opt => 
            typeof opt === "object" ? opt : { label: String(opt), value: opt }
        );
      }

      const updatedField = await DynamicField.findByIdAndUpdate(
        id,
        { ...req.body, updatedAt: Date.now() },
        { new: true }
      );

      res.status(200).json(updatedField);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // DELETE FIELD
  async deleteField(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const field = await DynamicField.findById(id);
      
      if (!field) {
        return res.status(404).json({ error: 'Field not found' });
      }

      if (!field.isGlobal && field.createdBy.toString() !== userId && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Not authorized to delete this field' });
      }

      await DynamicField.findByIdAndDelete(id);
      res.status(200).json({ message: 'Field deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  /***** ADD UPDATE DELETE OPTIONS ******/

  // Add an option to the radio/combo/checkbox field
  async addOption(req, res) {
    try {
      const { fieldId, label, value } = req.body; // get the label and value for the option
      const field = await DynamicField.findById(fieldId);
      
      if (!field) {
        return res.status(404).json({ error: 'Field not found' });
      }

      // Ensure the field is of the correct type
      if (!['radio', 'combo', 'checkbox'].includes(field.fieldType)) {
        return res.status(400).json({ error: 'Invalid field type for options' });
      }

      // Add the new option to the field's options array
      field.configuration.options.push({ label, value });

      await field.save();
      res.status(200).json({ message: 'Option added successfully', field });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Update an option in the radio/combo/checkbox field
  async updateOption(req, res) {
  try {
    const { fieldId, optionId, newLabel, newValue } = req.body; // Get option details
    console.log(fieldId, optionId, newLabel, newValue);
    if(!fieldId || !optionId || !newLabel || typeof newValue === 'undefined') {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const field = await DynamicField.findById(fieldId);

    if (!field) {
      return res.status(404).json({ error: 'Field not found' });
    }

    if (!['radio', 'combo', 'checkbox'].includes(field.fieldType)) {
      return res.status(400).json({ error: 'Invalid field type for options' });
    }

    const option = field.configuration.options.id(optionId); // id for obtaining sub-document and returns object
    // option - mongoose object
    if (!option) {
      return res.status(404).json({ error: 'Option not found' });
    }

    option.label = newLabel;
    option.value = newValue;

    await field.save();
    res.status(200).json({ message: 'Option updated successfully', field });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  },

  // Delete an option
  async deleteOption(req, res) {
    try {
      const { fieldId, optionId } = req.body; // Get option details
      if (!fieldId || !optionId) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const field = await DynamicField.findById(fieldId);

      if (!field) {
        return res.status(404).json({ error: 'Field not found' });
      }

      if (!['radio', 'combo', 'checkbox'].includes(field.fieldType)) {
        return res.status(400).json({ error: 'Invalid field type for options' });
      }

      // Remove the option using its _id
      const option = field.configuration.options.id(optionId);
      if (!option) {
        return res.status(404).json({ error: 'Option not found' });
      }

      field.configuration.options.pull({ _id: optionId });
      await field.save();

      res.status(200).json({ message: 'Option deleted successfully', field });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

};
