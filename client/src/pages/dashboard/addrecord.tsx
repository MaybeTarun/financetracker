import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import './addrecord.css';
import { useRecords } from '../../context/records-context';

export const AddRecord = () => {
    const [description, setDescription] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [payment, setPayment] = useState<string>("");
    const { addRecord } = useRecords();
    const { user } = useUser();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>, isIncome: boolean) => {
        event.preventDefault();

        const parsedAmount = parseFloat(amount) * (isIncome ? 1 : -1);

        const newRecord = {
            userId: user?.id ?? "",
            date: new Date(),
            description: description,
            amount: parsedAmount,
            category: category,
            payment: payment
        };

        addRecord(newRecord);

        setDescription("");
        setAmount("");
        setCategory("");
        setPayment("");
    };

    const handleAddIncome = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        handleSubmit(event as any, true);
    };

    return (
        <div className="form-container">
            <form onSubmit={(e) => handleSubmit(e, false)}>
                <div className="form-field">
                    <label>Description:</label>
                    <input
                        type="text"
                        required
                        className="input"
                        maxLength={25}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-field">
                    <label>Amount:</label>
                    <input
                        type="number"
                        required
                        className="input"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className="form-field">
                    <label>Category:</label>
                    <select
                        required
                        className="input"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select a Category</option>
                        <option value="Food & Dining">Food & Dining</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Travel">Travelling</option>
                        <option value="Bills & Utilities">Bills & Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Medical">Medical</option>
                        <option value="Education">Education</option>
                        <option value="Salary">Salary</option>
                        <option value="Payback">Payback</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-field">
                    <label>Payment Method:</label>
                    <select
                        required
                        className="input"
                        value={payment}
                        onChange={(e) => setPayment(e.target.value)}
                    >
                        <option value="">Select a Payment Method</option>
                        <option value="Bank Account">Bank Account</option>
                        <option value="Cash">Cash</option>
                    </select>
                </div>
                <div className='buttons'>
                    <button type="submit" className="button">
                        Add Expense
                    </button>
                    <button type="button" className="button" onClick={handleAddIncome}>
                        Add Income
                    </button>
                </div>
            </form>
        </div>
    );
};
