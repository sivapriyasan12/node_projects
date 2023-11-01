const { default: mongoose } = require("mongoose");

module.exports = mongoose => {
    let schema = mongoose.Schema(
        {
            title: String,
            description:String,
            price:Number,
            model: String
        }
    );
    schema.method('toJSON', function(){
        const {__v, _id, ...object} =  this.toObject();
        object.id = _id;
        return object;
    });
    const Product = mongoose.model("products", schema);
    return Product;
    };

