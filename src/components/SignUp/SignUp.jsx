import {
  BookOpen,
  Building2,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  MapPin,
  Phone,
  UserCircle,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    email: "",
    instituteName: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation before submission
    const isValid = Object.values(formData).every(
      (value) => value.trim() !== ""
    );

    if (isValid && formData.password === formData.confirmPassword) {
      console.log("Form submitted:", formData);
      alert("Form submitted successfully!");
    } else {
      alert("Please fill all fields and ensure passwords match");
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <div className="signup-illustration-section bg-indigo-700">
          <div className="signup-illustration-content">
            <h3 className="signup-brand-title">ScholarSync</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 500 400"
              className="signup-illustration"
            >
              <rect width="500" height="400" fill="#F0F4F8" />

              {/* Group Management Illustration */}
              <g transform="translate(250, 200)">
                {/* Background shapes */}
                <circle
                  cx="0"
                  cy="0"
                  r="150"
                  fill="#5A67D8"
                  fillOpacity="0.1"
                />

                {/* People icons */}
                <g transform="translate(-100, -50)">
                  <GraduationCap
                    x="-25"
                    y="-25"
                    width="90"
                    height="90"
                    stroke="#5A67D8"
                    strokeWidth="2"
                    fill="none"
                  />
                </g>

                <g transform="translate(-50, 50)">
                  <Users
                    x="-25"
                    y="-25"
                    width="90"
                    height="90"
                    stroke="#5A67D8"
                    strokeWidth="2"
                    fill="none"
                  />
                </g>

                <g transform="translate(50, 0)">
                  <BookOpen
                    x="-25"
                    y="-25"
                    width="90"
                    height="90"
                    stroke="#5A67D8"
                    strokeWidth="2"
                    fill="none"
                  />
                </g>

                {/* Connecting lines */}
                <path
                  d="M-100,-50 Q0,0 100,50"
                  fill="none"
                  stroke="#5A67D8"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              </g>

              {/* Text overlay */}
              <text
                x="250"
                y="390"
                textAnchor="middle"
                fontSize="30"
                fill="#5A67D8"
              >
                Manage Learning Groups
              </text>
            </svg>
          </div>
        </div>

        <div className="signup-form-section">
          <h1 className="signup-form-title">Create Your Account</h1>
          <form onSubmit={handleSubmit} className="signup-form">
            {/* Name Input */}
            <div className="signup-input-group">
              <div className="signup-input-wrapper">
                <UserCircle className="signup-input-icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="signup-input"
                />
              </div>
            </div>

            {/* Mobile Input */}
            <div className="signup-input-group">
              <div className="signup-input-wrapper">
                <Phone className="signup-input-icon" />
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="signup-input"
                />
              </div>
            </div>

            {/* Address Input */}
            <div className="signup-input-group">
              <div className="signup-input-wrapper">
                <MapPin className="signup-input-icon" />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="signup-input"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="signup-input-group">
              <div className="signup-input-wrapper">
                <Mail className="signup-input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="signup-input"
                />
              </div>
            </div>

            {/* Institute Name Input */}
            <div className="signup-input-group">
              <div className="signup-input-wrapper">
                <Building2 className="signup-input-icon" />
                <input
                  type="text"
                  name="instituteName"
                  placeholder="Institute Name"
                  value={formData.instituteName}
                  onChange={handleChange}
                  required
                  className="signup-input"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="signup-input-group">
              <div className="signup-input-wrapper">
                <Lock className="signup-input-icon" />
                <input
                  type={showPassword.password ? "text" : "password"}
                  name="password"
                  placeholder="Create Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="8"
                  className="signup-input"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("password")}
                  className="signup-password-toggle"
                >
                  {showPassword.password ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="signup-input-group">
              <div className="signup-input-wrapper">
                <Lock className="signup-input-icon" />
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength="8"
                  className="signup-input"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="signup-password-toggle"
                >
                  {showPassword.confirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>
            <div id="login-option">
              <p>
                {" Already! Account - "}
                <Link style={{textDecoration:"underline"}} to="/login"> Login</Link>
              </p>
            </div>
            {/* Submit Button */}
            <button type="submit" className="signup-submit-button">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
