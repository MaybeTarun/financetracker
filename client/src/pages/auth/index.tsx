import { useEffect } from 'react';
import { useUser, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import './index.css';

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
      <SignedOut>
        <SignUpButton mode='modal' />
        <SignInButton mode='modal' />
      </SignedOut>
      <SignedIn>
        <UserButton />
            <h1>Go to dashboard and stop tryna find bugs 🥲</h1>
      </SignedIn>
    </div>
  );
};
