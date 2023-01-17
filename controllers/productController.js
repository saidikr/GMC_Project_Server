const Product = require("../models/Product");
const cloudinary = require("../utils/cloudinary");





// get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({"createAt":-1});
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
};


// get products by id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      res.status(404).send("Product not found");
    }
    res.status(200).send(product);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
};


// insert product
exports.addOneProduct = async (req, res) => {
  try {
    // const url = req.protocol + "://" + req.get("host"); // http://localhost:4000
    //save image in cloudinary
    // console.log(req.file.path);
    const result = await cloudinary.uploader.upload(req.file.path);
    const product = new Product({
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      // image: url + "/uploads/" + req.file.filename, // full image link http://localhost:4000/uplaods/imagename.ext
      image: result.secure_url,
      cloudinary_id: result.public_id,
      rating: req.body.rating,
      quantity: req.body.quantity,
      createAt:Date.now(),
    });
    // saving our new created instances
    const savedProduct = await product.save();
    res.status(201).send(savedProduct);
  } catch (err) {
    res.status(500).send(err);
  }
};


// update product
exports.updateOneProduct = async (req, res) => {
  try {
    if (req.file) {
      // const url = req.protocol + "://" + req.get("host");
      let p = await Product.findOne({ _id: req.params.id });
      if(p.cloudinary_id){
        await cloudinary.uploader.destroy(p.cloudinary_id);
      }
      const result = await cloudinary.uploader.upload(req.file.path);
      let product = await Product.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: req.body.title,
          price: req.body.price,
          description: req.body.description,
          category: req.body.category,
          image: result.secure_url,
          cloudinary_id: result.public_id,
          rating: req.body.rating,
          quantity: req.body.quantity,
        },
        {
          new: true,
          useFindAndModify: false,
        }
      );
      res.status(200).json({ message: "product updated", data: product });
    } else {
      let product = await Product.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: req.body.title,
          price: req.body.price,
          description: req.body.description,
          category: req.body.category,
          rating: req.body.rating,
          quantity: req.body.quantity,
        },
        {
          new: true,
          useFindAndModify: false,
        }
      );
      res.status(200).json({ message: "product updated", data: product });
    }
  } catch (err) {
    res.status(err.status).send(err.message);
  }
};




// delete product

exports.deleteOneProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });

    if (!product) {
      res.status(404).send("product not found");
    }
    //delete the product image from disl
    
    // let imgName = product.image.split("/")[4];
    // deleteProductImageFromDisk(imgName);
    await cloudinary.uploader.destroy(post.cloudinary_id)
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).send("product deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
};


// count of products by category
exports.countProductByCategory= async (req,res)=>{
  try{
    const menClothingcount= await Product.find({category:"men's clothing"}).count();
    const womenClothingcount= await Product.find({category:"women's clothing"}).count();
    const jewelerycount= await Product.find({category:"jewelery"}).count();
    const electronicscount= await Product.find({category:"electronics"}).count();

    const productsCount=[menClothingcount,womenClothingcount,jewelerycount,electronicscount];
    res.status(200).send(productsCount);

  }catch (err) {
    res.status(500).send(err.message);
  }
}



//men's clothing
exports.mensProductByCategory= async (req,res)=>{
  try{
    const menClothing= await Product.find({category:"men's clothing"});
    res.status(200).send(menClothing);

  }catch (err) {
    res.status(500).send(err.message);
  }
}


//women's clothing
exports.womensProductByCategory= async (req,res)=>{
  try{
    const womenClothing= await Product.find({category:"women's clothing"});
    res.status(200).send(womenClothing);

  }catch (err) {
    res.status(500).send(err.message);
  }
}

//electronics
exports.electronicsProductByCategory= async (req,res)=>{
  try{

    const electronics= await Product.find({category:"electronics"});
    res.status(200).send(electronics);

  }catch (err) {
    res.status(500).send(err.message);
  }
}

//jewelery
exports.jeweleryProductByCategory= async (req,res)=>{
  try{

    const jewelery= await Product.find({category:"jewelery"});
    res.status(200).send(jewelery);

  }catch (err) {
    res.status(500).send(err.message);
  }
}


//men's clothing
exports.totalPrizesByCategory= async (req,res)=>{
  try{
    const TotalpricesByCategory= await Product.aggregate([{$match:{}},{$group:{_id:"$category",total:{$sum:"$quantity"}}}]);
    res.status(200).send(TotalpricesByCategory);

  }catch (err) {
    res.status(500).send(err.message);
  }
}