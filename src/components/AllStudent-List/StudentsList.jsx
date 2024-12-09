import {
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  Search,
  Trash2,
} from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";

// Dummy data (replace with actual API data later)
const DUMMY_STUDENTS = [
  {
    id: 1,
    name: "John Doe",
    mobileNumber: "9876543210",
    email: "john.doe@example.com",
    address: "123 Main St, Cityville",
    qualification: "B.Tech Computer Science",
    feesPaid: 50000,
    discount: 5000,
    batchName: "Batch 2023",
  },
  {
    id: 2,
    name: "Jane Smith",
    mobileNumber: "8765432109",
    email: "jane.smith@example.com",
    address: "456 Oak Road, Townsville",
    qualification: "MBA Marketing",
    feesPaid: 60000,
    discount: 7500,
    batchName: "Batch 2023",
  },
  {
    id: 3,
    name: "Jane Smith",
    mobileNumber: "8765432109",
    email: "jane.smith@example.com",
    address: "456 Oak Road, Townsville",
    qualification: "MBA Marketing",
    feesPaid: 60000,
    discount: 7500,
    batchName: "Batch 2023",
  },
  {
    id: 4,
    name: "Jane Smith",
    mobileNumber: "8765432109",
    email: "jane.smith@example.com",
    address: "456 Oak Road, Townsville",
    qualification: "MBA Marketing",
    feesPaid: 60000,
    discount: 7500,
    batchName: "Batch 2023",
  },
  {
    id: 5,
    name: "Jane Smith",
    mobileNumber: "8765432109",
    email: "jane.smith@example.com",
    address: "456 Oak Road, Townsville",
    qualification: "MBA Marketing",
    feesPaid: 60000,
    discount: 7500,
    batchName: "Batch 2023",
  },
  {
    id: 6,
    name: "Jane Smith",
    mobileNumber: "8765432109",
    email: "jane.smith@example.com",
    address: "456 Oak Road, Townsville",
    qualification: "MBA Marketing",
    feesPaid: 60000,
    discount: 7500,
    batchName: "Batch 2023",
  },
  {
    id: 7,
    name: "Jane Smith",
    mobileNumber: "8765432109",
    email: "jane.smith@example.com",
    address: "456 Oak Road, Townsville",
    qualification: "MBA Marketing",
    feesPaid: 60000,
    discount: 7500,
    batchName: "Batch 2023",
  },
  {
    id: 8,
    name: "Jane Smith",
    mobileNumber: "8765432109",
    email: "jane.smith@example.com",
    address: "456 Oak Road, Townsville",
    qualification: "MBA Marketing",
    feesPaid: 60000,
    discount: 7500,
    batchName: "Batch 2023",
  },
  // Add more dummy students
];

const AllStudentsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    studentId: null,
    studentName: "",
  });

  // Debounce search input
  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm.length >= 3) {
        setDebouncedSearchTerm(searchTerm);
      } else {
        setDebouncedSearchTerm("");
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Filtering and sorting logic
  const filteredAndSortedStudents = useMemo(() => {
    let result = [...DUMMY_STUDENTS];

    // Search filtering
    if (debouncedSearchTerm) {
      result = result.filter((student) =>
        Object.values(student).some((val) =>
          val
            .toString()
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase())
        )
      );
    }

    // Sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [debouncedSearchTerm, sortConfig]);

  // Handle sorting
  const requestSort = useCallback(
    (key) => {
      let direction = "ascending";
      if (sortConfig.key === key && sortConfig.direction === "ascending") {
        direction = "descending";
      }
      setSortConfig({ key, direction });
    },
    [sortConfig]
  );

  // Action handlers (mock implementations)
  const handleHistory = (studentId) => {
    console.log(`Viewing history for student ${studentId}`);
    // Implement history view logic
  };

  const handleDeleteConfirmation = (student) => {
    setDeleteConfirmation({
      isOpen: true,
      studentId: student.id,
      studentName: student.name,
    });
  };

  const handleDelete = () => {
    console.log(`Deleting student ${deleteConfirmation.studentId}`);
    // Implement actual delete logic here

    // Close the confirmation modal
    setDeleteConfirmation({
      isOpen: false,
      studentId: null,
      studentName: "",
    });
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation({
      isOpen: false,
      studentId: null,
      studentName: "",
    });
  };

  const handleInvoice = (studentId) => {
    console.log(`Generating invoice for student ${studentId}`);
    // Implement invoice generation logic
  };

  return (
    <>
      <div className="all-student-list-root p-3 bg-gray-50 rounded overflow-auto">
        <h2 className="text-2xl font-semibold mb-3">
          Total Students ({DUMMY_STUDENTS.length}) - All Batches
        </h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Search Bar */}
          <div className="p-4 border-b flex items-center">
            <div className="relative flex-grow mr-2">
              <input
                type="text"
                placeholder="Search students (min 3 characters)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-700"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            <button className="bg-indigo-700 text-white px-4 py-2 rounded-md hover:bg-indigo-600">
              Search
            </button>
          </div>

          {/* Students Table */}
          <div className="overflow-x-auto max-h-[520px]">
            <table className="w-full">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  {[
                    "Name",
                    "Mobile Number",
                    "Email",
                    "Address",
                    "Qualification",
                    "Fees Paid",
                    "Discount",
                    "Batch Name",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() =>
                        header !== "Actions" &&
                        requestSort(header.toLowerCase().replace(/\s/g, ""))
                      }
                    >
                      <div className="flex items-center">
                        {header}
                        {sortConfig.key ===
                          header.toLowerCase().replace(/\s/g, "") &&
                          (sortConfig.direction === "ascending" ? (
                            <ChevronUp size={16} className="ml-1" />
                          ) : (
                            <ChevronDown size={16} className="ml-1" />
                          ))}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{student.name}</td>
                    <td className="px-4 py-3">{student.mobileNumber}</td>
                    <td className="px-4 py-3">{student.email}</td>
                    <td className="px-4 py-3">{student.address}</td>
                    <td className="px-4 py-3">{student.qualification}</td>
                    <td className="px-4 py-3">₹{student.feesPaid}</td>
                    <td className="px-4 py-3">₹{student.discount}</td>
                    <td className="px-4 py-3">{student.batchName}</td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleHistory(student.id)}
                          className="text-blue-500 hover:text-blue-700"
                          title="Student History"
                        >
                          <Clock size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteConfirmation(student)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete Student"
                        >
                          <Trash2 size={20} />
                        </button>

                        <button
                          onClick={() => handleInvoice(student.id)}
                          className="text-green-500 hover:text-green-700"
                          title="Generate Invoice"
                        >
                          <Link to="/Invoice">
                            <FileText size={20} />
                          </Link>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* No Results */}
          {filteredAndSortedStudents.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No students found
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmation.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-bold mb-4 text-center">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Are you sure you want to delete student
              <span className="font-bold">
                {" "}
                {deleteConfirmation.studentName}
              </span>
              ?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllStudentsList;
