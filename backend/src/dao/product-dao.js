const Product = require("../models/Product")



const getAllProducts = async()=>{
     try {
          let products = await Product.find();
          if (!products ) return {message :"aucun produit n'a été trouvé"}
          return products;
     } catch (error) {
          return {message:"error "+error.message}
     }

}
const getProductCategory = async(category)=>{
     try {
          if(!category) return {message:" erreur aucune categorie n'a été selectionnée"};
          const products = await Product.find({ category: req.params.id })
          .populate('category')
          .sort({ createdAt: -1 });
          if (!products ) return {message :"aucun produit n'a été trouvé"}
          return products;
          
     } catch (error) {
          return {message:"error "+error.message}

     }
}

module.exports={
     getAllProducts
}