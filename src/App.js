import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
        </Routes>
      </div>
    </Router>
  );
}

function NewScreen() {
  return (
    <div id="background-container">
        <img id="background-image" src="/background.png" alt="background" />
        <div className="text-box">
          <p>This is where the questions will go</p>
          <p>Second line</p>
        </div>
        <div className="Answer-A">
          <p>Answer A</p>
        </div>
        <div className="Answer-B">
          <p>Answer B</p>
        </div>
        <div className="Answer-C">
          <p>Answer C</p>
        </div>        
        <div className="Answer-D">
          <p>Answer D</p>
        </div>
        <div className="Seeker">
        <img id="seeker-image" src="Socrates.png" alt="background" />
        </div>
    </div>
  );
}

export default App;
