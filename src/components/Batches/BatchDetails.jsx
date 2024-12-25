import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BatchDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);

  const { batchId } = useParams();
  
  const [batchData, setBatchData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return "NA";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const fetchBatchById = async () => {
      try {
        setIsLoading(true);
        const encodedId = encodeURIComponent(batchId);
        const response = await fetch(
          `http://localhost:8080/api/batch/get-batch/${encodedId}`
        );

        if (!response.ok) {
          throw new Error(`Error fetching batch data`);
        }

        const data = await response.json();
        setBatchData(data);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (batchId) {
      fetchBatchById();
    }
  }, [batchId]);

  if (isLoading) {
    return <div className="p-4">Loading batch details...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (!batchData) {
    return <div className="p-4">No batch data found</div>;
  }

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
                      value={batchData.batchName || "NA"}
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
                      value={batchData.batchId || "NA"}
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
                      value={batchData.studentCount || 0}
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
                      value={batchData.courseName || "NA"}
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
                      value={batchData.startDate}
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
              {batchData?.batchName || "NA"}
            </span>
          </div>

          <div className="batch-display-item mb-4">
            <span className="block text-lg font-medium text-gray-500">
              Batch Code
            </span>
            <span className="block mt-1 font-semibold text-gray-900">
              {batchData?.batchId || "NA"}
            </span>
          </div>

          <div className="batch-display-item mb-4">
            <span className="block text-lg font-medium text-gray-500">
              Student Count
            </span>
            <span className="block mt-1 font-semibold text-gray-900">
              {batchData?.studentCount || "0"}
            </span>
          </div>
        </div>

        <div className="batch-display-right">
          <div className="batch-display-item mb-4">
            <span className="block text-lg font-medium text-gray-500">
              Subject
            </span>
            <span className="block mt-1 font-semibold text-gray-900">
              {batchData?.courseName || "NA"}
            </span>
          </div>

          <div className="batch-display-item mb-4">
            <span className="block text-lg font-medium text-gray-500">
              Trainer Assigned
            </span>
            <span className="block mt-1 font-semibold text-gray-900">
              {batchData.trainer || "NA"}
            </span>
          </div>

          <div className="batch-display-item mb-4">
            <span className="block text-lg font-medium text-gray-500">
              Start Date
            </span>
            <span className="block mt-1 font-semibold text-gray-900">
              {formatDate(batchData.startDate) || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchDetails;
