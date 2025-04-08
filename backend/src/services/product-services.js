const {getAllProducts,getProductCategory}=require("../dao/product-dao");
const {categoryBySlug,categoryById}=require("../dao/productCategory-dao");
const ProductByCategorySlug= async(req,res)=>{
     try {
          const slug = req.params.slug;
          console.log(slug)
          if (!slug) return res.status(404).send({message:"erreur categorie introuvable"});
          let categorie = await categoryBySlug(slug);
          if(categorie.message) return res.status(500).send(categorie.message);
          let products=await  getProductCategory(categorie._id );
          if(products.message) return res.status(500).send(categorie.message);
          return res.status(200).send(products);
     } catch (error) {
          return res.status(500).send({message:"erreur "+ error})
     }
}
const ProductByCategoryId= async(req,res)=>{
     try {
          const id = req.body.id;
          if (!id) return res.status(404).send({message:"erreur id introuvable"});
 

          let products=await  getProductCategory(id);
          if(products.message) return res.status(500).send(categorie.message);
          return res.status(200).send(products);
     } catch (error) {
          return res.status(500).send({message:"erreur "+ error})
     }
}

module.exports = {
     ProductByCategoryId,
     ProductByCategorySlug
}