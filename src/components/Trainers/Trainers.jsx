import "./Trainers.css";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  Search,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

import React, { useCallback, useMemo, useState } from "react";

// Dummy data (replace with actual API data later)
const DUMMY_TRAINERS = [
  {
    id: 1,
    name: "Michael Johnson",
    mobileNumber: "9876543210",
    email: "michael.johnson@example.com",
    address: "123 Tech Lane, Innovate City",
    qualification: "M.Tech Computer Science",
    salary: 75000,
    subject: "Advanced Programming",
    batchName: "Batch 2023 A",
  },
  {
    id: 2,
    name: "Sarah Williams",
    mobileNumber: "8765432109",
    email: "sarah.williams@example.com",
    address: "456 Education Road, Learning Town",
    qualification: "MBA Training & Development",
    salary: 65000,
    subject: "Business Communication",
    batchName: "Batch 2023 B",
  },
  {
    id: 3,
    name: "Robert Chen",
    mobileNumber: "7654321098",
    email: "robert.chen@example.com",
    address: "789 Knowledge Street, Smart City",
    qualification: "Ph.D. Computer Engineering",
    salary: 85000,
    subject: "Machine Learning",
    batchName: "Batch 2023 C",
  },
];

const Trainers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    trainerId: null,
    trainerName: "",
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
  const filteredAndSortedTrainers = useMemo(() => {
    let result = [...DUMMY_TRAINERS];

    // Search filtering
    if (debouncedSearchTerm) {
      result = result.filter((trainer) =>
        Object.values(trainer).some((val) =>
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
  const handleHistory = (trainerId) => {
    console.log(`Viewing history for trainer ${trainerId}`);
    // Implement history view logic
  };

  const handleDeleteConfirmation = (trainer) => {
    setDeleteConfirmation({
      isOpen: true,
      trainerId: trainer.id,
      trainerName: trainer.name,
    });
  };

  const handleDelete = () => {
    console.log(`Deleting trainer ${deleteConfirmation.trainerId}`);
    // Implement actual delete logic here

    // Close the confirmation modal
    setDeleteConfirmation({
      isOpen: false,
      trainerId: null,
      trainerName: "",
    });
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation({
      isOpen: false,
      trainerId: null,
      trainerName: "",
    });
  };

  const handleInvoice = (trainerId) => {
    console.log(`Generating invoice for trainer ${trainerId}`);
    // Implement invoice generation logic
  };

  return (
    <>
      <div className="trainers-root">
        <h2 className="text-2xl font-semibold mb-3">
          Total Trainers ({DUMMY_TRAINERS.length}) - All Batches
        </h2>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Search Bar */}
          <div className="p-4 border-b flex items-center">
            <div className="relative flex-grow mr-2">
              <input
                type="text"
                placeholder="Search trainers (min 3 characters)..."
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

          {/* Trainers Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  {[
                    "Name",
                    "Mobile Number",
                    "Email",
                    "Address",
                    "Qualification",
                    "Salary",
                    "Subject",
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
                {filteredAndSortedTrainers.map((trainer) => (
                  <tr key={trainer.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{trainer.name}</td>
                    <td className="px-4 py-3">{trainer.mobileNumber}</td>
                    <td className="px-4 py-3">{trainer.email}</td>
                    <td className="px-4 py-3">{trainer.address}</td>
                    <td className="px-4 py-3">{trainer.qualification}</td>
                    <td className="px-4 py-3">₹{trainer.salary}</td>
                    <td className="px-4 py-3">{trainer.subject}</td>
                    <td className="px-4 py-3">{trainer.batchName}</td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleHistory(trainer.id)}
                          className="text-blue-500 hover:text-blue-700"
                          title="Trainer History"
                        >
                          <Clock size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteConfirmation(trainer)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete Trainer"
                        >
                          <Trash2 size={20} />
                        </button>
                        <button
                          onClick={() => handleInvoice(trainer.id)}
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
          {filteredAndSortedTrainers.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No trainers found
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
              Are you sure you want to delete trainer
              <span className="font-bold">
                {" "}
                {deleteConfirmation.trainerName}
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

export default Trainers;
