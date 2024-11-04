import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database Connected Successfully ${connect.connection.name}`);
  } catch (error) {
    console.log(`Connection field ${error.message}`);

    process.exit(1);
  }
};
