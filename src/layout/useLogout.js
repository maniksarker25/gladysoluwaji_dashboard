import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { api } from '../RTK/api';
import toast from '../utils/toast';

// Clears the session and cached API data, then returns to the login page.
const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useCallback(() => {
    localStorage.removeItem('authToken');
    dispatch(api.util.resetApiState());
    toast.success('Logged out successfully!');
    navigate('/login', { replace: true });
  }, [dispatch, navigate]);
};

export default useLogout;
