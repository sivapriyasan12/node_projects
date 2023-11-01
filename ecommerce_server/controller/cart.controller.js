const db = require('../model'); // importing entire folder
const Cart = db.cart;
const Products = db.products;

exports.ListCart = (req, res) =>{
    // const title = res.query.title;
    Cart.find({})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while receiving Cart."
        });
    });
};

exports.addToCart = (req, res) => {
    console.log(req.body);
    if (!req.body.productId){
        res.send({"message": "Product id should not be empty."});
        return;
    }
    Products.findById(req.body.productId)
    .then(product_data => {
      console.log(product_data);
        const cartObj = new Cart(
            {
                ProductId:product_data.id,
                Quantity: 1,
                TotalPrice: product_data.price
            }
        )
        cartObj.save(cartObj)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({"message": "Cart not created."})
        });
    }).catch(err => {
        res.status(404).send({"message": "Product not found."})
    });
    
};

exports.updateCart = async (req, res) => {
    console.log(req.body)
    if (!req.body || !req.body.id || !req.body.quantity || !req.body.productId) {
        return res.status(400).send({
          message: "Insufficient body data to update action."
        });
      }
      console.log(req.body);

      // get product
      const product_data = await Products.findById(req.body.productId);
      console.log(product_data);
      if (!product_data){
        res.status(404).send({message: 'Product not found.'})
      }
      const id = req.body.id;
      // get cart
      const cart_obj = await Cart.findById(id);
      if (!cart_obj){
        res.status(404).send({message: 'Cart not found.'})
      }
      // check whether need update action or not
      if (cart_obj.Quantity != req.body.quantity){
        cart_obj.Quantity = req.body.quantity;
        cart_obj.TotalPrice = product_data.price * req.body.quantity;
        cart_obj.save(cart_obj)
        .then(data => {
            console.log(data);
            if (!data) {
              res.status(404).send({
                message: `Cannot update Cart with id=${id}. Maybe Cart was not found!`
              });
            } else res.send(cart_obj);
      })
    } else {
        res.send(cart_obj)
    }        
};

exports.deleteCartId = (req, res) => {
        const id = req.params.id;
      
        Cart.findByIdAndRemove(id, { useFindAndModify: false })
          .then(data => {
            if (!data) {
              res.status(404).send({
                message: `Cannot delete Cart with id=${id}. Maybe Cart was not found!`
              });
            } else {
              res.send({
                message: "Cart was deleted successfully!"
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Could not delete Cart with id=" + id
            });
          });
        };

exports.deleteAll = (req, res) => {
    Cart.deleteMany({})
    .then(data => {
        res.send({
        message: `${data.deletedCount} Cart were deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while removing all Products."
        });
    });
};
