import React from 'react';
import './App.css';
import MainContainer from './MainContainer';

// PUBLIC_INTERFACE
function App() {
  // Renders MainContainer as the dashboard landing page.
  return (
    <div className="app">
      <MainContainer />
    </div>
  );
}

export default App;