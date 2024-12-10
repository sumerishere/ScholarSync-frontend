import { Award, GraduationCap, TrendingUp, Users } from "lucide-react";
import PropTypes from "prop-types";

const StatCard = ({ icon: Icon, title, value, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-center mb-4">
      <Icon className="h-8 w-8 text-indigo-700 mr-3" />
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-2xl font-bold text-indigo-700 mb-2">{value}</p>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const Home = () => {
  return (
    <div className="scholar-home min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-indigo-700 text-white rounded-lg py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="lg:flex lg:items-center ml-8 lg:justify-between">
            <div className="lg:w-1/2">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Welcome! to ScholarSync By Testing Shastra.
              </h2>
              <p className="text-lg text-indigo-100 mb-6">
                {`Streamline your educational institution's management with our
                comprehensive platform for tracking students and trainers data.`}
              </p>
              <div className="flex space-x-4">
                <button className="bg-white text-indigo-700 px-6 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
                  Get Started
                </button>
                <button className="border border-white text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-600 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="hidden px-5 lg:block ">
              <img
                src="/Admin-img/logo.png"
                alt="Education Management"
                className="rounded-lg bg-white shadow-lg m-auto w-[300px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Users}
            title="Active Students"
            value="1,200+"
            description="Currently enrolled students"
          />
          <StatCard
            icon={GraduationCap}
            title="Certified Trainers"
            value="10+"
            description="Expert educational staff"
          />
          <StatCard
            icon={TrendingUp}
            title="Annual Growth"
            value="25%"
            description="Year-over-year admission increase"
          />
          <StatCard
            icon={Award}
            title="Course Completion"
            value="92%"
            description="Student success rate"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Why Choose ScholarSync?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Data-Driven Insights
            </h4>
            <p className="text-gray-600">
              Track admission trends, student performance, and institutional
              growth with powerful analytics tools.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Seamless Management
            </h4>
            <p className="text-gray-600">
              Efficiently manage student records, trainer schedules, and
              administrative tasks in one platform.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Real-time Monitoring
            </h4>
            <p className="text-gray-600">
              Stay updated with real-time attendance tracking and performance
              monitoring systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

StatCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
StatCard.defaultProps = {
  description: "", // Provide empty string as fallback for description
};

export default Home;
