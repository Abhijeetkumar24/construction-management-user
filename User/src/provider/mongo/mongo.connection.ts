
import mongoose, { ConnectOptions, Connection, createConnection } from "mongoose";
require('dotenv').config();

class MongoConnection {

  private connect!: Connection;

  constructor() {
    this.initiateMongoConnection();
  }

  initiateMongoConnection() {
    if (!this.connect) {
      const options: ConnectOptions = {};
      this.connect = createConnection(this.getConnectionUri(), options);                     // options object is used to customize the behavior of your MongoDB connection as needed
      this.registerConnectionEvent();
      mongoose.set('debug', true);
    }
  }

  getConnectionUri() {
    // console.log(process.env.MONGO_UR);
    return process.env.MONGO_URL;
    // return 'mongodb+srv://Abhijeet:abhijeet@cluster0.dh4tila.mongodb.net/const_user_db';
  }

  registerConnectionEvent() {
    // this.connect.on('error', console.error.bind(console, 'MongoDb connection error: '));
    this.connect.on('error', () => {
      console.log('error in mongo')
    })
    this.connect.once('open', () => {
      console.log('MongoDB connected successfully!,\nconnected to ', this.getConnectionUri());
    })
  }

  getConnection(): Connection {
    return this.connect;
  }

}

export const mongoConnection = new MongoConnection();