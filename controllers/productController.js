import productModel from "../models/product.js";
const showProduct = async (req, res) => {
  const products = await productModel.find();
  res.render("showproducts", { products });
};

const insertProduct=  async (req, res) => {
  await productModel.insertOne(req.body);
  res.redirect("adminHome");
};
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  await productModel.findByIdAndDelete(id);
  res.redirect("/showproducts");
};

const editProduct = async(req, res) => {
  const productId = req.params.id
let product = await productModel.findById(productId)


  res.render("editproduct",{product:product});
};

const updateProduct = async(req,res)=>{
  const productId = req.params.id
  await productModel.findByIdAndUpdate(productId,{
    name: req.body.name,
    price:req.body.price,
    category:req.body.category,
    price:req.body.price,
    description:req.body.description
  })
  res.redirect('/showproducts')
}; 

export{showProduct,insertProduct,deleteProduct,editProduct,updateProduct}