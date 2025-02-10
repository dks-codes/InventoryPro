import Inventory from '../models/inventoryModel.js';
import DynamicField  from '../models/dynamicFieldModel.js';
import validateDynamicField from '../utils/validateDynamicField.js';

export const inventoryController = {
  async create(req, res) {
    try {
      const { itemName, category, quantity, price, dynamicFields } = req.body;            // dynamic = [roll: 14, class: 12]
      
      const validationResult = await validateDynamicField(dynamicFields, 'inventory', req.user.id);

      if (!validationResult.valid) {
        return res.status(400).json({ error: validationResult.message });
      }

      const inventory = new Inventory({
        itemName, category, quantity, price,
        dynamicFields,
        userId: req.user.id
      }); 

      await inventory.save();
      res.status(201).json(inventory);
    } catch (error) {
      // Internal Server Error
      console.error('Error creating inventory item:', error);
      return res.status(500).json({ error: "Internal Server Error", error });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { itemName, category, quantity, price, dynamicFields } = req.body;

      const validationResult =await validateDynamicField(dynamicFields, 'inventory', req.user.id);
      if (!validationResult.valid) {
        return res.status(400).json({ error: validationResult.message });
      }

      const inventory = await Inventory.findByIdAndUpdate(
        id,
        {
          itemName, category, quantity, price,
          dynamicFields,
          userId: req.user.id
        },
        { new: true }
      );

      res.status(200).json(inventory);
    } catch (error) {
      if( error.message.includes('is not present') || error.message.includes('is required')){
        return res.status(400).json({ error: error.message});
      }
      console.error('Error updating inventory item:', error);
      return res.status(500).json({ error: "Internal Server Error", error });
    }
  },

  async getAllItems(req, res) {
    try {
      const items = await Inventory.find({ userId: req.user.id })
        .sort({ createdAt: -1 });
      
      res.status(200).json(items);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },


  async getItem(req, res) {
    try {
      const { id } = req.params;
      const item = await Inventory.findOne({ _id: id, userId: req.user.id });
      
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      
      res.status(200).json(item);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },


  async deleteItem(req, res) {
    try {
      const { id } = req.params;
      const item = await Inventory.findOneAndDelete({ _id: id, userId: req.user.id });
      
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      
      res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Search items with dynamic and static fields

     async searchItems(req, res) {
      try {
        const { name, category, maxPrice, minPrice, dynamicFields, query } = req.query;
        let searchConditions = { userId: req.user.id };
    
        // General text search
        if (query) {
          searchConditions.$or = [
            { itemName: { $regex: query, $options: 'i' } },
            { category: { $regex: query, $options: 'i' } }
          ];
        }
    
        // Search by name
        if (name) {
          searchConditions.itemName = { $regex: name, $options: 'i' };
        }
    
        // Filter by category
        if (category) {
          searchConditions.category = category;
        }
    
        // Price range filter
        if (minPrice || maxPrice) {
          searchConditions.price = {};
          if (minPrice) searchConditions.price.$gte = Number(minPrice);
          if (maxPrice) searchConditions.price.$lte = Number(maxPrice);
        }
    
        // Dynamic fields search
        if (dynamicFields) {
          Object.entries(dynamicFields).forEach(([key, value]) => {
            searchConditions[`dynamicFields.${key}`] = { $regex: value, $options: 'i' };
          });
        }
    
        // Fetch all matching results without pagination
        const items = await Inventory.find(searchConditions).sort({ createdAt: -1 });
    
        res.status(200).json(items);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
    
  
};