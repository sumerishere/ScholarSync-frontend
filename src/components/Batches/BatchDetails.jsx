import { useState} from "react";

// import {useLocation} from "react-router-dom";

const BatchDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    batchName: "React Batch 2024",
    batchCode: "RB2024",
    studentCount: "25",
    subject: "React Development",
    trainer: "John Doe",
    startDate: "2024-12-05",
  });

  // const [batchData, setBatchData] = useState(null); // State to hold fetched batch data
  // const [error, setError] = useState(null);

  // const location = useLocation();
  // const {batchId} = location.state || {};

  // console.log("batch : ", batchId);

  // const fetchBatchById = async (batchId) => {
  //   try {
  //     const encodedBatchId = encodeURIComponent(batchId);
  //     const response = await fetch(
  //       `http://localhost:8080/api/batch/get-batch/${encodedBatchId}`
  //     );

  //     if (!response.ok) {
  //       throw new Error(
  //         `Error fetching batch with ID ${batchId}: ${response.status}`
  //       );
  //     }

  //     const data = await response.json();
  //     console.log("Batch data:", data);

  //     setBatchData(data); // Update state with fetched data
  //     // setError(null); // Clear any previous error
  //   } catch (err) {
  //     console.error("Error fetching batch:", err);
  //     // setError(err.message); // Update state with error message
  //   }
  // };

  // useEffect(() => {
  //   fetchBatchById();
  // }, [batchId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Handle form submission here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-md batch-details-root">
      <div className="batch-details-header mb-5 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Batch Details</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="edit-btn px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors"
          >
            Edit Details
          </button>
        )}
      </div>
      <hr />

      {/* Overlay */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-7 rounded-lg w-full max-w-2xl mx-4">
            <h3 className="text-xl font-semibold mb-6">Edit Batch Details</h3>

            <form onSubmit={handleSubmit} className="batch-edit-form">
              <div className="grid grid-cols-2 gap-6">
                <div className="batch-form-left">
                  <div className="batch-form-item mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Batch Name
                    </label>
                    <input
                      type="text"
                      name="batchName"
                      value={formData.batchName || "NA"}
                      onChange={handleChange}
                      className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="batch-form-item mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Batch Code
                    </label>
                    <input
                      readOnly
                      type="text"
                      name="batchCode"
                      value={formData.batchCode || "NA"}
                      onChange={handleChange}
                      className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="batch-form-item mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Student Count
                    </label>
                    <input
                      type="number"
                      readOnly
                      name="studentCount"
                      value={"25"}
                      onChange={handleChange}
                      className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="batch-form-right">
                  <div className="batch-form-item mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject || "NA"}
                      onChange={handleChange}
                      className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="batch-form-item mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Trainer Assigned
                    </label>
                    <input
                      type="text"
                      name="trainer"
                      value={"NA"}
                      onChange={handleChange}
                      className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="batch-form-item mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors"
                >
                  Update Details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Display Mode */}
      <div className="batch-details-display grid grid-cols-2 gap-6">
        <div className="batch-display-left">
          <div className="batch-display-item mb-4">
            <span className="block text-lg font-medium text-gray-500">
              Batch Name
            </span>
            <span className="block mt-1 font-semibold text-gray-900">
              {formData.batchName || "NA"}
            </span>
          </div>

          <div className="batch-display-item mb-4">
            <span className="block text-lg font-medium text-gray-500">
              Batch Code
            </span>
            <span className="block mt-1 font-semibold text-gray-900">
              {formData.batchCode || "NA"}
            </span>
          </div>

          <div className="batch-display-item mb-4">
            <span className="block text-lg font-medium text-gray-500">
              Student Count
            </span>
            <span className="block mt-1 font-semibold text-gray-900">
              {formData.studentCount || "NA"}
            </span>
          </div>
        </div>

        <div className="batch-display-right">
          <div className="batch-display-item mb-4">
            <span className="block text-lg font-medium text-gray-500">
              Subject
            </span>
            <span className="block mt-1 font-semibold text-gray-900">
              {formData.subject || "NA"}
            </span>
          </div>

          <div className="batch-display-item mb-4">
            <span className="block text-lg font-medium text-gray-500">
              Trainer Assigned
            </span>
            <span className="block mt-1 font-semibold text-gray-900">
              {formData.trainer || "NA"}
            </span>
          </div>

          <div className="batch-display-item mb-4">
            <span className="block text-lg font-medium text-gray-500">
              Start Date
            </span>
            <span className="block mt-1 font-semibold text-gray-900">
              {formData.startDate || "NA"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};


export default BatchDetails;
