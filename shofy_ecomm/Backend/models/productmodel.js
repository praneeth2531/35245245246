const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    image: { type: String, default: "default_image.jpg" }
});

// Indexing example (optional)
ProductSchema.index({ name: 1, category: 1 });

const ProductModel = mongoose.model("products", ProductSchema);

module.exports = ProductModel;
