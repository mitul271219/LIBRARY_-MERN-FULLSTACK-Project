import express from 'express'
import cors from 'cors'
import userRouter from './Router/UserRouter.js'
import ConnectDB from './DB.js'

const app = express()
app.use(express.json())
app.use(cors({
    origin: '*', // OR restrict to your frontend: 'http://192.168.179.38:3000'
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"] 
}))

    // app.get("/", (req, res) => {
    //     res.send("Home Page For (LIBRARY_BACKEND_MERN)");
    // });
    // app.get("/about", (req, res) => {
    //     res.json("Home Page For (About)");
    // });

    app.get("/", (req, res) => {
        res.send("Library Backend Running Successfully");
      });

    app.use('/upload_Image_Products_&_Category', express.static('uploadsProducts&CategoryData'));

    app.use("/" , userRouter)

const Ports = 3011;
ConnectDB().then(() => {
    app.listen(Ports , () => {
        console.log(`Server is running this Ports:${Ports}`);
    })
})