import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewScreen from './NewScreen';
import './App.css';

function App() {
  const isNewScreen = window.location.pathname === '/new-screen';

  const openWindow = () => {
    const width = 1200;
    const height = 900;

    const newWindow = window.open(
      '/new-screen',
      'NewWindow', 
      `width=${width},height=${height},resizable=no,scrollbars=no`
    );
    
    if (newWindow) {
      newWindow.focus();
    }
  };

  return (
    <Router>
      <div id="root">
        {!isNewScreen && (
          <div>
            <button onClick={openWindow}>Start</button>
          </div>
        )}

        <Routes>
          <Route path="/new-screen" element={<NewScreen />} />
          <Route path="/" element={<Home />} /> {/* Define route for "/" */}
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Welcome to the Oracle of Delphi!</h1>
      {/* You can add content here */}
    </div>
  );
}

export default App;
