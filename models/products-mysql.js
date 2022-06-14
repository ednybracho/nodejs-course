// const products = [];

// const fs = require('fs');
// const path = require('path');
// const pathDirName = require('../util/path');

const db = require('../util/db');

const Cart = require('../models/carts');

// const p = path.join(pathDirName, 'data', 'products.json');

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};
module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  save() {
    return db.execute(
      'INSERT INTO products (title, price, description, imageUrl) VALUES (?,?,?,?)',
      [this.title, this.price, this.description, this.imageUrl],
    );
  }
  //  save() {
  // products.push(this);
  //const p = path.join(pathDirName, 'data', 'products.json');
  // getProductsFromFile((products) => {
  //   if (this.id) {
  //     const existingProductIndex = products.findIndex(
  //       (prod) => prod.id === this.id,
  //     );
  //     const updatedProducts = [...products];
  //     updatedProducts[existingProductIndex] = this;
  //     fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
  //       console.log(err);
  //     });
  //   } else {
  //     this.id = Math.random().toString();
  //     products.push(this);
  //     fs.writeFile(p, JSON.stringify(products), (err) => {
  //       console.log(err);
  //     });
  //   }
  // });
  // }

  static deleteById(prodId) {}
  // static deleteById(prodId) {
  // // products.push(this);
  // //const p = path.join(pathDirName, 'data', 'products.json');
  // getProductsFromFile((products) => {
  //   if (prodId) {
  //     const product = products.find((prod) => (prod.id = prodId));
  //     const updatedProducts = products.filter((prod) => prod.id !== prodId);
  //     fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
  //       if (!err) {
  //         Cart.deleteProduct(prodId, product.price);
  //       }
  //     });
  //     // const existingProductIndex = products.findIndex(
  //     //   (prod) => prod.id === this.id,
  //     // );
  //     // const deletedProducts = [...products];
  //     // deletedProducts.splice(existingProductIndex, 1);
  //     // fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
  //     //   console.log(err);
  //     // });
  //   }
  // });
  // }

  // static fetchAll(cb) {
  //   getProductsFromFile(cb);
  //   // return products;
  // }
  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }
  // static findById(id, cb) {
  //   getProductsFromFile((products) => {
  //     const product = products.find((p) => p.id === id);
  //     cb(product);
  //   });
  // }
  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }
};
