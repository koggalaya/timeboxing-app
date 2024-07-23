import React from 'react';
import TimeboxingLayout from './components/TimeboxingLayout';
import Timebox from './components/Timebox';
import ToDoList from './components/ToDoList';
import Login from './Login';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

import  { useState } from 'react';

const App = () => {
  const [user, setUser] = useState(null);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser(null);
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
<div className="p-4">
      {user ? (
        <>
          <button onClick={handleSignOut} className="bg-red-500 text-white p-2 rounded">Sign Out</button>
         < TimeboxingLayout>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Timebox title="Work" duration={1} />
        <Timebox title="Break" duration={1} />
        <Timebox title="Walk" duration={1} />
      </div>
      <ToDoList user={user} />
         </TimeboxingLayout>
        </>
      ) : (
        <Login setUser={setUser} />
      )}
    </div>

    
      
      


  );
}

export default App;
