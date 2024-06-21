import mongoose from "mongoose";

interface Records {
    userId: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    payment: string;
}

const recordsSchema = new mongoose.Schema<Records>({
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    payment: { type: String, required: true },
});

const RecordsModel = mongoose.model<Records>("Records", recordsSchema);

export default RecordsModel;