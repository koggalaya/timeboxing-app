import React from 'react';

const TimeboxingLayout = ({ children }) => {
  return (
    <div className=" min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
      
      <header className="bg-gray-800 p-4 bg-opacity-20">
        <h1 className="text-xl font-bold ">Timeboxing App</h1>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
};

export default TimeboxingLayout;