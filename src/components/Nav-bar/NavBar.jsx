// Nav.jsx
import { UserCircle } from 'lucide-react';

const Nav = () => {
  return (
    <nav className="scholar-nav bg-white shadow-md px-6 py-3">
      <div className="flex items-center justify-between">
        <h1 className="scholar-title text-2xl font-bold text-indigo-800">ScholarSync</h1>
        
        <div className="scholar-profile flex items-center space-x-4">
          {/* Profile Section */}
          <div className="scholar-profile-details flex items-center space-x-4">
            {/* Profile Info */}
            <div className="scholar-profile-info text-right">
              <p className="scholar-profile-name font-semibold text-gray-800">Testing Shastra</p>
              <p className="scholar-profile-role text-sm text-gray-600">Admin</p>              
            </div>
            
            {/* Profile Avatar */}
            <div className="scholar-profile-avatar">
              <UserCircle size={40} className="text-indigo-600" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;