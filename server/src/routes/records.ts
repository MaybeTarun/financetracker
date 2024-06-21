import express, {Request, Response} from "express";
import RecordsModel from "../schema/records";

const router = express.Router();

router.get("/getAll/:userId", async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const records = await RecordsModel.find({userId: userId});
        if (records.length < 0) {
            return res.status(404).send("No Records Found");
        }
        res.status(200).send(records);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const newRecordBody = req.body;
        const newRecord = new RecordsModel(newRecordBody);
        const savedRecord = await newRecord.save();

        res.status(200).send(savedRecord);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const newRecordBody = req.body;
        const record = await RecordsModel.findByIdAndUpdate(
            id, 
            newRecordBody,
            {new: true}
        );

        if (!record) return res.status(404).send();

        res.status(200).send(record);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const record = await RecordsModel.findById(id);

        if (!record) return res.status(404).send();

        res.status(200).send(record);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;