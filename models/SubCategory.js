import mongoose from 'mongoose';

// Define the Category Schema
const SubCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate category names
    trim: true,
  },
  
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Allows categories to have subcategories (optional)
    default: null,
  },


  title:{
    type:String,
  },


  para:{
    type:String,
  },
 
  createdAt: {
    type: Date,
    default: Date.now,
  },



  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a Model for the Category
const SubCategory = mongoose.model('SubCategory', SubCategorySchema);

export default SubCategory;



