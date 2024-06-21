import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";

interface Records {
    _id?: string;
    userId: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    payment: string;
}

interface RecordsContextType {
    records: Records[];
    addRecord: (record: Records) => void;
    // updateRecord: (_id: string, newRecord: Partial<Records>) => void;
    deleteRecord: (_id: string) => void;
}

export const RecordsContext = createContext<RecordsContextType | undefined>(undefined);

export const RecordsProvider = ({children} : {children:React.ReactNode;}) => {

    const [records, setRecords] = useState<Records[]>([]);

    const { user } = useUser();
    const fetchRecords = async () => {
        if (!user) return;
        const reponse = await fetch(`http://localhost:3001/records/getAll/${user.id}`);
        if (reponse.ok) {
            const records = await reponse.json();
            // console.log(records);
            setRecords(records);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, [user]);

    const addRecord = async (record: Records) => {
        const reponse = await fetch("http://localhost:3001/records", {
            method: "POST",
            body: JSON.stringify(record),
            headers: {
                "Content-Type": "application/json",
            },
        });
        try {
            if (reponse.ok) {
                const newRecord = await reponse.json();
                setRecords((prev) => [...prev, newRecord]);
            }
        } catch (err) {}
    };

    const deleteRecord = async (_id: string) => {
        const reponse = await fetch(`http://localhost:3001/records/${_id}`, {
            method: "DELETE",
        });
        try {
            if (reponse.ok) {
                const delRecord = await reponse.json();
                setRecords((prev) => prev.filter((record) => record._id !== delRecord._id));
            }
        } catch (err) {}
    };

    return <RecordsContext.Provider value={{records, addRecord, deleteRecord}}>
        {" "}
        {children}
    </RecordsContext.Provider>
};

export const useRecords = () => {
    const context = useContext<RecordsContextType | undefined>(
        RecordsContext
    );

    if (!context) {
        throw new Error(
            "useRecords must be within a RecordsProvider"
        );
    }
    return context;
};