import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const StudentHistory = ({ isOpen, onClose, studentName, studentId }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const dummyTransactions = [
    {
      id: 1,
      amount: 500,
      date: "2025-01-01",
      time: "2:30 PM",
      type: "Tuition Fee",
    },
    {
      id: 2,
      amount: 150,
      date: "2024-12-28",
      time: "11:20 AM",
      type: "Library Fee",
    },
    {
      id: 3,
      amount: 300,
      date: "2024-12-25",
      time: "9:45 AM",
      type: "Lab Fee",
    },
    {
      id: 4,
      amount: 1000,
      date: "2024-12-20",
      time: "4:15 PM",
      type: "Semester Fee",
    },
  ];

  useEffect(() => {
    if (isOpen) {
      const fetchTransactions = async () => {
        try {
          // Replace with your actual API endpoint
          // const response = await fetch(`your-api-endpoint/${studentId}`);
          // const data = await response.json();

          setTimeout(() => {
            setTransactions(dummyTransactions);
            setLoading(false);
          }, 1000);
        } catch (error) {
          console.error("Error fetching transactions:", error);
          setLoading(false);
        }
      };

      fetchTransactions();
    }
  }, [isOpen, studentId]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-600 z-10"
        >
          ×
        </button>

        <div className="flex flex-col h-[500px] w-[500px] bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
          <div className="sticky top-0 bg-indigo-600 text-white p-4 shadow-md">
            <h2 className="text-lg font-semibold">
             { `${studentName}'s Payment History`}
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex flex-col bg-blue-50 rounded-lg p-4 ml-auto max-w-[90%] shadow-sm"
                >
                  <div className="font-medium text-blue-800">
                    {transaction.type}
                  </div>
                  <div className="text-xl font-bold text-blue-900">
                    ₹{transaction.amount}
                  </div>
                  <div className="text-xs text-gray-500 text-right mt-2">
                    {formatDate(transaction.date)} at {transaction.time}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

StudentHistory.propTypes = {
  isOpen: PropTypes.element,
  onClose: PropTypes.element,
  studentName: PropTypes.string.isRequired,
  studentId: PropTypes.string.isRequired,
};

export default StudentHistory;
