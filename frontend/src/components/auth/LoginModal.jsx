import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function LoginModal() {
  const { showLoginModal, setShowLoginModal, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
  
    try {
      const response = await fetch('http://localhost:5000/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        // You can adjust this depending on your backend error format
        setError(data.message|| 'Invalid credentials');
      }else{
        console.log(data)
    
        // Save the user data from your backend (you can adjust based on actual response)
        login({
          userData: data.user.userData , // or whatever your backend returns
          token: data.user.token, // assuming token is returned,
          rememberMe
        });

      }
  

    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!showLoginModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
     
      <div 
        className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 relative">
          <div className="text-center mb-8">
            <div className="text-3xl font-bold tracking-wide relative group overflow-hidden mb-2">
              <span className="bg-primary-500 text-white px-3 py-2 mr-2 rounded-md transform rotate-2 inline-block relative z-10 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-lg">Taste</span>
              <span className="italic relative z-10 transition-transform duration-500 group-hover:skew-x-6 font-serif">Fusion</span>
            </div>
            <p className="text-gray-500">Sign in to continue to your account</p>
          </div>
          <button
  type="button"
  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-xl focus:outline-none"
  onClick={() => setShowLoginModal(false)}
  aria-label="Close"
>
  &times;
</button>
          <div className="space-y-6">
            <button 
              className="w-full flex items-center justify-center py-3 px-4 bg-white border-2 border-gray-200 rounded-full shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 group mb-4"
              disabled={isLoading}
            >
              <span className="mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
              </span>
              <span className="text-gray-800 font-medium">Continue with Google</span>
              <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="material-symbols-outlined text-gray-500 transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </span>
            </button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with email</span>
              </div>
            </div>
            
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-all duration-300 bg-gray-50 group-hover:bg-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
                <span className="absolute right-3 top-3 text-gray-400 group-hover:text-primary-500 transition-colors duration-300">
                  <span className="material-symbols-outlined">mail</span>
                </span>
              </div>
              
              <div className="relative group">
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-all duration-300 bg-gray-50 group-hover:bg-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
                <span className="absolute right-3 top-3 text-gray-400 group-hover:text-primary-500 transition-colors duration-300 cursor-pointer">
                  <span className="material-symbols-outlined">visibility</span>
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input 
                    id="remember-me" 
                    type="checkbox" 
                    className="h-4 w-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={isLoading}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">Remember me</label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-primary-500 hover:text-primary-600 transition-colors">Forgot password?</a>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="w-full py-3 px-4 bg-primary-500 text-black rounded-lg font-medium shadow-md hover:bg-primary-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isLoading}

              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="material-symbols-outlined animate-spin mr-2">refresh</span>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account? 
                <a href="#" className="font-medium text-primary-500 hover:text-primary-600 ml-1 transition-colors">Sign up</a>
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 py-4 px-8 border-t border-gray-100">
          <p className="text-xs text-center text-gray-500">
            By signing in, you agree to our 
            <a href="#" className="text-primary-500 hover:underline mx-1">Terms of Service</a>
            and
            <a href="#" className="text-primary-500 hover:underline mx-1">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}