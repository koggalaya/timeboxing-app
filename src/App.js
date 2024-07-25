import React, { useState } from 'react';
import TimeboxingLayout from './components/TimeboxingLayout';
import Timebox from './components/Timebox';
import ToDoList from './components/ToDoList';
import Login from './Login';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

const App = () => {
  const [user, setUser] = useState(null);
  const [workDuration, setWorkDuration] = useState(50);
  const [breakDuration, setBreakDuration] = useState(5);
  const [walkDuration, setWalkDuration] = useState(5);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser(null);
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <TimeboxingLayout>
      <div className="p-4">
        {user ? (
          <>
            <button onClick={handleSignOut} className="absolute top-0 right-0 mt-4 mr-4 bg-red-500 text-white p-2 rounded">Sign Out</button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div>
                <Timebox 
                  title="Work" 
                  duration={workDuration} 
                  onDurationChange={(newDuration) => setWorkDuration(newDuration)} 
                />
              </div>
              <div>
                <Timebox 
                  title="Break" 
                  duration={breakDuration} 
                  onDurationChange={(newDuration) => setBreakDuration(newDuration)} 
                />
              </div>
              <div>
                <Timebox 
                  title="Walk" 
                  duration={walkDuration} 
                  onDurationChange={(newDuration) => setWalkDuration(newDuration)} 
                />
              </div>
            </div>
            <ToDoList user={user} />
          </>
        ) : (
          <Login setUser={setUser} />
        )}
      </div>
    </TimeboxingLayout>
  );
}

export default App;
