import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Temporary login logic
    if (email === 'admin@example.com' && password === 'password123') {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container flex min-h-screen bg-gray-100">
      <div className="login-illustration w-1/2 bg-indigo-600 flex items-center justify-center p-12">
        <div className="illustration-content text-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 400 300" 
            className="mx-auto mb-8 w-full max-w-md"
          >
            <rect width="100%" height="100%" fill="transparent"/>
            
            {/* Teacher Figure */}
            <rect x="150" y="100" width="100" height="150" fill="#ffffff" rx="10"/>
            <circle cx="200" cy="70" r="50" fill="#ffffff"/>
            <path d="M200 120 L180 200 L220 200 Z" fill="#f0f0f0"/>
            
            {/* Student Figures */}
            <rect x="50" y="150" width="80" height="100" fill="#f0f0f0" rx="10"/>
            <circle cx="90" cy="120" r="40" fill="#ffffff"/>
            
            <rect x="270" y="150" width="80" height="100" fill="#f0f0f0" rx="10"/>
            <circle cx="310" cy="120" r="40" fill="#ffffff"/>
            
            {/* Blackboard */}
            <rect x="100" y="50" width="200" height="120" fill="#4a5568" rx="10"/>
            <line x1="120" y1="80" x2="280" y2="80" stroke="#ffffff" strokeWidth="4"/>
            <line x1="120" y1="100" x2="250" y2="100" stroke="#ffffff" strokeWidth="4"/>
            <line x1="120" y1="120" x2="200" y2="120" stroke="#ffffff" strokeWidth="4"/>
          </svg>
          <h2 className="text-3xl font-bold text-white">ScholarSync</h2>
          <p className="text-white mt-4">Empowering Education, Connecting Minds</p>
        </div>
      </div>
      
      <div className="login-form-container w-1/2 flex items-center justify-center p-12">
        <div className="login-form-wrapper w-full max-w-md">
          <div className="mb-6 text-center">
            <h1 className="text-4xl font-bold text-indigo-600 mb-2">ScholarSync</h1>
            <p className="text-gray-600">Welcome to your educational management platform</p>
          </div>
          
          <h2 className="text-2xl font-bold-md text-gray-800 mb-6">Hi, Welcome! Back</h2>
          <p className="text-gray-600 mb-8">Please enter your credentials to access ScholarSync</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input 
                type="email" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your password"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-indigo-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="remember"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            >
              Sign In to ScholarSync
            </button>
          </form>

          <div className="mt-6 text-center text-gray-600">
            <p>&copy; 2024 ScholarSync. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;



// import { Eye, EyeOff } from "lucide-react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Temporary login logic
//     if (email === "admin@example.com" && password === "password123") {
//       // Store a simple token or login state
//       localStorage.setItem("isAuthenticated", "true");
//       navigate("/dashboard");
//     } else {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div className="login-container flex min-h-screen bg-gray-100">
//       <div className="login-illustration w-1/2 bg-indigo-600 flex items-center justify-center p-12">
//         <div className="illustration-content text-center">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 400 300"
//             className="mx-auto mb-8 w-full max-w-md"
//           >
//             <rect width="100%" height="100%" fill="transparent" />

//             {/* Classroom Group Illustration */}
//             <g transform="translate(50, 50) scale(0.8)">
//               {/* Teacher Figure */}
//               <rect
//                 x="150"
//                 y="100"
//                 width="100"
//                 height="150"
//                 fill="#ffffff"
//                 rx="10"
//               />
//               <circle cx="200" cy="70" r="50" fill="#ffffff" />
//               <path d="M200 120 L180 200 L220 200 Z" fill="#f0f0f0" />

//               {/* Student Figures */}
//               <rect
//                 x="50"
//                 y="150"
//                 width="80"
//                 height="100"
//                 fill="#f0f0f0"
//                 rx="10"
//               />
//               <circle cx="90" cy="120" r="40" fill="#ffffff" />

//               <rect
//                 x="270"
//                 y="150"
//                 width="80"
//                 height="100"
//                 fill="#f0f0f0"
//                 rx="10"
//               />
//               <circle cx="310" cy="120" r="40" fill="#ffffff" />

//               {/* Blackboard */}
//               <rect
//                 x="100"
//                 y="50"
//                 width="200"
//                 height="120"
//                 fill="#4a5568"
//                 rx="10"
//               />
//               <line
//                 x1="120"
//                 y1="80"
//                 x2="280"
//                 y2="80"
//                 stroke="#ffffff"
//                 strokeWidth="4"
//               />
//               <line
//                 x1="120"
//                 y1="100"
//                 x2="250"
//                 y2="100"
//                 stroke="#ffffff"
//                 strokeWidth="4"
//               />
//               <line
//                 x1="120"
//                 y1="120"
//                 x2="200"
//                 y2="120"
//                 stroke="#ffffff"
//                 strokeWidth="4"
//               />
//             </g>
//           </svg>
//           <h2 className="text-3xl font-bold text-white">
//             Learning Management System
//           </h2>
//           <p className="text-white mt-4">
//             Empowering Education, Connecting Minds
//           </p>
//         </div>
//       </div>

//       <div className="login-form-container w-1/2 flex items-center justify-center p-12">
//         <div className="login-form-wrapper w-full max-w-md">
//           <h1 className="text-4xl font-bold text-gray-800 mb-6">
//             Welcome Back
//           </h1>
//           <p className="text-gray-600 mb-8">
//             Please enter your credentials to access the system
//           </p>

//           <form onSubmit={handleLogin} className="space-y-6">
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>

//             <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <input 
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Enter your password"
//                 required
//               />
//               <button 
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-indigo-600"
//               >
//                 {showPassword ? (
//                   <EyeOff className="h-5 w-5" />
//                 ) : (
//                   <Eye className="h-5 w-5" />
//                 )}
//               </button>
//             </div>
//           </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="remember"
//                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                 />
//                 <label
//                   htmlFor="remember"
//                   className="ml-2 block text-sm text-gray-900"
//                 >
//                   Remember me
//                 </label>
//               </div>

//               <a
//                 href="#"
//                 className="text-sm text-indigo-600 hover:text-indigo-500"
//               >
//                 Forgot password?
//               </a>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
//             >
//               Sign In
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;
