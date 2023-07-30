const Product = require('../models/product');
exports.getAddProduct=(req,res,next)=>{
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path :'/admin/add-product',
    editing:false
  });
};


exports.getEditProduct = (req, res, next) => {
  console.log('in edit product');
 const editMode=req.query.edit;
 if(!editMode){
  return res.redirect('/');
 }
 const proId=req.params.productId;
  req.user.getProducts({where :{id: proId}})
  .then(products => {if(!product){
    const product=products[0];
    return res.redirect('/');
  }
  console.log(product.price);
  res.render('admin/edit-product', {
    pageTitle: 'edit Product',
    path: '/admin/edit-product',
    editing: editMode,
    product: product
  });})

};




exports.deleteProduct=(req,res,next)=>{
  
  
  Product.deleteproductbyID(req.params.productId).then(()=>console.log('DELETED SUCCESSFULLY')).catch(err=>console.log(err));
  console.log(req.params);
}



exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user.createProduct({ title:title,
    price:price,
    imageUrl:imageUrl,
    description: description})

  .then(result =>{console.log(result)})
  .catch(err=>console.log(err))
 
};

exports.getProducts = (req, res, next) => {
  req.user.getProducts() 
  .then(products=>{res.render('admin/products', {
    prods: products,
    pageTitle: 'Admin Products',
    path: '/admin/products'
  })})
};
