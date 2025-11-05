import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};

const connection: connectionObject = {};

async function dbConnection(): Promise<void> {
  if (connection.isConnected) {
    console.log("DB is already connected...");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    connection.isConnected = db.connections[0].readyState;
    console.log("Connected...");
  } catch (error) {
    console.log("Connection Failed.", error);
    process.exit(1); //exit from connection process
  }
}

export default dbConnection;
