import {useUser, SignOutButton, SignedIn, UserButton} from '@clerk/clerk-react';
import './index.css';
import { AddRecord } from './addrecord';
import { Records } from './records';
import { useRecords } from '../../context/records-context';

export const Dashboard = () => {

    const {user} = useUser();
    const { records } = useRecords();

    const calculateTotal = () => {
        let total = 0;
        records.forEach(record => {
            total += record.amount;
        });
        return total.toLocaleString('en-IN', { maximumFractionDigits: 2 });
    };

    return (
        <div className="dashboard">
            <SignedIn>
                <div className='left'>
                    <h1>Hello, {user?.firstName}!</h1>
                    <div className='total'>
                        <span>Total:</span><br/>
                        <span>₹ {calculateTotal()}</span>
                    </div>
                    <Records/>
                </div>
                <div className='right'>
                    <div className='profile'>
                        <div className='profilename'>
                            <UserButton>
                                <button></button>
                            </UserButton>
                            <h1>{user?.fullName}</h1>
                        </div>
                        <div className='signoutbtn'>
                            <SignOutButton/>
                        </div>
                    </div>
                    <div className='addrecord'>
                    <AddRecord/>
                    </div>
                </div>
            </SignedIn>
        </div>
    );
}