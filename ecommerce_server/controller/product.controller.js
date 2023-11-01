const db = require('../model'); // importing entire folder
const Products = db.products;


exports.showAll = (req, res) =>{
    // const title = res.query.title;
    Products.find({})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while receiving products."
        });
    });
};

exports.getProduct = (req, res) => {
    if (!req.params.productId){
        res.send({"message": "ProductId should not be empty"});
        return;
    }
    var productId = req.params.productId;
    console.log(productId);
    Products.findById(productId)
    .then(product_data => {
      console.log(product_data);
        res.send(product_data);
    }).catch(err => {
        res.status(500).send({"message": "Product not found."})
    });
};

exports.create = (req, res) => {
    console.log(req.body);
    if (!req.body.title){
        res.send({"message": "Title should not be empty"});
        return;
    }
    
    const productObj = new Products({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        model: req.body.model
    })
    productObj.save(productObj)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({"message": "Record not created."})
    });
};

// Update a Products by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    console.log(req.body);
    const id = req.params.id;
    console.log(req.params);
    Products.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Products with id=${id}. Maybe Products was not found!`
          });
        } else res.send({ message: "Products was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Products with id=" + id
        });
      });
  };
  
  // Delete a Products with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Products.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Products with id=${id}. Maybe Products was not found!`
          });
        } else {
          res.send({
            message: "Products was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Products with id=" + id
        });
      });
  };
  
  // Delete all Products from the database.
  exports.deleteAll = (req, res) => {
    Products.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Products were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Products."
        });
      });
  };