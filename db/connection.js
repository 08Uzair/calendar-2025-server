import mongoose from "mongoose";

const URI =
  "mongodb+srv://calendarDB:calendarDB@cluster0.uyauhrd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const dataBaseConnection = async () => {
  try {
    await mongoose.connect(URI);
    console.log("DATABASE IS CONNECTED");
  } catch {
    console.log(error);
  }
};
