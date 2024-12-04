import { Plus, UserPlus, Users, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Batches = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [cardDetails, setCardDetails] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    batchName: "",
    subject: "",
    trainerName: "",
    startDate: "",
  });

  const [studentFormData, setStudentFormData] = useState({
    studentName: "",
    mobileNumber: "",
    address: "",
    email: "",
    qualification: "",
    feesPaid: "",
  });

  // Temporary batch data
  const batchesData = [
    {
      id: 1,
      name: "Larkspur23A",
      subject: "Full Stack Development",
      totalStudents: 25,
      startDate: "2024-01-15",
      batchCode: "#3030",
    },
    {
      id: 2,
      name: "Aster24",
      subject: "Data Science",
      totalStudents: 18,
      startDate: "2024-02-01",
      batchCode: "#3030",
    },
    {
      id: 3,
      name: "Piony24",
      subject: "UI/UX Design",
      totalStudents: 20,
      startDate: "2024-02-15",
      batchCode: "#3030",
    },
    {
      id: 4,
      name: "Carnation23",
      subject: "DevOps Engineering",
      totalStudents: 15,
      startDate: "2024-03-01",
      batchCode: "#3030",
    },
    {
      id: 5,
      name: "Daisy24R",
      subject: "Mobile Development",
      totalStudents: 22,
      startDate: "2024-03-15",
      batchCode: "#3030",
    },
    {
      id: 6,
      name: "Aster24F",
      subject: "Automation Testing",
      totalStudents: 32,
      startDate: "2024-03-15",
      batchCode: "#3030",
    },
  ];

  // const [batchesData, setBatchesData] = useState([]);

  // useEffect(() => {
  //   const fetchBatches = async () => {
  //     try {
  //       const response = await fetch("your-api-endpoint");
  //       const data = await response.json();
  //       setBatchesData(data);
  //     } catch (error) {
  //       console.error("Error fetching batches:", error);
  //     }
  //   };

  //   fetchBatches();
  // }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your API endpoint
      const response = await fetch("your-api-endpoint/batches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.batchName,
          startDate: formData.startDate,
        }),
      });

      if (response.ok) {
        // const newBatch = await response.json();
        // setBatchesData((prev) => [...prev, newBatch]);
        setIsModalOpen(false);
        setFormData({ batchName: "", startDate: "" });
      } else {
        console.error("Failed to add batch");
      }
    } catch (error) {
      console.error("Error adding batch:", error);
    }
  };

  const handleStudentInputChange = (e) => {
    const { name, value } = e.target;
    setStudentFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("your-api-endpoint/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentFormData),
      });

      if (response.ok) {
        setIsStudentModalOpen(false);
        setStudentFormData({
          studentName: "",
          mobileNumber: "",
          address: "",
          email: "",
          qualification: "",
          feesPaid: "",
        });
      } else {
        console.error("Failed to add student");
      }
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  //----------- mobile validation ---------------------//

  const handleMobileChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, "").slice(0, 10);

    setStudentFormData((prevState) => ({
      ...prevState,
      [name]: numericValue,
    }));
  };

  //------------- fees validation --------------//
  const handleFeesChange = (e) => {
    const { name, value } = e.target;

    // Only accept and store numbers, completely ignore any other character
    const numericValue = value
      .split("")
      .filter((char) => /[0-9]/.test(char))
      .join("");

    setStudentFormData((prevState) => ({
      ...prevState,
      [name]: numericValue,
    }));
  };

  if(cardDetails){
    navigate("/batches/details");
  }

  return (
    <div className="scholar-batches p-6">
      {/* Header with Add Batch button */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Your Batches ({batchesData.length})
        </h2>
        <div>
          <input
            className="w-half px-4 py-1 mr-1 border outline-none  rounded-lg focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400"
            type="text"
            name=""
            id=""
            placeholder="Search Batch"
          />

          <button className="scholar-add-student-btn w-half bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-5 rounded-lg transition-colors duration-200">
            Search
          </button>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <Plus size={20} />
          Add Batch
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {batchesData.map((batch) => (
          <div
            key={batch.id}
            className="scholar-batch-card bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
          >
            {/* Card Header */}
            <div onClick={()=>{setCardDetails(true)}} className="p-6 border-b cursor-pointer  border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {batch.name}
              </h3>
              <h4 className="text-md font-semibold text-indigo-600 text-gray-800 mb-2">
                Subject : {batch.subject}
              </h4>
              <p className="text-sm font-semibold text-black-600">
                Batch Code: {batch.batchCode}
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
                onClick={() => setIsStudentModalOpen(true)}
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
                  htmlFor="startDate"
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
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Trainer Name
                </label>
                <input
                  type="text"
                  id="trainerName"
                  placeholder="Enter Trainer Name"
                  name="trainerName"
                  value={formData.trainerName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
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
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200"
                >
                  Add Batch 😊
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
                  htmlFor="studentName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Student Name
                </label>
                <input
                  type="text"
                  id="studentName"
                  name="studentName"
                  placeholder="Enter Name"
                  value={studentFormData.studentName}
                  onChange={handleStudentInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="mobileNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobileNumber"
                  placeholder="Enter Mobile Number"
                  name="mobileNumber"
                  value={studentFormData.mobileNumber}
                  pattern="[0-9]{10}"
                  maxLength="10"
                  onChange={handleMobileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  name="email"
                  value={studentFormData.email}
                  onChange={handleStudentInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  placeholder="Enter Address"
                  value={studentFormData.address}
                  onChange={handleStudentInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="qualification"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Qualification
                </label>
                <input
                  type="text"
                  id="qualification"
                  placeholder="Enter Qualification"
                  name="qualification"
                  value={studentFormData.qualification}
                  onChange={handleStudentInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="feesPaid"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Fees Paid
                </label>
                <input
                  type="tel"
                  id="feesPaid"
                  placeholder="Enter Fees"
                  name="feesPaid"
                  value={studentFormData.feesPaid}
                  onChange={handleFeesChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsStudentModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
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
