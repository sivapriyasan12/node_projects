const { default: mongoose } = require("mongoose");

module.exports = mongoose => {
    let schema = mongoose.Schema(
        {
            ProductId:String,
            Quantity:Number,
            TotalPrice: Number
        }
    );
    
    schema.method('toJSON', function(){
        const {__v, _id, ...object} =  this.toObject();
        object.CartId = _id;
        return object;
    });
    const Cart = mongoose.model("cart", schema);
    return Cart;
    };

