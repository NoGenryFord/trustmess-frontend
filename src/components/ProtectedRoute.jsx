// src/components/ProtectedRoute.jsx
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import '/src/scss/_pages/_loading_page.scss';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  const handleReturn = () => {
    console.log('return to log in page');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className='loading_page' id='loadingPage'>
        <div className='loading_circle'>
          <div className='loading_text'>Loading...</div>
        </div>

        <button className='btn' onClick={handleReturn}>
          Return back
        </button>
      </div>
    );
  }
  if (!isAuthenticated) {
    console.log('You are not log in');
    return <Navigate to='/login' replace />;
  }

  return children;
};
