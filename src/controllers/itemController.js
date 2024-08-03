import Item from '../models/Item.js';

// Fetch all items from the database
export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Fetch a single item by ID from the database
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Create a new item in the database
export const createItem = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const newItem = new Item({ name, description, price });
    console.log(newItem);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Update an existing item in the database
export const updateItem = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { name, description, price },
      { new: true, runValidators: true }
    );
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Delete an item from the database
export const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted', deletedItem });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const addRatingAndComment = async (req, res) => {
  console.log("edj");
  const { id } = req.params;
  const { rating, comment } = req.body;

  console.log(id);
  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).send('Item not found');
    }

    item.ratings.push({ userId: req.user._id, rating, comment });
    await item.save();
    res.status(200).send('Rating and comment added successfully');
  } catch (err) {
    res.status(500).send('Server error');
  }
};
