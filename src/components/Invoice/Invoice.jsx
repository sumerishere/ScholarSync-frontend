import { HistoryOutlined } from "@ant-design/icons";
import axios from "axios";
import "./Invoice.css";

import jsPDF from "jspdf";
import "jspdf-autotable";
import debounce from "lodash/debounce";
// import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Invoice = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [filteredInvoice, setFilteredInvoice] = useState([]);
  const [searchMobile, setSearchMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchCandidates = async () => {
    try {
      const response = await fetch("http://localhost:8080/get-all-candidate");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCandidates(data);
      console.log("get all candidates", data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  useEffect(() => {
    if (isTableVisible) {
      fetchCandidates();
    }
  }, [isTableVisible]);

  useEffect(() => {
    // if () {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/get-template-data/${null}`
        );
        if (response.ok) {
          const result = await response.json();
          setData(result); // Update data state with API response
        } else {
          console.error("Failed to fetch template data");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
    // }
  }, []);

  const [payments, setPayments] = useState([
    { date: "", mode: "", amount: "" },
  ]);
  const [items, setItems] = useState([
    { name: "", quantity: "", rate: "", amount: "" },
  ]);
  const [invoiceDetails, setInvoiceDetails] = useState({
    billedByName: "",
    billedByAddress: "",
    billedToName: "",
    billedToAddress: "",
  });

  // Validate mobile number
  // const isValidMobileNumber = (number) => {
  //   const mobileRegex = /^[0-9]{10}$/;
  //   return mobileRegex.test(number);
  // };

  // Handle input change with validation
  const handleInputSearchChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
    if (value.length <= 10) {
      setSearchMobile(value);
    }
  };

  // Handle invoice search
  const handleInvoiceSearch = async (text) => {
    try {
      if (!text) {
        setFilteredInvoice([]);
        return;
      }
      setIsLoading(true);
      const queryParams = new URLSearchParams();
      queryParams.append("mobileNumber", text);
      const url = `http://localhost:8080/search-invoice?${queryParams.toString()}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFilteredInvoice(data || []);
    } catch (error) {
      console.error("Error searching invoice:", error);
      setFilteredInvoice([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search
  const debouncedSearch = debounce((text) => handleInvoiceSearch(text), 300);

  // Initial data fetch
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:8080/all-invoices");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCandidates(data || []);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        // setError("Error loading data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Handle search effects
  useEffect(() => {
    if (searchMobile.length >= 3) {
      debouncedSearch(searchMobile);
    } else {
      setFilteredInvoice([]); // Clear filtered results
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchMobile]);

  // Determine which data to display
  const displayData = searchMobile.length >= 3 ? filteredInvoice : candidates;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceDetails({ ...invoiceDetails, [name]: value });
  };

  const handlePaymentChange = (index, event) => {
    const { name, value } = event.target;
    const newPayments = [...payments];
    newPayments[index][name] = value;
    setPayments(newPayments);
  };

  const handleItemChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: "", quantity: "", rate: "", amount: "" }]);
  };

  const addPayment = () => {
    setPayments([...payments, { date: "", mode: "", amount: "" }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const removePayment = (index) => {
    const newPayments = payments.filter((_, i) => i !== index);
    setPayments(newPayments);
  };

  const [imgData, setImgData] = useState("");

  // Convert local image to base64
  useEffect(() => {
    const loadImage = async () => {
      try {
        const response = await fetch("/Admin-img/logo.png");
        // Update this path
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setImgData(reader.result);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    loadImage();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add PNG Image from base64
    if (imgData) {
      doc.addImage(imgData, "PNG", 150, 10, 40, 40); // Adjusted image position
    } else {
      console.error("Image data is not available.");
    }

    // Title with "PAID" Text
    doc.setFontSize(16);
    const title = "Invoice";
    const paidText = "PAID";

    // Title positioning
    doc.setTextColor(0, 0, 0); // Black text
    doc.text(title, 20, 20);

    // Add "PAID" text with green background
    const paidTextWidth = doc.getTextWidth(paidText);
    const paidTextX = 20 + doc.getTextWidth(title) + 5; // Position "PAID" next to "Invoice"
    const titleY = 20;

    doc.setFillColor(0, 128, 0); // Green background for "PAID"
    doc.rect(paidTextX - 3, titleY - 4, paidTextWidth + 6, 10, "F"); // Background rectangle
    doc.setTextColor(255, 255, 255); // White text color
    doc.text(paidText, paidTextX, titleY + 3);

    // Font sizes
    const headingFontSize = 12;
    const valueFontSize = 10;

    // Helper function to wrap text within a given width
    const wrapText = (text, x, y, maxWidth) => {
      const lines = doc.splitTextToSize(text, maxWidth);
      lines.forEach((line, index) => {
        doc.text(line, x, y + index * 5); // Adjust line spacing if needed
      });
      return lines.length * 5; // Return the total height used by the text
    };

    // Billed By Section
    const billedByX = 15;
    const billedByY = 50; // Adjusted to position below the title
    const width = 85;
    const radius = 5; // Radius for rounded corners

    // Calculate text height
    const billedByNameHeight = wrapText(
      invoiceDetails.billedByName,
      billedByX + 5,
      billedByY + 20,
      width - 10
    );
    const billedByAddressHeight = wrapText(
      invoiceDetails.billedByAddress,
      billedByX + 5,
      billedByY + 20 + billedByNameHeight,
      width - 10
    );

    // Adjust height of the rectangle dynamically
    const billedByHeight =
      billedByY + 20 + billedByNameHeight + billedByAddressHeight;
    drawRoundedRect(
      doc,
      billedByX,
      billedByY,
      width,
      billedByHeight - billedByY,
      radius
    );

    doc.setTextColor(0, 0, 0); // Black text
    doc.setFontSize(headingFontSize);
    doc.text("Billed By:", billedByX + 5, billedByY + 10);
    doc.setFontSize(valueFontSize);
    wrapText(
      invoiceDetails.billedByName,
      billedByX + 5,
      billedByY + 20,
      width - 10
    );
    wrapText(
      invoiceDetails.billedByAddress,
      billedByX + 5,
      billedByY + 20 + billedByNameHeight,
      width - 10
    );

    // Billed To Section
    const billedToX = 110;
    const billedToY = billedByY; // Start at the same vertical position as "Billed By"

    // Calculate text height
    const billedToNameHeight = wrapText(
      invoiceDetails.billedToName,
      billedToX + 5,
      billedToY + 20,
      width - 10
    );
    const billedToAddressHeight = wrapText(
      invoiceDetails.billedToAddress,
      billedToX + 5,
      billedToY + 20 + billedToNameHeight,
      width - 10
    );

    // Adjust height of the rectangle dynamically
    const billedToHeight =
      billedToY + 20 + billedToNameHeight + billedToAddressHeight;
    drawRoundedRect(
      doc,
      billedToX,
      billedToY,
      width,
      billedToHeight - billedToY,
      radius
    );

    doc.setTextColor(0, 0, 0); // Black text
    doc.setFontSize(headingFontSize);
    doc.text("Billed To:", billedToX + 5, billedToY + 10);
    doc.setFontSize(valueFontSize);
    wrapText(
      invoiceDetails.billedToName,
      billedToX + 5,
      billedToY + 20,
      width - 10
    );
    wrapText(
      invoiceDetails.billedToAddress,
      billedToX + 5,
      billedToY + 20 + billedToNameHeight,
      width - 10
    );

    // Table Headers and Rows
    const tableStartY = Math.max(billedByHeight, billedToHeight) + 20; // Position below the taller section
    doc.autoTable({
      startY: tableStartY,
      head: [["Item", "Quantity", "Rate", "Amount"]],
      body: items.map((item) => [
        item.name,
        item.quantity,
        item.rate,
        item.amount,
      ]),
      theme: "grid",
      headStyles: {
        fillColor: [128, 0, 128], // Purple
        textColor: [255, 255, 255], // White
      },
      styles: {
        fillColor: [240, 240, 255], // Light grey-purple
        textColor: [0, 0, 0], // Black
      },
      margin: { top: 10, right: 10, bottom: 10, left: 10 },
    });

    // Payments Section
    const paymentsStartY = doc.autoTable.previous.finalY + 20; // Position below the table
    doc.text("Payments:", 16, paymentsStartY);
    doc.autoTable({
      startY: paymentsStartY + 10, // Start below the "Payments" label
      head: [["Date", "Mode", "Amount"]],
      body: payments.map((payment) => [
        payment.date,
        payment.mode,
        payment.amount,
      ]),
      theme: "grid",
      headStyles: {
        fillColor: [128, 0, 128], // Purple
        textColor: [255, 255, 255], // White
      },
      styles: {
        fillColor: [240, 240, 255], // Light grey-purple
        textColor: [0, 0, 0], // Black
      },
      margin: { top: 10, right: 10, bottom: 10, left: 10 },
    });

    // Terms & Conditions Section
    const termsX = 15;
    const termsY = doc.autoTable.previous.finalY + 20; // Position below the payments section
    const termsWidth = 180; // Same width as other sections

    // Title and text positioning
    const termsTitleHeight = 20; // Height of title
    const termsText = [
      "1. Fees paid is not transferrable and non-refundable.",
      "2. Placement charges are applicable upon receipt of offer letter.",
      "3. Fees paid shall be applicable for the batch only for which admission is taken.",
      "4. Batch transfer charges (Rs. 5000) shall be applicable in case you want to change your current batch.",
      "5. If fees are paid in instalment, then the first instalment shall be paid at the time of admission and the next instalment shall be paid within 25 days of admission.",
    ];
    const termsTextHeight = termsText.reduce(
      (height, line) =>
        height +
        wrapText(
          line,
          termsX + 5,
          termsY + height + termsTitleHeight,
          termsWidth - 10
        ),
      0
    );

    // Adjust height of the rectangle dynamically
    drawRoundedRect(
      doc,
      termsX,
      termsY,
      termsWidth,
      termsTitleHeight + termsTextHeight,
      radius
    );

    doc.setTextColor(0, 0, 0); // Black text
    doc.setFontSize(headingFontSize);
    doc.text("Terms & Conditions:", termsX + 5, termsY + 10); // Title above the rectangle
    doc.setFontSize(valueFontSize);
    termsText.forEach((line, index) => {
      wrapText(line, termsX + 5, termsY + 16 + index * 6, termsWidth - 10); // Adjust spacing between lines
    });

    //generate pdf
    // doc.save("invoice.pdf");
    return doc;
  };

  // Helper function to draw a rounded rectangle
  const drawRoundedRect = (doc, x, y, width, height, radius) => {
    doc.setFillColor(240, 240, 255); // Light grey-purple

    // Draw the rounded rectangle
    doc.setDrawColor(0, 0, 0); // Border color (black)
    doc.setLineWidth(0.5); // Border width

    doc.roundedRect(x, y, width, height, radius, radius, "F"); // 'F' for fill
    doc.roundedRect(x, y, width, height, radius, radius, "S"); // 'S' for stroke
  };

  // const [candidateName, setCandidateName] = useState("");
  const [candidateMobile, setCandidateMobile] = useState("");
  const [candidateMail, setCandidateMail] = useState("");
  // const [organizationName, setOrganizationName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    //extracted from invoice-form using destructuring the form.
    const { billedByName, billedToName } = invoiceDetails;
    // Generate the PDF
    // const doc = new jsPDF(); // Assuming generatePDF is generating the doc here

    let doc;
    try {
      doc = generatePDF();
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Error generating PDF");
      return;
    }

    // Get the PDF as a Blob
    const pdfBlob = doc.output("blob");

    // Log PDF Blob size and type
    console.log("PDF Blob Size:", pdfBlob.size);
    console.log("PDF Blob Type:", pdfBlob.type);

    // Prepare the form data
    const formData = new FormData();
    formData.append("billedToName", billedToName);
    formData.append("candidateMobile", candidateMobile);
    formData.append("candidateMail", candidateMail);
    formData.append("billedByName", billedByName);
    formData.append("invoicePdf", pdfBlob, "invoice.pdf"); // Attach the PDF blob

    setLoading(true);
    try {
      // Make the POST request to the backend
      const response = await axios.post(
        "http://localhost:8080/save-invoice",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Invoice Sended Successfully!!");
        console.log("Invoice uploaded successfully");
        // You can add toast notification or further success logic here
      } else {
        console.error("Error uploading the invoice");
      }
    } catch (error) {
      console.error("Error during invoice upload:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
      toast.error("Invoice sending failed!");
    } finally {
      setLoading(false); // Hide the spinner
    }
  };

  // handling candidate info on select btn to fill billToSection  automatically.
  const handleCandidateSelection = (candidate) => {
    setInvoiceDetails((prevState) => ({
      ...prevState,
      billedToName: candidate.fieldsData["Full Name"],
      billedToAddress: candidate.fieldsData["Address"],
    }));
    setCandidateMobile(candidate.fieldsData["Mobile"]);
    setCandidateMail(candidate.fieldsData["Mail"]);
    setShowCandidateModal(false);
  };

  return (
    <div className="invoice-gen-root">
      {loading && (
        <div className="invoice-gen-form-spinner-overlay">
          <ClipLoader color="#ffffff" loading={loading} size={100} />
        </div>
      )}
      <ToastContainer />
      <h1 className="invoice-gen-title">Invoice</h1>
      <div id="invoice-gen-section" className="invoice-gen-section">
        {/* Billed By Section */}
        <div className="invoice-gen-details">
          <h3 className="invoice-gen-header">Billed By</h3>
          <div className="invoice-gen-input-group">
            <div className="invoice-gen-input-container">
              <label htmlFor="billedByName">Organization Name</label>
              <input
                type="text"
                id="billedByName"
                name="billedByName"
                placeholder="Enter Organization Name"
                value={invoiceDetails.billedByName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="invoice-gen-input-container">
              <label htmlFor="billedByAddress">Address</label>
              <input
                type="text"
                id="billedByAddress"
                name="billedByAddress"
                placeholder="Billed By Address"
                value={invoiceDetails.billedByAddress}
                required
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Billed To Section */}
        <div className="invoice-gen-party-details">
          <div className="select-candidate-btn-div">
            <button
              className="select-candidate-btn"
              onClick={() => setShowCandidateModal(true)}
            >
              select candidate
            </button>
            <button
              className="history-candidate-btn"
              onClick={() => setIsTableVisible(!isTableVisible)}
            >
              <HistoryOutlined />
            </button>
          </div>

          {showCandidateModal && (
            <div className="candidate-modal">
              <div className="candidate-modal-content">
                <h3 className="candidate-modal-header">Select a Candidate</h3>
                <button
                  className="candidate-close-btn"
                  onClick={() => setShowCandidateModal(false)}
                >
                  &times;
                </button>
                <div className="candidate-table-container">
                  {data.length > 0 ? (
                    <table className="candidate-table">
                      <thead>
                        <tr>
                          <th>UID</th>
                          <th>Full Name</th>
                          <th>Address</th>
                          <th>Mobile</th>
                          <th>Mail</th>
                          <th>Fees Paid</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item, index) => (
                          <tr key={index}>
                            <td>{item.uid}</td>
                            <td>{item.fieldsData["Full Name"]}</td>
                            <td>{item.fieldsData["Address"]}</td>
                            <td>{item.fieldsData["mobile number"]}</td>
                            <td>{item.fieldsData["Mail"]}</td>
                            <td>{item.fieldsData["fees compeletion"]}</td>
                            <td>
                              <button
                                className="candidate-select-btn"
                                onClick={() => handleCandidateSelection(item)}
                              >
                                Select
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="no-client-message">No Client Found 🙃</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {isTableVisible && (
            <div className="history-candidate-root">
              <div className="get-candidate-table-container">
                <button
                  className="candidate-close-btn"
                  onClick={() => setIsTableVisible(false)}
                >
                  &times;
                </button>
                <h2 className="get-candidate-table-title">
                  Invoice Status List
                </h2>

                <div>
                  <input
                    className="w-full px-4 py-1 mr-1 border outline-none  rounded-lg focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400"
                    type="text"
                    name=""
                    id="invoice-search-id"
                    value={searchMobile}
                    onChange={handleInputSearchChange}
                    maxLength={10}
                    placeholder="Search Batch"
                  />

                  <button className="scholar-add-student-btn w-half bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-5 rounded-lg transition-colors duration-200">
                    Search
                  </button>
                </div>

                {/* 
                <div>
                  <input placeholder="Search invoice by mobile number"
                    type="text"
                    name=""
                    id="invoice-search-id"
                    value={searchMobile}
                    onChange={handleInputSearchChange}
                    maxLength={10}
                  />
                  <button
                   className="scholar-add-student-btn w-half bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-10 rounded-lg transition-colors duration-200"
                    id="invoice-search-btn"
                    onClick={() => handleInvoiceSearch(searchMobile)}
                    disabled={!isValidMobileNumber(searchMobile) || isLoading}
                  >
                     {isLoading ? "Searching..." : "Search"}
                    Search
                  </button>
                </div> */}

                {isLoading ? (
                  <div className="text-center p-4">Searching...</div>
                ) : displayData.length > 0 ? (
                  <div className="get-candidate-table-wrapper">
                    <table className="get-candidate-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Mobile</th>
                          <th>Email</th>
                          <th>Date & Time</th>
                          <th>Invoice Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayData.map((candidate) => (
                          <tr key={candidate.id}>
                            <td>{candidate.id || "N/A"}</td>
                            <td>{candidate.candidateName || "N/A"}</td>
                            <td>{candidate.candidateMobile || "N/A"}</td>
                            <td>{candidate.candidateMail || "N/A"}</td>
                            <td>{candidate.invoiceCreatedAt || "N/A"}</td>
                            <td>
                              <span className="get-candidate-invoice-status">
                                Done
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center p-4">No Invoice Status 🙃</div>
                )}
              </div>
            </div>
          )}

          <h3 className="invoice-gen-header">Billed To</h3>

          <div className="invoice-gen-input-group">
            <div className="invoice-gen-input-container">
              <label htmlFor="billedToName">Candidate Name</label>
              <input
                type="text"
                id="billedToName"
                name="billedToName"
                placeholder="Enter Receiver Name"
                value={invoiceDetails.billedToName}
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="invoice-gen-input-container">
              <label htmlFor="billedToMobileNumber">Mobile Number</label>
              <input
                type="text"
                id="billedToMobileNumber"
                name="billedToMobileNumber"
                placeholder="Enter mobile number"
                value={candidateMobile}
                required
                onChange={(e) => setCandidateMobile(e.target.value)}
              />
            </div>

            <div className="invoice-gen-input-container">
              <label htmlFor="billedToMail">Mail</label>
              <input
                type="text"
                id="billedToMail"
                name="billedToMail"
                placeholder="Enter mail id"
                value={candidateMail}
                required
                onChange={(e) => setCandidateMail(e.target.value)}
              />
            </div>

            <div className="invoice-gen-input-container">
              <label htmlFor="billedToAddress">Address</label>
              <input
                type="text"
                id="billedToAddress"
                name="billedToAddress"
                placeholder="Billed To Address"
                value={invoiceDetails.billedToAddress}
                required
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div className="invoice-gen-items-section">
          <h3 className="invoice-gen-header">Items</h3>
          {items.map((item, index) => (
            <div key={index} className="invoice-gen-input-group">
              <div className="invoice-gen-input-container">
                <label htmlFor={`itemName-${index}`}>Item</label>
                <select
                  name="name"
                  id={`itemName-${index}`}
                  value={item.name}
                  required
                  onChange={(e) => handleItemChange(index, e)}
                >
                  <option value="" disabled>
                    Select course type
                  </option>
                  <option value="Java fullStack development">
                    Java fullStack development
                  </option>
                  <option value="Automation Testing">Automation Testing</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="MERN Stack">MERN Stack</option>
                  {/* Add more options as needed */}
                </select>
              </div>

              <div className="invoice-gen-input-container">
                <label htmlFor={`itemQuantity-${index}`}>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  id={`itemQuantity-${index}`}
                  placeholder="Quantity"
                  value={item.quantity}
                  required
                  onChange={(e) => handleItemChange(index, e)}
                />
              </div>
              <div className="invoice-gen-input-container">
                <label htmlFor={`itemRate-${index}`}>Rate</label>
                <input
                  type="number"
                  name="rate"
                  id={`itemRate-${index}`}
                  placeholder="Rate"
                  value={item.rate}
                  required
                  onChange={(e) => handleItemChange(index, e)}
                />
              </div>
              <div className="invoice-gen-input-container">
                <label htmlFor={`itemAmount-${index}`}>Amount</label>
                <input
                  type="number"
                  name="amount"
                  id={`itemAmount-${index}`}
                  placeholder="Amount"
                  value={item.amount}
                  required
                  onChange={(e) => handleItemChange(index, e)}
                />
              </div>
              <button
                className="invoice-gen-remove-item-button"
                onClick={() => removeItem(index)}
              >
                Remove Item
              </button>
            </div>
          ))}
          <button className="invoice-gen-add-item-button" onClick={addItem}>
            Add Item
          </button>
        </div>

        {/* Payments Section */}
        <div className="invoice-gen-payments-section">
          <h3 className="invoice-gen-header">Payments</h3>
          {payments.map((payment, index) => (
            <div key={index} className="invoice-gen-input-group">
              <div className="invoice-gen-input-container">
                <label htmlFor={`paymentDate-${index}`}>Date</label>
                <input
                  type="date"
                  name="date"
                  id={`paymentDate-${index}`}
                  placeholder="Payment Date"
                  value={payment.date}
                  required
                  onChange={(e) => handlePaymentChange(index, e)}
                />
              </div>
              <div className="invoice-gen-input-container">
                <label htmlFor={`paymentMode-${index}`}>Mode</label>
                <input
                  type="text"
                  name="mode"
                  id={`paymentMode-${index}`}
                  placeholder="Payment Mode"
                  value={payment.mode}
                  required
                  onChange={(e) => handlePaymentChange(index, e)}
                />
              </div>
              <div className="invoice-gen-input-container">
                <label htmlFor={`paymentAmount-${index}`}>Amount</label>
                <input
                  type="number"
                  name="amount"
                  id={`paymentAmount-${index}`}
                  placeholder="Payment Amount"
                  value={payment.amount}
                  required
                  onChange={(e) => handlePaymentChange(index, e)}
                />
              </div>
              <button
                className="invoice-gen-remove-payment-button"
                onClick={() => removePayment(index)}
              >
                Remove Payment
              </button>
            </div>
          ))}
          <button
            className="invoice-gen-add-payment-button"
            onClick={addPayment}
          >
            Add Payment
          </button>
        </div>
      </div>

      <div className="invoice-gen-footer">
        {/* <button
          className="invoice-gen-generate-pdf-button"
          onClick={generatePDF}
        >
          Get Invoice PDF
        </button> */}
        <button
          className="invoice-gen-generate-pdf-button bg-indigo-700"
          onClick={handleSubmit}
        >
          Send Invoice
        </button>
      </div>
    </div>
  );
};

// Invoice.propTypes = {
//   templateId: PropTypes.string.isRequired,
// };

export default Invoice;
