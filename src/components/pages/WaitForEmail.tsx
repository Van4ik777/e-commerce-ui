import React, { useState, useEffect } from 'react';
import { useAuth } from '@/store/auth.store';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PAGES } from '@/constants/PAGES';

export const WaitForEmail: React.FC = () => {
  const [isConfirmed, setIsConfirmed] = useState(false)
  const {checkEmail}= useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const userId = searchParams.get('userid')
    const hash = searchParams.get('hash')
    if (userId && hash) {
      try{
        checkEmail(userId,hash)
        setIsConfirmed(true)
      }catch(error){setError('wrong data try again alter')}
    }else {
      setError('Invalid URL parameters');
    }
 }, [searchParams, checkEmail])   
  
  useEffect(() => {
    if (isConfirmed) {
      navigate(PAGES.home)
    }
  }, [isConfirmed, navigate])
  
  return (
    <div>

      {isConfirmed ? (
        <div>Your email has been confirmed. Redirecting...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>Please check your email to confirm your account.</div>
      )}
    </div>
  );
};

