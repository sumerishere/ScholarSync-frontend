import { debounce } from "lodash";
import { AlarmClock, HistoryIcon } from "lucide-react";
import { useCallback, useState } from "react";
import StudentHistory from "../History-Component/StudentHistory";
import "./StudentsDetails.css";
// import {Link} from "react-router-dom";

const StudentsDetails = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const getFeeStatus = (feesPaid, totalFees) => {
    const ratio = feesPaid / totalFees;
    if (ratio >= 1) return { type: "full-paid", color: "bg-green-500" };
    if (ratio >= 0.5) return { type: "half-paid", color: "bg-yellow-500" };
    return { type: "quarter-paid", color: "bg-sky-500" };
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchTerm(value);
    }, 300),
    []
  );

  const handleSearchInput = (e) => {
    const value = e.target.value;
    if (value.length >= 3) {
      debouncedSearch(value);
    } else {
      setSearchTerm("");
    }
  };

  const students = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    studentName: `Student ${index + 1}`,
    mobileNumber: `98765432${index.toString().padStart(2, "0")}`,
    address: `${index + 1} Tech Street, Coding City`,
    email: `student${index + 1}@example.com`,
    qualification: index % 2 === 0 ? "B.Tech" : "MCA",
    feesPaid: 55000 + index * 1000,
    totalFees: 75000,
    discount: 5000 - index * 100,
  }));

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      searchTerm === "" ||
      student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.mobileNumber.includes(searchTerm);

    const feeStatus = getFeeStatus(student.feesPaid, student.totalFees).type;
    const matchesFilter = filterType === "all" || feeStatus === filterType;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Student Details
          </h2>
          <div className="flex justify-between items-center mt-5">
            <div className="flex-1 mr-4">
              <input
                className="w-full px-4 py-1 border outline-none rounded-lg focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400"
                type="text"
                placeholder="Search student by name/mobile"
                onChange={handleSearchInput}
              />
            </div>
            <select
              className="px-4 py-1 border rounded-lg focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 mr-4"
              onChange={(e) => setFilterType(e.target.value)}
              value={filterType}
            >
              <option value="all">All Students</option>
              <option value="full-paid">Full Paid</option>
              <option value="half-paid">Half Paid</option>
              <option value="quarter-paid">Quarter Paid</option>
            </select>
            <button className="scholar-add-student-btn w-auto bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-5 rounded-lg transition-colors duration-200">
              Search
            </button>
          </div>
        </div>
        <div className="max-h-[500px] overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th
                  scope="col"
                  className="sticky sticky z-[5] top-0 sticky  left-0 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b shadow-sm"
                >
                  Fee Status
                </th>
                <th
                  scope="col"
                  className="sticky top-0 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b shadow-sm"
                >
                  Student Name
                </th>
                <th
                  scope="col"
                  className="sticky top-0 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b shadow-sm"
                >
                  Mobile Number
                </th>
                <th
                  scope="col"
                  className="sticky top-0 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b shadow-sm"
                >
                  Address
                </th>
                <th
                  scope="col"
                  className="sticky top-0 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b shadow-sm"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="sticky top-0 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b shadow-sm"
                >
                  Qualification
                </th>
                <th
                  scope="col"
                  className="sticky top-0 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b shadow-sm"
                >
                  Fees Paid
                </th>
                <th
                  scope="col"
                  className="sticky top-0 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b shadow-sm"
                >
                  Total Fees
                </th>
                <th
                  scope="col"
                  className="sticky top-0 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b shadow-sm"
                >
                  Discount
                </th>
                <th
                  scope="col"
                  className="sticky z-[5] top-0 right-0 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b shadow-sm"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => {
                const feeStatus = getFeeStatus(
                  student.feesPaid,
                  student.totalFees
                );
                return (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="sticky top-0 left-0 bg-white px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div
                        className={`w-6 h-3 shadow rounded ${feeStatus.color}`}
                      ></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.studentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.mobileNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.qualification}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{student.feesPaid}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{student.totalFees}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{student.discount}
                    </td>
                    <td className="px-6 sticky right-0 bg-white py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-blue-600 border border-grey-700 text-white text-sm rounded hover:border-black bg-indigo-600  transition-colors"
                          onClick={() => setSelectedStudent(student)}
>
                          {/* <Link to="/student/history/details" style={{textDecoration:"none"}}> */}
                          <HistoryIcon />
                          {/* </Link> */}
                        </button>
                        <button className="px-3 py-1 border border-grey-700 bg-yellow-600 text-white text-sm rounded hover:border-black bg-yellow-500 transition-colors">
                          <AlarmClock />
                        </button>
                        <button className="px-6 py-1 border border-grey-700 bg-green-600 text-white text-sm rounded hover:border-black bg-green-500 transition-colors">
                          Pay
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* No Results */}
        {filteredStudents.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No Students found
          </div>
        )}
      </div>
      <StudentHistory
        isOpen={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
        studentName={selectedStudent?.studentName}
        studentId={selectedStudent?.id}
      />
    </div>
  );
};

export default StudentsDetails;
