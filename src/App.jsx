import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Nav from './components/Nav-bar/NavBar';
import AsideBar from './components/Aside-bar/AsideBar';
import Home from './components/Home-page/HomePage';
import Batches from './components/Batches/Batches';


function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <AsideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <div className="flex-1 flex flex-col">
          <Nav />
          <main className="flex-1 p-6 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<div>Dashboard Content</div>} />
              <Route path="/batches" element={<Batches/>} />
              <Route path="/students" element={<div>Students Content</div>} />
              <Route path="/trainer" element={<div>Trainer Content</div>} />
              <Route path="/reports" element={<div>Reports Content</div>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;