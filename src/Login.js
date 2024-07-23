import React from 'react';
import { auth, provider } from './firebase';
import { signInWithPopup } from 'firebase/auth';

const Login = ({ setUser }) => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
      <h1 className="text-3xl font-bold text-white mb-6">Welcome to timeboxing</h1>
      <p className="text-gray-400 mb-4">Sign in to continue</p>
      <button
        onClick={signInWithGoogle}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
      >
        Sign in with Google
      </button>
    </div>
  </div>
);
};


export default Login;