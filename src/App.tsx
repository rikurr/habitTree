import React from 'react';
import Router from './Router';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Router />
      </main>
    </>
  );
}

export default App;
