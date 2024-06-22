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
    deleteRecord: (id: string) => void;
}

export const RecordsContext = createContext<RecordsContextType | undefined>(undefined);

export const RecordsProvider = ({children} : {children:React.ReactNode;}) => {

    const [records, setRecords] = useState<Records[]>([]);

    const { user } = useUser();
    const fetchRecords = async () => {
        if (!user) return;
        const response = await fetch(`http://localhost:3001/records/getAll/${user.id}`);
        if (response.ok) {
            const records = await response.json();
            // console.log(records);
            setRecords(records);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, [user]);

    const addRecord = async (record: Records) => {
        const response = await fetch("http://localhost:3001/records", {
            method: "POST",
            body: JSON.stringify(record),
            headers: {
                "Content-Type": "application/json",
            },
        });
        try {
            if (response.ok) {
                const newRecord = await response.json();
                setRecords((prev) => [...prev, newRecord]);
            }
        } catch (err) {}
    };

    const deleteRecord = async (id: string) => {
        const response = await fetch(`http://localhost:3001/records/${id}`, {
            method: "DELETE",
        });
        try {
            if (response.ok) {
                const deletedRecord = await response.json();
                setRecords((prev) => prev.filter((record) => record._id !== deletedRecord._id));
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