const Cart = require('../models/carts');
const Product = require('../models/products');

// exports.getProducts = (req, res, next) => {
//   //const products = adminData.products;
//   Product.fetchAll((products) => {
//     res.render('shop/product-list', {
//       prods: products,
//       pageTitle: 'All Products',
//       path: '/products',
//       // hasProducts: products.length > 0,
//       // activeShop: true,
//       // productCSS: true,
//     });
//   });
//   //console.log(products);
// };

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/product-list', {
        prods: rows,
        pageTitle: 'All Products',
        path: '/products',
      });
    })
    .catch((err) => console.log(err));
};
// exports.getIndex = (req, res, next) => {
//   //const products = adminData.products;
//   Product.fetchAll((products) => {
//     res.render('shop/index', {
//       prods: products,
//       pageTitle: 'Shop',
//       path: '/',
//       // hasProducts: products.length > 0,
//       // activeShop: true,
//       // productCSS: true,
//     });
//   });
//   //console.log(products);
// };
exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      //console.log(rows);
      res.render('shop/index', {
        prods: rows,
        pageTitle: 'Shop',
        path: '/',
      });
    })
    .catch((err) => console.log(err));
};

exports.getCarts = (req, res, next) => {
  Cart.getProducts((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (let product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id,
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      console.log(cartProducts);
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        prods: cartProducts,
      });
    });
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Orders',
  });
};

// exports.getProduct = (req, res, next) => {
//   const prodId = req.params.productId;
//   console.log(prodId);
//   Product.findById(prodId, (product) => {
//     console.log(product);
//     res.render('shop/product-detail', {
//       product: product,
//       pageTitle: 'Product Details',
//       path: '/products',
//     });
//   });
// };
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  //console.log(prodId);
  Product.findById(prodId)
    .then(([product]) => {
      res.render('shop/product-detail', {
        product: product[0],
        pageTitle: product[0].title,
        path: '/products',
      });
    })
    .catch((err) => console.log(err));
};

exports.postCarts = (req, res, next) => {
  const prodId = req.body.productId;
  //console.log(prodId);
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.postCartsDeleteItems = (req, res, next) => {
  const prodId = req.body.productId;
  const product = Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};
