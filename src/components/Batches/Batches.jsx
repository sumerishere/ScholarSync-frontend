import confetti from "canvas-confetti";
import "./Batches.css";
import {
  BookOpenText,
  ChevronRight,
  FolderClosed,
  Plus,
  UserPlus,
  Users,
  Video,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Batches = () => {
  const [searchBatch, setSearchBatch] = useState("");
  const debouncedSearchTerm = useDebounce(searchBatch, 500);
  // const [StudentAdded, onStudentAdded] = useState(null);
  const [getBatchId, setBatchId] = useState("");
  const [loading, setLoading] = useState(false); // State to control loading spinner

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  // const [cardDetails, setCardDetails] = useState(false);
  const [formData, setFormData] = useState({
    batchName: "",
    subject: "",
    trainerId: "",
    startDate: "",
  });

  const navigate = useNavigate();

  const [studentFormData, setStudentFormData] = useState({
    firstName: "",
    lastName: "",
    studentAddress: "",
    studentEmail: "",
    studentMobileNumber: "",
    stream: "",
    batchId: getBatchId,
  });

  const [batchesData, setBatchesData] = useState([]);

  const fetchBatches = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/batch/get-all-batch`
      );
      const data = await response.json();
      console.log("data :", data);
      setBatchesData(data);
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };

  const searchBatches = async (searchTerm) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/batch/search-batch?batchName=${searchTerm}`
      );
      const data = await response.json();
      setBatchesData(data);
    } catch (error) {
      console.error("Error searching batches:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm.length > 3) {
      searchBatches(debouncedSearchTerm);
    } else if (debouncedSearchTerm.length === 0) {
      fetchBatches();
    }
  }, [debouncedSearchTerm]);

  const handleStudentInputChange = (e) => {
    const { name, value } = e.target;
    setStudentFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Update the specific field in the formData object
    });
  };

  // Sample trainers data - replace with your actual data
  const trainers = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Vinod Kumar" },
    { id: 3, name: "Avinash Pingale" },
    { id: 4, name: "Daya Sir" },
  ];

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  //-------------- handling student form submissison --------------------//

  const validateForm = () => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(studentFormData.studentEmail)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    // Phone number validation matching backend pattern
    // Allows formats like: +1 (123) 456-7890, 123-456-7890, 123.456.7890, 1234567890
    const phoneRegex = /^\+?1?\s*\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

    if (!studentFormData.studentMobileNumber) {
      toast.error("Mobile number is required");
      return false;
    }

    if (!phoneRegex.test(studentFormData.studentMobileNumber)) {
      toast.error(
        "Invalid mobile number format. Please use format: 123-456-7890"
      );
      return false;
    }

    // Required fields validation with trimming
    const requiredFields = {
      firstName: "First Name",
      lastName: "Last Name",
      studentAddress: "Address",
      stream: "Stream",
    };

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!studentFormData[field]?.trim()) {
        toast.error(`${label} is required`);
        return false;
      }
    }

    return true;
  };

  const handleStudentSubmit = async (event) => {
    // Prevent default form submission behavior
    event.preventDefault();

    // Validate form data before submission
    if (!validateForm()) {
      return;
    }
    setLoading(true); // Show the spinner

    try {
      const response = await fetch(
        "http://localhost:8080/api/students/add-student",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...studentFormData,
            batchId: getBatchId, // Include batchId in the payload
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      toast.success("Student Added Successfully!");

      // Reset form data
      setStudentFormData({
        firstName: "",
        lastName: "",
        studentAddress: "",
        studentEmail: "",
        studentMobileNumber: "",
        stream: "",
        batchId: getBatchId,
      });

      // Close modal
      setIsStudentModalOpen(false);
    } catch (error) {
      toast.error(error.message || "Error submitting form!");
      console.error("Error:", error);
    } finally {
      setLoading(false); // Hide the spinner
    }
  };

  const triggerConfetti = () => {
    const defaults = {
      spread: 360,
      ticks: 150, // Increased ticks for longer-lasting particles
      gravity: 0.5, // Reduced gravity for slower falling
      decay: 0.97, // Increased decay for longer-lasting particles
      startVelocity: 25, // Reduced velocity for slower movement
      colors: [
        "#ff0000",
        "#00ff00",
        "#0000ff",
        "#ffff00",
        "#ff00ff",
        "#00ffff",
      ],
    };

    function shoot() {
      confetti({
        ...defaults,
        particleCount: 25, // Reduced particle count per burst
        scalar: 1.2,
        shapes: ["star"],
      });

      confetti({
        ...defaults,
        particleCount: 20, // Reduced particle count per burst
        scalar: 0.75,
        shapes: ["circle"],
      });
    }

    // Sequential bursts with longer delays
    setTimeout(shoot, 0);
    setTimeout(shoot, 700); // Increased delay between bursts
    setTimeout(shoot, 500); // Increased delay between bursts
    setTimeout(shoot, 750); // Added extra burst
    setTimeout(shoot, 1000); // Added final burst
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let loadingToast;

    // Create the payload according to your API requirements
    const payload = {
      batchName: formData.batchName,
      courseName: formData.subject,
      startDate: formData.startDate,
      trianerId: [parseInt(formData.trainerId)],
    };

    try {
      const loadingToast = toast.loading("Adding new batch...", {
        position: "top-right",
      });

      // Replace this URL with your actual API endpoint
      const response = await fetch(
        "http://localhost:8080/api/batch/create-batch",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any other headers you need (e.g., authorization)
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add batch");
      }

      // const data = await response.json();
      toast.dismiss(loadingToast);

      // Update the loading toast to success
      toast.update(loadingToast, {
        render: "Batch added successfully! 🎉",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });

      // Trigger confetti animation
      triggerConfetti();
      // Reset form and close modal
      setFormData({
        batchName: "",
        subject: "",
        trainerId: "",
        startDate: "",
      });
      setIsModalOpen(false);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to add batch. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Error adding batch:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStudentModel = (batch) => {
    setBatchId(batch.batchId);
    setIsStudentModalOpen(true);
  };

  return (
    <div className="batch-root scholar-batches p-6">
      {/* Header with Add Batch button */}
      {loading && (
        <div className="student-registration-form-spinner-overlay">
          <ClipLoader color="#ffffff" loading={loading} size={100} />
        </div>
      )}

      <div className="grid mb-10 grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-5">
        <div className="h-[100px] bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-300">
          <div className="flex items-center mt-3 ml-10 gap-3 ">
            <p className="mt-6 text-xl font-semibold text-center">
              <FolderClosed />{" "}
            </p>
            <p className="mt-6 text-xl font-semibold text-center">
              Class Content
            </p>
            <p className="mt-6 text-xl font-semibold text-center">
              <ChevronRight />{" "}
            </p>
          </div>
        </div>

        <div className="h-[100px] bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-300">
          <div className="flex items-center mt-3 ml-10 gap-3">
            <p className="mt-6 text-xl font-semibold text-center">
              <Video />{" "}
            </p>
            <p className="mt-6 text-xl font-semibold text-center">
              Live Classes
            </p>
            <p className="mt-6 text-xl font-semibold text-center">
              <ChevronRight />{" "}
            </p>
          </div>
        </div>

        <div className="h-[100px] bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-300">
          <div className="flex items-center mt-3 ml-10 gap-3">
            <p className="mt-6 text-xl font-semibold text-center">
              <BookOpenText />{" "}
            </p>
            <p className="mt-6 text-xl font-semibold text-center">
              Assignment Material
            </p>
            <p className="mt-6 text-xl font-semibold text-center">
              <ChevronRight />{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Your Batches ({batchesData.length})
        </h2>
        <div className="flex">
          <input
            className="w-half px-4 py-1 mr-1 border outline-none  rounded-lg focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400"
            type="text"
            name=""
            id=""
            value={searchBatch}
            onChange={(e) => setSearchBatch(e.target.value)}
            placeholder="Search Batch"
          />

          <button className="scholar-add-student-btn w-half bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-5 rounded-lg transition-colors duration-200">
            Search
          </button>
        </div>
        <button
          id="add-batch-id"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded-lg transition-colors duration-200"
        >
          <Plus size={20} />
          Add Batch
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {batchesData.length === 0 && (
          <div className=" mt-[50px] border text-center py-4 px-2  text-gray-500">
            <p className="text-center text-2xl ">No Batch found 😴</p>
          </div>
        )}

        {batchesData.map((batch) => (
          <div
            key={batch.batchId}
            className="scholar-batch-card border border-gray-300 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
          >
            {/* Card Header */}
            <div
              onClick={() => {
                // setCardDetails(true);

                navigate(
                  `/batches/details/${encodeURIComponent(batch.batchId)}`
                ); // Navigate
              }}
              className="p-6 border-b cursor-pointer  border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {batch.batchName}
              </h3>
              <h4 className="text-md font-semibold text-indigo-600 text-gray-800 mb-2">
                Subject : {batch.courseName}
              </h4>
              <p className="text-sm font-semibold text-black-600">
                Batch Code: {batch.batchId}
              </p>
              <p className="text-sm text-gray-500">
                Started: {new Date(batch.startDate).toLocaleDateString()}
              </p>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-4">
              {/* Add Student Button */}
              <button
                className="scholar-add-student-btn w-half flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                onClick={() => handleStudentModel(batch)}
              >
                <UserPlus size={20} />
                <span>Add Student</span>
              </button>

              {/* Student Count */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-gray-600">
                  <Users size={20} />
                  <span>Total Students</span>
                </div>
                <span className="text-lg font-semibold text-indigo-600">
                  {batch.totalStudents}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Add New Batch
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Rest of the form fields remain the same */}
              <div>
                <label
                  htmlFor="batchName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Batch Name
                </label>
                <input
                  type="text"
                  id="batchName"
                  placeholder="Enter batch name"
                  name="batchName"
                  value={formData.batchName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  placeholder="Enter subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="trainerId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Trainer Name
                </label>
                <select
                  id="trainerId"
                  name="trainerId"
                  value={formData.trainerId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Select a trainer</option>
                  {trainers.map((trainer) => (
                    <option key={trainer.id} value={trainer.id}>
                      {trainer.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? "Adding..." : "Add Batch 😊"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student Modal */}
      {isStudentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Add New Student
              </h3>
              <button
                onClick={() => setIsStudentModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleStudentSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter First Name"
                  value={studentFormData.firstName}
                  onChange={handleStudentInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter Last Name"
                  value={studentFormData.lastName}
                  onChange={handleStudentInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="studentAddress"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address
                </label>
                <textarea
                  id="studentAddress"
                  name="studentAddress"
                  placeholder="Enter Address"
                  value={studentFormData.studentAddress}
                  onChange={handleStudentInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="studentEmail"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="studentEmail"
                  name="studentEmail"
                  placeholder="Enter Email"
                  value={studentFormData.studentEmail}
                  onChange={handleStudentInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="studentMobileNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="studentMobileNumber"
                  name="studentMobileNumber"
                  placeholder="Enter Mobile Number"
                  value={studentFormData.studentMobileNumber}
                  onChange={handleStudentInputChange}
                  pattern="[0-9]{10}"
                  maxLength="10"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="stream"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Stream
                </label>
                <input
                  type="text"
                  id="stream"
                  name="stream"
                  placeholder="Enter Stream"
                  value={studentFormData.stream}
                  onChange={handleStudentInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button" // Cancel button doesn't submit the form.
                  onClick={() => setIsStudentModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>

                <button
                  type="submit" // Submit button to send the form data.
                  className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200"
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Batches;
