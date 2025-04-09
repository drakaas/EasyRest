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
const categoryById =async(id)=>{
     try {
          
          let category = await productCategories.findOne({ category:id });
          
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