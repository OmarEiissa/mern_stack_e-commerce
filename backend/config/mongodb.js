import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("DB Connected");
  });

  await mongoose.connect(`${process.env.MONGODB_URL}/e_commerce-forever`);
};

export default connectDB;
