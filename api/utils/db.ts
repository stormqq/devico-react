import mongoose, { ConnectOptions } from "mongoose";

export default {
  connectMongo: async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);
      console.log("MongoDB connected");
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
      throw err;
    }
  }
};