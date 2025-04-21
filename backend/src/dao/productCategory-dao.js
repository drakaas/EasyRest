const productCategories = require('../models/productCategories');



const categoryBySlug =async(slug)=>{
     try {
          console.log(slug)
          
          let category = await productCategories.findOne({ slug });
          let test = await productCategories.find();
          console.log(test);
          if (!category) {
               return { message: 'Category not found' };
          }
          return category
     } catch (error) {
          return {message :"erreur "+error};
     }
} 
const categoryById =async(identifier)=>{
     try {
          // Try to find by _id first
          let category = await productCategories.findOne({ _id: identifier });
          
          // If not found by _id, try by slug
          if (!category) {
               category = await productCategories.findOne({ slug: identifier });
          }
          
          if (!category) {
               return { message: 'Category not found' };
          }
          return category
     } catch (error) {
          return {message :"erreur "+error.message};
     }
} 

const allCategories = async()=>{
     try {
          const categories = await productCategories.find();
          if(!categories) return {message:"erreur aucun categorie n'a été trouvée"};
          return categories;
     } catch (error) {
          return {message:"erreeur "+error.message}
     }
}



const addCategory = async(name,slug,color,icon)=>{
     try {
          let newCategory = await productCategories.create({name,slug,color,icon});
          return newCategory;
     } catch (error) {
          return {message:"erreur "+error.message};
     }
}
const deleteCategory = async(identifier)=>{
     try {
          // Try to find by _id first
          let deletedCategory = await productCategories.findByIdAndDelete(identifier);
          
          // If not found by _id, try by slug
          if (!deletedCategory) {
               deletedCategory = await productCategories.findOneAndDelete({ slug: identifier });
          }
          
          if(!deletedCategory) return {message:"erreur aucune categorie n'a été trouvée"};
          return deletedCategory;
     } catch (error) {
          return {message:"erreur "+error.message};
     }
}
module.exports={
     categoryBySlug,
     categoryById,
     allCategories,
     addCategory,
     deleteCategory
}