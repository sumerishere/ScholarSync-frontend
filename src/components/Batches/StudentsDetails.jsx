import "./StudentsDetails.css";

const StudentsDetails = () => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Student Details
          </h2>
        </div>
        <div className="max-h-[500px] overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
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
              {Array.from({ length: 20 }, (_, index) => ({
                id: index + 1,
                studentName: `Student ${index + 1}`,
                mobileNumber: `98765432${index.toString().padStart(2, "0")}`,
                address: `${index + 1} Tech Street, Coding City`,
                email: `student${index + 1}@example.com`,
                qualification: index % 2 === 0 ? "B.Tech" : "MCA",
                feesPaid: 25000 + index * 1000,
                totalFees: 45000,
                discount: 5000 - index * 100,
              })).map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
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
                  <td className="px-6 sticky right-0 bg-white py-4 whitespace-nowrap text-sm ">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-600 border border-grey-700 text-white text-sm rounded hover:border-black bg-blue-500  transition-colors">
                        History
                      </button>
                      <button className="px-3 py-1 border border-grey-700 bg-yellow-600 text-white text-sm rounded hover:border-black bg-yellow-500 transition-colors">
                        Reminder
                      </button>
                      <button className="px-6 py-1 border border-grey-700 bg-green-600 text-white text-sm rounded hover:border-black bg-green-500 transition-colors">
                        Pay
                      </button>
                    </div>
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

export default StudentsDetails;
