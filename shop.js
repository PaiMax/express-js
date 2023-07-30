const Product = require('../models/product');
const Cart=require('../models/cart');
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows,fieldData])=>{
    console.log(rows);
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
  })

  })
  .catch(err=>console.log(err));
    
   
};


exports.getproduct=(req,res,next)=>{
  const proId=req.params.productId;
  Product.findById(proId).then(([product])=>{
    res.render('shop/product-detail',{product:product[0] , pageTitle:product.title, path: '/products'})
  }

  ).catch(err=>console.log(err));


}


exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(([rows,fieldData])=>{
    console.log(rows);
    res.render('shop/index', {
      prods: rows, 
      pageTitle: 'Shop',
      path: '/'
    });

  })
  .catch(err=>console.log(err));
  
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
  .then(cart=>{
    return cart.getProducts()
    .then(products=>{
      res.render('shop/cart', {
      path: '/cart',
      products: products,
      pageTitle: 'Your Cart'
    });})
    .catch(err=>console.log(err));
  }) 
  .catch(err=> console.log(err));
  
  
  
};


exports.postcart=(req,res,next)=>{
  const prodId=req.body.productId;
  let fecthedCart;
  req.user.getCart()
  .then(cart=>{
      return cart.getProducts({where:{id:proId}});

  })
  .then(products =>{
    let product;
    if(products.length>0){
      product=products[0];
    }
    let newQuantity=1;
    if(product){
      const old=product.cartItem.quantity;
      newQuantity=old+1;
      return fetchedCart.addProduct(product,{through:{quantity:newQuantity}});
        
      }
      return Product.findById(prodId)
    .then(product =>{
      return fetchedCart.addProduct(product,{through:{quantity:newQuantity}});

    })
    .catch(err=>console.log(err));



    })
    

    
  
    .then(()=>{
    res.redirect('/cart');
  })
  .catch(err=>console.log(err));


}





exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.postCartDeleteProduct=(req,res,next)=>{
  const prodId=req.body.productId;
  req.user
  .getCart()
  .then(cart =>{
     return cart.getProducts({where:{id:prodId}});
  })
  .then(products =>{
    const product=products[0];
    product.cartItem.destroy();
  })
  .then(resulr=>{res.redirect('/cart');})
  .catch(err=>console.log(err)); 
}
