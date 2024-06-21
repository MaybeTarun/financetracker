import { useEffect } from 'react';
import { useUser, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import bg from '../../assets/bg.svg';
import bg2 from '../../assets/bg2.svg';

export const Auth = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className='auth'>
      <img className='bg' src={bg} alt='Background' />
      <div className='container'>
        <img className='left' src={bg2}></img>
        <p className='lefttext'>Your<br/>Personal<br/>Finance<br/>Tracker</p>
        <SignedOut>
          <div className='btns'>
            <p>Create A new Account</p>
            <SignUpButton mode='modal' />
            <p>OR<br/>Login to an existing one</p>
            <SignInButton mode='modal' />
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
          <h1>Go to dashboard and stop tryna find bugs 🥲</h1>
        </SignedIn>
      </div>
    </div>
  );
};
