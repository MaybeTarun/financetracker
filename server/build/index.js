"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const records_1 = __importDefault(require("./routes/records"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const mongoURI = "mongodb+srv://maybetarun:Tarun2003@cluster0.wvlboyv.mongodb.net/";
mongoose_1.default
    .connect(mongoURI)
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.error("Failed DB connection", err));
app.use("/records", records_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
