import express, { Express}  from "express";
import { userContext, authContext, portNumber } from "./constants/constants";
import { mongoConnection } from "./provider/mongo/mongo.connection";
import { authRouter, userRouter } from "./routers/router";
require('dotenv').config();


class App{
    private app!: Express;                               // ! is used to indicate that a property will be initialized later               
    private port!: string;
    private authContext!: string;
    private userContext!: string;
    
    constructor(){
        this.startApp();
    }

    startApp() {
        this.app = express();
        this.configureAppSettings();
        mongoConnection.initiateMongoConnection;
        this.loadContext()
        this.loadRouter();
        this.initServer();
    }

    configureAppSettings(){
        this.app.use(express.json());
        this.port = portNumber;
    }

    loadContext(){
        this.authContext = authContext;
        this.userContext = userContext
    }

    loadRouter(){
        this.app.use(this.authContext, authRouter.authrouter());
        this.app.use(this.userContext, userRouter.userRouter());
        // this.app.use(this.userContext, adminRouter.workerRouter());

    }
 
    initServer(){
        this.app.listen(this.port, () => {
            console.log(`Server is running on port: ${this.port}`);
        })
    }

}(async () => {                                           // Immediately Invoked Function Expression
    new App();
  })();