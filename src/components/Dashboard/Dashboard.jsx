import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const barData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 4000 },
  { name: "July", value: 3000 },
  { name: "Aug", value: 2000 },
  { name: "Sep", value: 6000 },
  { name: "Oct", value: 4000 },
  { name: "Nov", value: 3000 },
  { name: "Dec", value: 2000 },
];

const doughnutData = [
  { name: "Sales", value: 400 },
  { name: "Marketing", value: 300 },
  { name: "Support", value: 300 },
];

const pieData = [
  { name: "Automation", value: 500 },
  { name: "Java", value: 300 },
  { name: "UI/UX react", value: 200 },
  { name: "Fullstack", value: 200 },
];

const lineData = [
  { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
  { name: "May", uv: 1890, pv: 4800, amt: 2181 },
  { name: "jun", uv: 4000, pv: 2400, amt: 2400 },
  { name: "july", uv: 3000, pv: 1398, amt: 2210 },
  { name: "aug", uv: 2000, pv: 9800, amt: 2290 },
  { name: "sep", uv: 2780, pv: 3908, amt: 2000 },
  { name: "oct", uv: 1890, pv: 4800, amt: 2181 },
  { name: "nov", uv: 4000, pv: 2400, amt: 2400 },
  { name: "dec", uv: 3000, pv: 1398, amt: 2210 },
];

const dummyTableData = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Pending" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "Inactive" },
  { id: 4, name: "Alice Williams", email: "alice@example.com", status: "Active" },
  { id: 5, name: "Jane Smith", email: "jane@example.com", status: "Pending" },
  { id: 6, name: "Bob Johnson", email: "bob@example.com", status: "Inactive" },
  { id: 7, name: "Alice Williams", email: "alice@example.com", status: "Active" },
];

const Dashboard = () => {
  const INDIGO_COLORS = ["#6366f3", "#4338ca", "#5b21b6", "#6d28d9"];

  return (
    <div className="dashboard-root p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {/* Bar Chart */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold text- mb-4">
            Bar Chart
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#6366f" />
              <YAxis stroke="#6366f" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#4547a8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold  mb-4">
            Pie Chart
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#6366f1"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={INDIGO_COLORS[index % INDIGO_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">
            Doughnut Chart
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={doughnutData}
                cx="50%"
                cy="50%"
                labelLine={false}
                innerRadius={60}
                outerRadius={80}
                fill="#6366f1"
                dataKey="value"
              >
                {doughnutData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={INDIGO_COLORS[index % INDIGO_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">
            Line Chart
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#6366f" />
              <YAxis stroke="#6366f" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#6366f1"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#4338ca" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="mt-8 bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">
          User List
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-indigo-50">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {dummyTableData.map((user) => (
                <tr key={user.id} className="border-b hover:bg-indigo-50">
                  <td className="px-6 py-4">{user.id}</td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : user.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }
                    `}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
