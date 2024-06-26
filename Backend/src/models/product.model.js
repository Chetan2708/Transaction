import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  sold: { type: Boolean, required: true },
  image: { type: String, required: true },
  dateOfSale: { type: Date, required: true },
});

const Product = mongoose.model('Product', productSchema);


export default Product