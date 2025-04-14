import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'

const AuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    // Parse the URL parameters
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const id = params.get('id');
    const email = params.get('email');
    console.log(id+" "+email)
    if (token && id&&email) {
      try {
        // Decode and parse the user data
        
        // Call the login function from your context
        // The true parameter is for rememberMe (set to true for OAuth logins)
        login({id,email}, token, true);
        
        // Redirect to the dashboard or home page
        navigate('/');
      } catch (error) {
        console.error('Failed to parse user data:', error);
        navigate('/login', { state: { error: 'Authentication failed' } });
      }
    } else {
      // Handle authentication error
      navigate('/login', { state: { error: 'Authentication failed: Missing token or user data' } });
    }
  }, [location, navigate, login]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Completing authentication...</h2>
        <p>Please wait while we log you in.</p>
      </div>
    </div>
  );
};

export default AuthSuccess;