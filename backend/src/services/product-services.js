const {getAllProducts,getProductCategory}=require("../dao/product-dao");
const {categoryBySlug,categoryById,allCategories,addCategory,deleteCategory}=require("../dao/productCategory-dao");
const { getAllSupplements, getSupplementsByType } = require('../dao/supplement-dao');
const ProductByCategorySlug= async(req,res)=>{
     try {
          const slug = req.params.slug;
          console.log(slug)
          if (!slug) return res.status(400).send({ message: "Slug is required" });
          let categorie = await categoryBySlug(slug);
          if(categorie.message) return res.status(500).send(categorie.message);
          let products=await  getProductCategory(slug );
          if(products.message) return res.status(500).send(products.message);
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

const GetAllCategories = async(req,res)=>{
     try {
          const categories = await allCategories()
          if(categories.message!=null) return res.status(500).send(res.message);
          return res.status(200).send(categories);
     } catch (error) {
          return res.status(500).send({message:"erreur "+ error})

     }
}
const GetAllProducts = async(req,res)=>{
     try {
          const products = await getAllProducts();
          if(products.message!=null) return res.status(500).send({message:"erreur "+products.error});
          return res.status(200).send(products);
     } catch (error) {
          return res.status(500).send({message:"erreur "+error});
     }
}


const AddCategory = async(req,res)=>{
     try {
          const {name,slug,color,icon}=req.body;
          if(!name || !slug || !color || !icon) return res.status(400).send({message:"erreur les champs sont obligatoires"});
          let categorie = await categoryBySlug(slug);
          if(!categorie.message) return res.status(500).send({message:"la categorie existe déjà"});
          let newCategory = await addCategory(name,slug,color,icon);
          return res.status(200).send(newCategory);
     } catch (error) {
          return res.status(500).send({message:"erreur "+error});
     }
}
const DeleteCategory = async(req,res)=>{
     try {
          const slug = req.params.slug;
          let deletedCategory = await deleteCategory(slug);
          return res.status(200).send(deletedCategory);
     } catch (error) {
          return res.status(500).send({message:"erreur "+error});
     }
}

const GetAllSupplements = async (req, res) => {
  try {
    const supplements = await getAllSupplements();
    if (supplements.message != null) return res.status(500).send({ message: "erreur " + supplements.message });
    return res.status(200).send(supplements);
  } catch (error) {
    return res.status(500).send({ message: "erreur " + error });
  }
};

const GetSupplementsByType = async (req, res) => {
  try {
    const { type } = req.params;
    if (!type) return res.status(400).send({ message: "Type is required" });
    const allowedTypes = ['supplement', 'boisson', 'accompagnement', 'extra'];
    if (!allowedTypes.includes(type)) return res.status(400).send({ message: "Invalid supplement type" });
    const supplements = await getSupplementsByType(type);
    if (supplements.message != null) return res.status(500).send({ message: "erreur " + supplements.message });
    return res.status(200).send(supplements);
  } catch (error) {
    return res.status(500).send({ message: "erreur " + error });
  }
};

module.exports = {
     ProductByCategoryId,
     ProductByCategorySlug,GetAllCategories,
     GetAllProducts,
     AddCategory,
     DeleteCategory,
     GetAllSupplements,
     GetSupplementsByType
}