'use client';

import './auth.css';
import { useState } from 'react';
import { auth, googleProvider } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (authFunction) => {
    setError('');
    setIsLoading(true);
    try {
      await authFunction();
    } catch (err) {
      setError(err.message.replace('Firebase: ', '').replace(/\(auth.*\)/, ''));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo-container">
          <img src="/logo.png" alt="AP Ace Logo" className="auth-logo" />
        </div>
        
        <h2 className="auth-title">{isLogin ? 'Welcome to AP Ace!' : 'Join AP Ace!'}</h2>
        <p className="auth-subtitle">{isLogin ? 'Sign in to access your dashboard' : 'Create an account to get started'}</p>
        
        {error && (
          <div className="error-container">
            <p className="error">{error}</p>
          </div>
        )}

        <div className="input-group">
          <div className="input-icon">
            <MdEmail />
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="input-group">
          <div className="input-icon">
            <RiLockPasswordLine />
          </div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {isLogin && (
          <p className="forgot-password">
            Forgot password?
          </p>
        )}

        <button
          className="primary-btn"
          onClick={() => handleAuth(() =>
            isLogin
              ? signInWithEmailAndPassword(auth, email, password)
              : createUserWithEmailAndPassword(auth, email, password)
          )}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
        </button>

        <div className="divider">
          <span>or</span>
        </div>

        <button 
          className="google-btn"
          onClick={() => handleAuth(() => signInWithPopup(auth, googleProvider))}
          disabled={isLoading}
        >
          <FcGoogle className="google-icon" />
          <span>Continue with Google</span>
        </button>

        <p className="toggle-auth" onClick={() => !isLoading && setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span>{isLogin ? "Sign up" : "Sign in"}</span>
        </p>
      </div>
    </div>
  );
}