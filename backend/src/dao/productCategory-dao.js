const ProductCategory = require('../models/productCategories');



const categoryBySlug =async(slug)=>{
     try {
          
          let category = await ProductCategory.findOne({ slug });
          
          if (!category) {
               return { message: 'Category not found' };
          }
          return category
     } catch (error) {
          return {message :"erreur "+error};
     }
} 
const categoryById =async(id)=>{
     try {
          
          let category = await ProductCategory.findOne({ category:id });
          
          if (!category) {
               return { message: 'Category not found' };
          }
          return category
     } catch (error) {
          return {message :"erreur "+error};
     }
} 





module.exports={
     categoryBySlug,
     categoryById
}