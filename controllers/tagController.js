import Tag from '../models/Tag.js';

// Create a new tag
export const createTag = async (req, res) => {
  try {
    const { name } = req.body;
    const newTag = new Tag({ name });
    await newTag.save();
    res.status(201).json(newTag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all tags
export const getTags = async (req, res) => {
  try {
    const tags = await Tag.find().sort({ createdAt: -1 });
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single tag by ID
export const getTagById = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) return res.status(404).json({ message: 'Tag not found' });
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a tag
export const updateTag = async (req, res) => {
  try {
    const { name } = req.body;
    const tag = await Tag.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true, runValidators: true }
    );
    if (!tag) return res.status(404).json({ message: 'Tag not found' });
    res.status(200).json(tag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a tag
export const deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) return res.status(404).json({ message: 'Tag not found' });
    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
