import Inventory from "../models/inventoryModel.js";

// GET ALL ITEMS
export const getAllItems = async (req,res) => {
    try{
        const items = await Inventory.find({ userId: req.user.id });
        if(!items){
            return res.status(404).json({ message: "No Inventory!"});
        }
        return res.status(200).json({
            items: items
        })
    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
};

// GET ITEM BY ID
export const getItem = async (req,res) => {
    const { id } = req.params;
    try{
        const item = await Inventory.findOne({ _id: id, userId: req.user.id});
        if(!item){
            return res.status(404).json({ message: "Item Not Found! "})
        }
        return res.status(200).json( { item });
    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
};

// ADD AN ITEM
export const addItem = async (req,res) => {
    const { name, category, quantity, price } = req.body;
    
    try{
        const newItem = new Inventory({ name, category, quantity, price, userId: req.user.id });
        await newItem.save();
        return res.status(201).json({ message: "New Item Created" , newItem });
    }
    catch(err){
        return res.status(500).json({ message: err.message});
    }
};

// UPDATE AN ITEM
export const updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, category, quantity, price } = req.body;
    try{
        const updatedItem = await Inventory.findOneAndUpdate({ _id: id, userId: req.user.id}, { name, category, quantity, price }, { new: true });
        if( !updatedItem ){
            return res.status(404).json({ message : "Item Not Found!"});
        }
        return res.status(200).json(updatedItem);
    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
}

// DELETE AN ITEM
export const deleteItem = async (req,res) => {
    const { id } = req.params;
    try {
        const deletedItem = await Inventory.findOneAndDelete({ _id: id, userId: req.user.id });
        if(!deletedItem) return res(404).json( {message : "Item Not Found!"});
        return res.status(200).json({ message : "Item deleted successfully!", deletedItem })
    }catch(err) {
        return res.status(500).json( {message: err.message} );
    }
}


// SEARCH ITEMs
export const searchItems = async (req, res) => {
    const { name, category, minPrice, maxPrice } = req.query;  // key-value pairs, seperated by &

    const filter = { userId: req.user.id };

    if(name) filter.name = new RegExp(name, 'i');
    if(category) filter.category = category;
    if(minPrice ) filter.price = { ...filter.price, $gte: Number(minPrice)};
    if(maxPrice ) filter.price = { ...filter.price, $lte: Number(maxPrice)};

    try {
        const searchedItems = await Inventory.find(filter);
        return res.status(200).json(searchedItems);
    }catch(err){
        return res.status(500).json({ message: err.message});
    }
};
