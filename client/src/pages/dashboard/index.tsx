import { useEffect } from 'react';
import { useUser, SignOutButton, SignedIn, UserButton, SignedOut } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { AddRecord } from './addrecord';
import { Records } from './records';
import { useRecords } from '../../context/records-context';
import login from '../../assets/login.png';

export const Dashboard = () => {
  const { user } = useUser();
  const { records } = useRecords();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const calculateTotalSpent = () => {
    let totalSpent = 0;
    records.forEach(record => {
      if (record.amount < 0) {
        totalSpent += record.amount;
      }
    });
    return (totalSpent * -1).toLocaleString('en-IN', { maximumFractionDigits: 2 });
  };

  const calculateTotalEarned = () => {
    let totalEarned = 0;
    records.forEach(record => {
      if (record.amount >= 0) {
        totalEarned += record.amount;
      }
    });
    return totalEarned.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  };

  return (
    <div className="dashboard">
      <SignedOut>
        <h1>Go login and stop tryna find bugs 🥲</h1>
      </SignedOut>
      <SignedIn>
        <div className='left'>
          <h1>Hello, {user?.firstName}!</h1>
          <div className='total'>
            <div className='spent'>
              <span>Total Spent:</span><br />
              <span>₹ {calculateTotalSpent()}</span>
            </div>
            <div className='earned'>
              <span>Total Earned:</span><br />
              <span>₹ {calculateTotalEarned()}</span>
            </div>
          </div>
          <Records />
        </div>
        <div className='right'>
          <div className='profile'>
            <div className='profilename'>
              <UserButton showName>
                <button></button>
              </UserButton>
            </div>
            <div className='signoutbtn'>
              <SignOutButton />
            </div>
          </div>
          <div className='addrecord'>
            <AddRecord />
          </div>
        </div>
      </SignedIn>
    </div>
  );
};
