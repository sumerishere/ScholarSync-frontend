import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import AsideBar from "./components/Aside-bar/AsideBar";
import Batches from "./components/Batches/Batches";
import BatchesStudentsPage from "./components/Batches/BatchesStudentsDetails";
import Home from "./components/Home-page/HomePage";
import Nav from "./components/Nav-bar/NavBar";
import Invoice from "./components/Invoice/Invoice";
import LoginForm from "./components/Login/LoginForm";
import Dashboard from "./components/Dashboard/Dashboard";
import SignUp from "./components/SignUp/SignUp";

const PrivateRoute = ({ children }) => {
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  return isAuthenticated ? (
    <div className="flex h-screen bg-gray-100">
      <AsideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex-1 flex flex-col">
        <Nav />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route 
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/batches" 
          element={
            <PrivateRoute>
              <Batches />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/batches/details" 
          element={
            <PrivateRoute>
              <BatchesStudentsPage />
            </PrivateRoute>
          }
        />
        <Route 
          path="/students" 
          element={
            <PrivateRoute>
              <div>Students Content</div>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/trainer" 
          element={
            <PrivateRoute>
              <div>Trainer Content</div>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/reports" 
          element={
            <PrivateRoute>
              <div>Reports Content</div>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/invoice" 
          element={
            <PrivateRoute>
              <Invoice />
            </PrivateRoute>
          }

        />
      </Routes>
    </Router>
  );
}

PrivateRoute.propTypes ={
  children: PropTypes.string.isRequired,
}

export default App;





// import { useState } from "react";
// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// import AsideBar from "./components/Aside-bar/AsideBar";
// import Batches from "./components/Batches/Batches";
// import BatchesStudentsPage from "./components/Batches/BatchesStudentsDetails";
// import Home from "./components/Home-page/HomePage";
// import Nav from "./components/Nav-bar/NavBar";
// import Invoice from "./components/Invoice/Invoice";

// function App() {
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   return (
//     <Router>
//       <div className="flex h-screen bg-gray-100">
//         <AsideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
//         <div className="flex-1 flex flex-col">
//           <Nav />
//           <main className="flex-1 p-6 overflow-auto">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/dashboard" element={<div>Dashboard Content</div>} />
//               <Route path="/batches" element={<Batches />} />
//               <Route path="/batches/details" element={<BatchesStudentsPage />}/>
//               <Route path="/students" element={<div>Students Content</div>} />
//               <Route path="/trainer" element={<div>Trainer Content</div>} />
//               <Route path="/reports" element={<div>Reports Content</div>} />
//               <Route path="/invoice" element={<Invoice/>}/>
//             </Routes>
//           </main>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;
