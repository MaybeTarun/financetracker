import express, {Express} from "express";
import mongoose from "mongoose";
import router from "./routes/records";
import cors from "cors";

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const mongoURI: string = "mongodb+srv://maybetarun:Tarun2003@cluster0.wvlboyv.mongodb.net/";

mongoose
    .connect(mongoURI)
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.error("Failed DB connection", err));

app.use("/records", router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})