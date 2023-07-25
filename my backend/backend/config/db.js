//Connection file to mongo db
import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://nanaliuchuang:k66zsv94lvGIHsbQ@mystore.imdgcej.mongodb.net/myproject?retryWrites=true&w=majority", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit();
  }
};

export default connectDB;
