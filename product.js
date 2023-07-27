const db=require('../util/database'); 




const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute('INSERT INTO products (Title,Price,description,imageUrl) VALUES(?,?,?,?)',[this.title,this.price,this.description,this.imageUrl]);
    
   
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
    
  }
  static findById(id){
    return db.execute('SELECT * FROM products WHERE products.id=?',[id]);
    
  }
  static deleteproductbyID(id){
    return db.execute('DELETE FROM products WHERE prodcts.id=?',[id]);
   
   }
};

