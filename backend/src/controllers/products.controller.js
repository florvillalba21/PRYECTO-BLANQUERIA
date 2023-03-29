const Product = require("../models/Product");
const path = require('path')
const cloudinary = require('cloudinary')

//Objeto que contendra cada funcion
ctrlProducts = {};

//configuracion del cloudinary
cloudinary.config({
  cloud_name:'dhkfu9w3i',
  api_key:'219851515994576',
  api_secret:'F8ciqQEd-u9C4bqQJqhI4ztomPg'
})

const fs = require('fs-extra')
//Funcion post para crear un nuevo producto y guardarlo en la bd




ctrlProducts.createProduct =  async (req, res) => {
  

  const { name, category, costPrice, sellPrice, stock } = req.body;
  const fileName = req.file
  console.log(req.file)

  const result = await cloudinary.v2.uploader.upload(req.file.path)

  imgURL = result.url 

  const newProduct = new Product({ name, category, costPrice, sellPrice, stock, imgURL });

  const productSaved = await newProduct.save();

    //borra el archivo ya que ha sido subido a la nube
  await fs.unlink(req.file.path)

  res.status(201).json(productSaved);
}


//Funcion para obtener la lista de todos los productos guardados
ctrlProducts.getProducts = async (req, res) => {
  const products = await Product.find();

  res.status(200).json(products);
};

//Funcion para obtener un producto en base al id
ctrlProducts.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

//Funcion para actualizar un producto en base al id
ctrlProducts.updateProductById = async (req, res) => {
  /*FindUpdate recibe el id, lo que se va a reemplazar del producto en este caso req.body 
  y new:true para que devuelva el producto nuevo y no el que se borra*/
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedProduct);
};

//Funcion para borrar un elemento en base al id
ctrlProducts.deleteProductById = async (req, res) => {
  const deleteProduct = await Product.findByIdAndDelete(req.params.productId);
  res.status(200).json(deleteProduct);
};

module.exports = ctrlProducts;
