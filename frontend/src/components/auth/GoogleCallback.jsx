import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleCallback = () => {
  const history = useNavigate();

  useEffect(() => {
    // Function to handle the Google callback
    const googleAuthCallback = async () => {
      try {
        // You may use fetch or axios to hit the backend
        const response = await fetch('http://localhost:5000/auth/google/callback', {
          method: 'GET', // Make sure your backend accepts this request
        });

        const data = await response.json();

        if (data.success) {
          const token = data.token; // Get the JWT token from the response
          localStorage.setItem('authToken', token); // Store it in localStorage

          // Optionally, you can redirect the user to a protected page (e.g., dashboard)
          history('/'); // Example route after login
        } else {
          console.error('Google login failed:', data.message);
        }
      } catch (error) {
        console.error('Error handling Google authentication:', error);
      }
    };

    googleAuthCallback();
  }, [history]);

  return (
    <div>
      <h2>Processing Google Authentication...</h2>
    </div>
  );
};

export default GoogleCallback;
