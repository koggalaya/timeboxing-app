import React from 'react';
import { auth, provider } from './firebase';
import { signInWithPopup } from 'firebase/auth';
import heroImage from '../src/assets/Take.png'; 

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
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="flex flex-row items-center justify-center max-w-4xl mx-auto">
        <div className="hidden md:block">
          <img src={heroImage} alt="Hero" className="h-full object-cover" />
        </div>
        <div className="text-center text-white p-8">
          <h1 className="text-3xl font-bold mb-6">Are you ready to play with time and win your day?</h1>
          <p className="mb-4">Start your journey in one click</p>
          <button
            onClick={signInWithGoogle}
            className="g-white text-blue-500 font-semibold py-2 px-8 rounded-full transition duration-300 transform hover:scale-105 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white"
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
