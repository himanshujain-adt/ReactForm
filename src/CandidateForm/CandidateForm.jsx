import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import uploadIcon from "../assets/upload-resume.png";
import './CandidateForm.css';
// import { LuMailSearch } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
const CandidateForm = () => {

  const [selectedDays, setSelectedDays] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [suggestedValues, setSuggestedValues] = useState([]);
  const [formData, setFormData] = useState({
    candidateId: 'C12345',
    jobTitles: [],
    manager: false,
    desiredLocations: [],
    fullRemote: false,
    lowestSalary: '',
    undesiredRoles: [],
    undesiredCompanies: [],
    candidateResume: '',
    candidateResumePath: '',
    maxJobAgeDays: 30,
    runId: 'Run123',
    splitByCountry: true,
    seniorityLevel: 'Senior',
    minimumSalary: '',
    minimumScore: '',
    desiredCompanies: '',
    desiredIndustries: '',
    desiredCompanySize: '',
    desiredLocation: '',
    reportSchedule: '',
    jobLocation: '',
    undesiredIndustries: '',
    undesiredCompanySize: '',
    undesiredLocation: '',
    distributionList: [],
    physicalLocation: '',
    candidateName: '',
    candidateEmail: ''


  });
  const [isPopupVisible, setPopupVisible] = useState(false);


  const handleOkClick = () => {
    setPopupVisible(false);
    window.location.reload();
    // Reset the form here if needed
  };

  const [errors, setErrors] = useState({
    jobTitles: '',
    minimumSalary: '',
    minimumScore: '',
    desiredCompanies: '',
    desiredIndustries: '',
    desiredCompanySize: '',
    desiredLocation: '',
    reportSchedule: '',
    jobType: '',
    undesiredCompanies: '',
    undesiredIndustries: '',
    undesiredCompanySize: '',
    undesiredLocation: '',
    distributionList: '',
    physicalLocation: '',
    candidateName: '',
    candidateEmail: ''

  });
  const dropdownRef = useRef(null);
  const locationDropdownRef = useRef(null);
  const jobTypedropdownRef = useRef(null);
  const typedRef = useRef(null);
  const days = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday', 'Sunday'
  ];
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [isJobTypeOpen, setIsJobTypeOpen] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);  // To store the file object
  const [uploading, setUploading] = useState(false);  // To track if the file is being uploaded
  const [progress, setProgress] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [filteredSuggestions1, setFilteredSuggestions1] = useState([]);

 


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      setFile(selectedFile);
      setUploading(true);  // Start the upload state
      simulateUploadProgress();  // Simulate upload progress
    }
  };


  // Simulate the file upload progress
  const simulateUploadProgress = () => {
    let uploaded = 0;
    const interval = setInterval(() => {
      if (uploaded < 100) {
        uploaded += 10;
        setProgress(uploaded);
      } else {
        clearInterval(interval);
      }
    }, 200); // Update progress every 500ms
  };

  // Handle file removal
  const handleRemoveFile = () => {
    setFileName('');
    setFile(null);
    setUploading(false);
    setProgress(0);
  };

  const locations = ['Work From Home (WFH)', 'Work From Office (WFO)', 'Hybrid'];
  const jobTypes = ['Full Time', 'Part Time', 'Contract', 'Internship'];

  const handleLocationToggle = (location) => {

    console.log('Location:==========>>>>>>>>>>', location);
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((loc) => loc !== location)
        : [...prev, location]
    );
  };



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);

      }
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target)
      ) {
        setIsLocationOpen(false);
      }
      if (
        jobTypedropdownRef.current &&
        !jobTypedropdownRef.current.contains(event.target)
      ) {
        setIsJobTypeOpen(false);
      }

    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDayToggle = (day) => {
    setSelectedDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const getButtonText = () => {
    if (selectedDays.length === 0) return 'Select Day Of The Week';
    if (selectedDays.length === days.length) return 'All Days Selected';
    return `${selectedDays.length} Day${selectedDays.length > 1 ? 's' : ''} Selected`;
  };
  const validate = () => {
    const newErrors = {
      jobTitles: '',
      minimumSalary: '',
      minimumScore: '',
      desiredCompanies: '',
      desiredIndustries: '',
      desiredCompanySize: '',
      desiredLocation: '',
      reportSchedule: '',
      jobType: '',
      jobLocation: '',
      undesiredCompanies: '',
      undesiredIndustries: '',
      undesiredCompanySize: '',
      undesiredLocation: '',
      distributionList: '',
      physicalLocation: '',
      candidateName: '',
      candidateEmail: ''



    };

    // Validation rule: jobTitles should not be empty and should contain at least one job title
    if (!formData.jobTitles || formData.jobTitles.length === 0) {
      newErrors.jobTitles = 'Please enter at least one job title.';
    }

    if (!formData.distributionList || formData.distributionList.length === 0) {
      newErrors.distributionList = 'Distribution List is required';
    }
    else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!emailRegex.test(formData.distributionList)) {
        newErrors.distributionList = 'Invalid email format';
      }
    }

    if (!formData.physicalLocation || formData.physicalLocation.length === 0) {
      newErrors.physicalLocation = 'Physical Location is required';
    }
    if (!formData.candidateName || formData.candidateName.length === 0) {
      newErrors.candidateName = 'Candidate Name is required';
    }
    if (!formData.candidateEmail || formData.candidateEmail.length === 0) {
      newErrors.candidateEmail = 'Email is required';
    }
    else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!emailRegex.test(formData.candidateEmail)) {
        newErrors.candidateEmail = 'Invalid email format';
      }
    }


    if (!file) {
      newErrors.resume = 'Please upload your resume';
    }
    // Minimum Salary validation (ensure it's not empty)

    if (!formData.minimumSalary.trim()) {
      newErrors.minimumSalary = 'Please enter a minimum salary.';
    } else if (isNaN(formData.minimumSalary)) {
      newErrors.minimumSalary = 'Please enter a valid number for salary.';
    }
    const score = formData.minimumScore.trim();

    // Check if the score is empty
    if (!score) {
      newErrors.minimumScore = 'Please enter a minimum score.';
    } else {

      const numericScore = score.endsWith('%')
        ? parseFloat(score.slice(0, -1))
        : parseFloat(score);

      if (isNaN(numericScore)) {
        newErrors.minimumScore = 'Please enter a valid numeric value for the score.';
      } else if (numericScore < 0 || numericScore > 100) {
        newErrors.minimumScore = 'Score must be between 0 and 100.';
      }
    }

    // Job Type validation
    if (selectedJobTypes.length === 0) {
      newErrors.jobType = 'Please select at least one job type';
    }

    // Validation for Report Schedule
    if (selectedDays.length === 0) {
      newErrors.reportSchedule = 'Please select at least one day for report schedule';
    }
    if (selectedJobTypes.length === 0) {
      newErrors.jobType = 'Please select at least one job type';
    }

    // Job Location validation
    if (selectedLocations.length === 0) {
      newErrors.jobLocation = 'Please select at least one job location';
    }


    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');;
  };

  const handleFormSubmit = async (event) => {


    event.preventDefault();
    const validationErrors = validate();
    console.log('Validation Errors:', validationErrors);

    if (validationErrors) {
      setPopupVisible(true);
    }

    console.log('Form submitted:', formData);
    // const payload = {
    //   prefs: formData,
    //   dayOfWeek: selectedDays[0] || '',  // You can adjust this logic as needed
    // };

    // try {
    //   const response = await axios.post('/schedule', payload, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });

    //   console.log('API Response:', response.data);
    // } catch (error) {
    //   console.error('Error submitting form:', error);
    // }

  };
  const handleJobTitleChange = (e) => {
    const value = e.target.value;

    // Regular expression to allow only alphabets and spaces
    const regex = /^[a-zA-Z\s]*$/;

    // If input matches the regex, update the state
    if (regex.test(value)) {
      setFormData({ ...formData, jobTitles: value });
    }
  };
  const handleDistributionListChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, distributionList: value });

  };
  const handlePhysicalLocationChange = (e) => {
    const value = e.target.value;

    // Regular expression to allow only alphabets and spaces
    const regex = /^[a-zA-Z\s]*$/;

    // If input matches the regex, update the state
    if (regex.test(value)) {
      setFormData({ ...formData, physicalLocation: value });
    }

  };

  const handleCandidateNameChange = (e) => {
    const value = e.target.value;

    // Regular expression to allow only alphabets and spaces
    const regex = /^[a-zA-Z\s]*$/;

    // If input matches the regex, update the state
    if (regex.test(value)) {
      setFormData({ ...formData, candidateName: value });
    }

  };


const handleRunAndSubmit = async (event) => {
  event.preventDefault();
  
  // Format the data according to API requirements
  const payload = {
    prefs: {
      candidateId: "shoaibkhan.adt@gmail.com",
      candidateName: formData.candidateName,
      jobTitles: formData.jobTitles ? formData.jobTitles   : [],
      jobLocations: selectedLocations.map(loc => {
        switch (loc) {
          case "Work From Home (WFH)": return "WFH";
          case "Work From Office (WFO)": return "WFO";
          case "Hybrid": return "HYBRID";
          default: return loc.toUpperCase();
        }
      }),
      jobTypes: selectedJobTypes.map(type => {
        switch (type) {
          case "Full Time": return "FULL";
          case "Part Time": return "PART TIME";
          case "Contract": return "CONTRACT";
          case "Internship": return "INTERNSHIP";
          default: return type.toUpperCase();
        }
      }),
      desiredLocations: formData.desiredLocation ? formData.desiredLocation : [],
      physicalLocation: formData.physicalLocation ? formData.physicalLocation.toUpperCase() : "",
      fullRemote: selectedLocations.includes("Work From Home (WFH)"),
      lowestSalary: formData.minimumSalary.toString(),
      undesiredRoles: formData.undesiredRoles ? formData.undesiredRoles : [], // Added field// Add this field if you have it in your form
      undesiredCompanies: formData.undesiredCompanies ? formData.undesiredCompanies : [],
      candidateResume:  "",
      candidateResumePath:  "home/ubuntu/Ajay_Resume.pdf",
      maxJobAgeDays: 10,
      runId: "",
      splitByCountry: true,
      desiredComapanies: formData.desiredCompanies ? [formData.desiredCompanies] : [],
      desiredIndustry: formData.desiredIndustries ? [formData.desiredIndustries.toUpperCase()] : [],
      undesiredIndustry: formData.undesiredIndustries ? [formData.undesiredIndustries.toUpperCase()] : [],
      desiredCompanySize: formData.desiredCompanySize,
      undesiredCompanySize: formData.undesiredCompanySize,
      reportSchedules: selectedDays.map(day => day.toUpperCase())
    },
    distributionList: formData.distributionList ? [formData.distributionList] : []
  };

  try {
    const response = await axios.post(
      `http://3.110.181.207:8087/schedule?initialize=true&emails=${encodeURIComponent(formData.distributionList)}`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.status === 200) {
      setPopupVisible(true);
      console.log('API Response:', response.data);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Error submitting form. Please try again.');
  }
};






  const handleCandidateEmailChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, candidateEmail: value });
  };

  const handleSearchClick = async () => {
    const userEmail = formData.candidateEmail;
    console.log("User Email:", userEmail);

    if (!userEmail) {
      setErrors({ candidateEmail: "Please enter an email" });
      return;
    }

    try {
      const response = await fetch(`http://3.110.181.207:8087/getUserVerification?userEmail=${encodeURIComponent(userEmail)}`);
      // const response = await fetch(``);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      console.log("API Response:", data); // Log the response

      setFormData((prevData) => ({
        ...prevData,

        candidateName: data.prefs.candidateName,
        candidateEmail: data.prefs.candidateEmail,
        jobTitles: data.prefs.jobTitles,
        minimumSalary: "$" + data.prefs.lowestSalary,
       
        desiredLocation: data.prefs.desiredLocations,
        desiredCompanies: data.prefs.desiredComapanies.join(", "),  // If it's an array, join it as a string
        desiredIndustries: data.prefs.desiredIndustry.join(", "),  // Same for array fields
        desiredCompanySize: data.prefs.desiredCompanySize,
       // desiredLocation: data.prefs.desiredLocations,
        jobLocation: data.prefs.jobLocations,  // If it's an array, join it as a string
       // distributionList: data.prefs.distributionList,  // Same for array fields
        // jobLocation: data.prefs.jobLocations.join(", "),
         physicalLocation: data.prefs.physicalLocation,
        //minimumScore: data.prefs.minimumScore,
        // jobType: data.prefs.jobType,
        // reportSchedule: data.prefs.reportSchedule,
        undesiredCompanies: data.prefs.undesiredCompanies,
        // undesiredCompanies: data.prefs.undesiredCompanies.join(", "),
        undesiredIndustries: data.prefs.undesiredIndustry,
         undesiredCompanySize: data.prefs.undesiredCompanySize,
        // undesiredLocation: data.prefs.undesiredLocation,


      }));
      //vverma.aws@gmail.com
      console.log("Candidate Name====>>>>>>>>>>>>>>:", data.prefs.candidateName);
      console.log("jobTitles====>>>>>>>>>>>>>>:", data.prefs.jobTitles);
      console.log("CandidateEmail====>>>>>>>>>>>>>>:", data.prefs.candidateId);
      console.log("UndesiredCompanies====>>>>>>>>>>>>>>:", data.prefs.undesiredCompanies);
      console.log("jobLocations=====>>>>>>", data.prefs.jobLocations)
      console.log("DistributionList=====>>>>>>", data.prefs.distributionList)

      // Optionally, you can handle the API response data here.
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const salarySuggestions = [
    "$25000",
    "$50000",
    "$75000",
    "$100000",
    "$150000",
    "$200000"
  ];
  const formatSalary = (salary) => {
    // Format salary value with commas and add the dollar sign back
    return salary.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const handleSalaryChange = (e) => {
    const value = e.target.value;

    // Remove any non-numeric characters (except for periods)
    const formattedValue = value.replace(/[^0-9.]/g, '');


    // Update form data
    setFormData((prevData) => ({ ...prevData, minimumSalary: formattedValue }));

    // Filter suggestions based on user input
    if (formattedValue) {
      const filtered = salarySuggestions.filter(suggestion =>
        suggestion.replace(/[^0-9]/g, '').includes(formattedValue)
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };
  const handleSuggestionClick = (suggestion) => {
    // Set the selected suggestion to the input field
    setFormData((prevData) => ({ ...prevData, minimumSalary: suggestion }));
    setFilteredSuggestions([]); // Hide suggestions after selection
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });


  };


  const DesiredIndustriesSuggestions = [
    "0-50",
    "51-150",
    "151-500",
    "501-1000"
  ];



  const handleDesiredCompanySizeChange = (e) => {
    const value = e.target.value;

    // Remove any non-numeric characters (except for periods)
    const formattedValue = value.replace(/[^0-9.]/g, '');


    // Update form data
    setFormData((prevData) => ({ ...prevData, desiredCompanySize: formattedValue }));

    // Filter suggestions based on user input
    if (formattedValue) {
      const filtered = DesiredIndustriesSuggestions.filter(suggestion =>
        suggestion.replace(/[^0-9]/g, '').includes(formattedValue)
      );
      setFilteredSuggestions1(filtered);
    } else {
      setFilteredSuggestions1([]);
    }
  };

  const handleSuggestionClick1 = (suggestion) => {
    // Set the selected suggestion to the input field
    setFormData((prevData) => ({ ...prevData, desiredCompanySize: suggestion }));
    setFilteredSuggestions1([]); // Hide suggestions after selection
  };


  return (



    <div className="main-container">
      <div className="container">
        <motion.div className="form-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="candidate-details-header mb-3">
            <h2 className="header-title">   <span> Candidate Details </span></h2>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className="row g-4">
              {/* Candidate Name */}
              <motion.div
                className="col-md-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{}}
              >


                <div className="form-group">
                  <label
                    className="form-label"
                  >
                    Candidate Name
                  </label>
                  <input
                    type="text"
                    className={`form-control form-input rounded-3 bold-text ${errors.candidateName ? 'is-invalid' : ''}`}
                    placeholder="e.g John Doe"
                    value={formData.candidateName}
                    onChange={handleCandidateNameChange}
                  />

                  {errors.candidateName && <div className="invalid-feedback">{errors.candidateName}</div>}


                </div>
              </motion.div>
            
              <motion.div
                className="col-md-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{}}
              >
                <div className="form-group" style={{ display: "flex", position: "relative" }}>
                  <div style={{ width: "100%" }}>
                    <label className="form-label">
                      Candidate Email
                    </label>

                    <input
                      type="text"
                      className={`form-control form-input rounded-3 bold-text ${errors.candidateEmail ? 'is-invalid' : ''}`}
                      placeholder="e.g johndoe@gmail.com"
                      value={formData.candidateEmail}
                      onChange={handleCandidateEmailChange}
                      style={{ paddingRight: "40px" }}  // Add padding for space for the icon
                    />

                    {errors.candidateEmail && <div className="invalid-feedback">{errors.candidateEmail}</div>}
                  </div>

                  {/* Icon positioned inside the input field */}
                  <FaSearch
                    style={{
                      position: "absolute",
                      right: "20px",
                      top: "60%",


                      color: "grey",
                      cursor: "pointer"
                    }}
                    size={25}
                    title='search'
                    onClick={handleSearchClick}
                  />
                </div>
              </motion.div>

              {/* Target Job Title */}
              <motion.div
                className="col-md-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{}}
              >


                <div className="form-group">
                  <label
                    className="form-label"
                  >
                    Target Job Title
                  </label>
                  <input
                    type="text"
                    className={`form-control form-input rounded-3 bold-text ${errors.jobTitles ? 'is-invalid' : ''}`}
                    placeholder="e.g Java Developer"
                    value={Array.isArray(formData.jobTitles) ? formData.jobTitles.join(', ') : formData.jobTitles}
                    onChange={handleJobTitleChange}
                  />

                  {errors.jobTitles && <div className="invalid-feedback">{errors.jobTitles}</div>}


                </div>
              </motion.div>


              {/* Job Location */}
                <motion.div
      className="col-md-6"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="form-group">
        <label className="form-label">Job Location</label>
        <div
          className={`dropdown ${errors.jobLocation ? "is-invalid" : ""}`}
          ref={locationDropdownRef}
        >
          <motion.button
            className={`btn custom-dropdown-button dropdown-toggle form-input rounded-3 w-100 text-start ${errors.jobLocation ? "border-danger" : ""
              }`}
            type="button"
            onClick={() => setIsLocationOpen((prev) => !prev)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {selectedLocations.length === 0
              ? "Select Job Location"
              : selectedLocations.length === 1
              ? selectedLocations[0]
              : `${selectedLocations.length} locations selected`}
          </motion.button>
          {errors.jobLocation && (
            <div className="invalid-feedback d-block">
              {errors.jobLocation}
            </div>
          )}
          <motion.div
            className={`dropdown-menu custom-dropdown-menu ${isLocationOpen ? "show" : ""
              }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLocationOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {locations.map((location) => (
              <div key={location} className="form-check mb-2">
                <input
                  className="form-check-input border border-dark"
                  type="checkbox"
                  id={`${location.toLowerCase().replace(/[\s()]+/g, "-")}Checkbox`}
                  checked={selectedLocations.includes(location)}
                  onChange={() => handleLocationToggle(location)}
                />
                <label
                  className="form-check-label ms-2"
                  htmlFor={`${location.toLowerCase().replace(/[\s()]+/g, "-")}Checkbox`}
                >
                  {location}
                </label>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>

              {/* Distribution  List*/}

              <motion.div
                className="col-md-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{}}
              >
                <div className="form-group">
                  <label
                    className="form-label"
                  >
                    Distribution List:
                  </label>
                  <input
                    type="text"
                    className={`form-control form-input rounded-3 bold-text ${errors.distributionList ? 'is-invalid' : ''}`}
                    placeholder="e.g. Emails to receive the results"
                    value={Array.isArray(formData.distributionList) ? formData.distributionList.join(', ') : formData.distributionList}
                   // value={formData.distributionList}
                    onChange={handleDistributionListChange}
                  />

                  {errors.distributionList && <div className="invalid-feedback">{errors.distributionList}</div>}


                </div>
              </motion.div>

              {/* Physical Location */}


              <motion.div
                className="col-md-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{}}
              >
                <div className="form-group">
                  <label
                    className="form-label"
                  >
                    Physical Location
                  </label>
                  <input
                    type="text"
                    className={`form-control form-input rounded-3 bold-text ${errors.physicalLocation ? 'is-invalid' : ''}`}
                    placeholder="e.g. New York"
                    value={formData.physicalLocation}
                    onChange={handlePhysicalLocationChange}
                  />
                  {errors.physicalLocation && <div className="invalid-feedback">{errors.physicalLocation}</div>}


                </div>
              </motion.div>



              {/* Minimum Salary */}
              <motion.div
                className="col-md-6"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="form-group">
                  <label className="form-label">Minimum Salary ($)</label>
                  <motion.input
                    type="text"
                    className={`form-control form-input rounded-3 ${errors.minimumSalary ? 'is-invalid' : ''}`}
                    placeholder="e.g $ 25000"
                    value={formData.minimumSalary}
                    onChange={handleSalaryChange}
                    whileHover={{ scale: 1.05 }} // Hover scale
                    transition={{ duration: 0.2 }}
                  />
                  {errors.minimumSalary && <div className="invalid-feedback">{errors.minimumSalary}</div>}
                  {filteredSuggestions.length > 0 && (
                    <ul className="suggestions-list">
                      {filteredSuggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="suggestion-item"
                        >
                          {formatSalary(suggestion?.replace('$', '$'))} {/* Add commas back for formatting */}
                        </li>
                      ))}
                    </ul>
                  )}

                </div>
              </motion.div>


              {/* Minimum Score */}
              <motion.div
                className="col-md-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="form-group">
                  <label className="form-label">Minimum Score</label>
                  <motion.input
                    type="text"
                    className={`form-control form-input rounded-3 ${errors.minimumScore ? 'is-invalid' : ''}`}
                    placeholder="e.g  No job below score 75%"
                    name="minimumScore"
                    value={formData.minimumScore}
                    onChange={handleInputChange}
                    whileHover={{ scale: 1.05 }} // Hover scale
                    transition={{ duration: 0.2 }}
                  />
                  {errors.minimumScore && <div className="invalid-feedback">{errors.minimumScore}</div>}
                </div>
              </motion.div>


              {/* Job Type */}
              <motion.div
                className="col-md-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <div className="form-group">
                  <label className="form-label">Job Type</label>
                  <div className={`dropdown ${errors.jobType ? 'is-invalid' : ''}`} ref={jobTypedropdownRef}>
                    <motion.button
                      className={`btn custom-dropdown-button dropdown-toggle form-input rounded-3 w-100 text-start ${errors.jobType ? 'border-danger' : ''
                        }`}
                      type="button"
                      onClick={() => setIsJobTypeOpen((prev) => !prev)}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {selectedJobTypes.length === 0
                        ? 'Select Job Type'
                        : selectedJobTypes.length === 1
                          ? selectedJobTypes[0]
                          : `${selectedJobTypes.length} types selected`}
                    </motion.button>
                    {errors.jobType && (
                      <div className="invalid-feedback d-block">
                        {errors.jobType}
                      </div>
                    )}
                    <motion.div
                      className={`dropdown-menu custom-dropdown-menu ${isJobTypeOpen ? 'show' : ''}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isJobTypeOpen ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* {['Full Time', 'Part Time', 'Contract', 'Internship'] */}
                      {jobTypes.map((jobType) => (
                        <div key={jobType} className="form-check mb-2">
                          <input
                            className="form-check-input border border-dark"
                            type="checkbox"
                            id={`${jobType.toLowerCase().replace(/\s+/g, '-')}Checkbox`}
                            checked={selectedJobTypes.includes(jobType)}
                            onChange={() => {
                              setSelectedJobTypes(prev =>
                                prev.includes(jobType)
                                  ? prev.filter(type => type !== jobType)
                                  : [...prev, jobType]
                              );
                              // Clear the error when user selects a job type
                              if (errors.jobType) {
                                setErrors(prev => ({
                                  ...prev,
                                  jobType: ''
                                }));
                              }
                              setFormData(prev => ({
                                ...prev,
                                jobType: selectedJobTypes
                              }));
                            }}
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor={`${jobType.toLowerCase().replace(/\s+/g, '-')}Checkbox`}
                          >
                            {jobType}
                          </label>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Report Schedule */}
              <motion.div
                className="col-md-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <div className="form-group">
                  <label className="form-label">Report Schedule</label>
                  <div className={`dropdown ${errors.reportSchedule ? 'is-invalid' : ''}`} ref={dropdownRef}>
                    <motion.button
                      className={`btn custom-dropdown-button dropdown-toggle w-100 ${errors.reportSchedule ? 'border-danger' : ''
                        }`}
                      type="button"
                      onClick={() => setIsOpen(!isOpen)}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {getButtonText()}
                    </motion.button>
                    {errors.reportSchedule && (
                      <div className="invalid-feedback d-block">
                        {errors.reportSchedule}
                      </div>
                    )}
                    <motion.div
                      className={`dropdown-menu custom-dropdown-menu ${isOpen ? 'show' : ''}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {days.map((day) => (
                        <div key={day} className="form-check mb-2">
                          <input
                            className="form-check-input border border-dark"
                            type="checkbox"
                            id={`${day.toLowerCase()}Checkbox`}
                            checked={selectedDays.includes(day)}
                            onChange={() => {
                              handleDayToggle(day);
                              // Clear the error when user selects a day
                              if (errors.reportSchedule) {
                                setErrors(prev => ({
                                  ...prev,
                                  reportSchedule: ''
                                }));
                              }
                            }}
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor={`${day.toLowerCase()}Checkbox`}
                          >
                            {day}
                          </label>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>


           
            {/* Updated Inclusions Section seperatly*/}
            <div className="inclusions mt-5">
              <h3 className="section-title">Inclusions:</h3>
              <div className="row g-4 mt-2">
                {/* Desired Companies */}
                <motion.div
                  className="col-md-6"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <div className="form-group">
                    <label className="form-label">Desired Companies</label>
                    <motion.input
                      type="text"
                      className={`form-control form-input rounded-3 ${errors.desiredCompanies ? 'is-invalid' : ''}`}
                      placeholder="e.g Microsoft"
                      pattern="^[a-zA-Z0-9\s]+$"
                      value={formData.desiredCompanies}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || /^[a-zA-Z0-9\s]+$/.test(value)) {
                          setFormData({ ...formData, desiredCompanies: value });
                        }
                      }}
                    />
                    {errors.desiredCompanies && (
                      <div className="invalid-feedback d-block">
                        {errors.desiredCompanies}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Desired Industries */}
                <motion.div
                  className="col-md-6"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <div className="form-group">
                    <label className="form-label">Desired Industries</label>
                    <motion.input
                      type="text"
                      className={`form-control form-input rounded-3 ${errors.desiredIndustries ? 'is-invalid' : ''}`}
                      placeholder="e.g IT"
                      pattern="^[a-zA-Z0-9\s]+$"
                      value={formData.desiredIndustries}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || /^[a-zA-Z0-9\s]+$/.test(value)) {
                          setFormData({ ...formData, desiredIndustries: value });
                        }
                      }}
                    />
                    {errors.desiredIndustries && (
                      <div className="invalid-feedback d-block">
                        {errors.desiredIndustries}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Desired Company Size - Updated with suggestions */}
                <motion.div
                  className="col-md-6"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <div className="form-group">
                    <label className="form-label">Desired Company Size</label>
                    <motion.input
                      type="text"
                      className={`form-control form-input rounded-3 ${errors.desiredCompanySize ? 'is-invalid' : ''}`}
                      placeholder="e.g 0-51"
                      value={formData.desiredCompanySize}
                     
                      onChange={handleDesiredCompanySizeChange}
                    />
                    {errors.desiredCompanySize && (
                      <div className="invalid-feedback d-block">
                        {errors.desiredCompanySize}
                      </div>
                    )}
                    {/* Company Size Suggestions Dropdown */}
                    {filteredSuggestions1.length > 0 && (
                      <ul className="suggestions-list">
                        {filteredSuggestions1.map((suggestion, index) => (
                          <li
                            key={index}
                            onClick={() => handleSuggestionClick1(suggestion)}
                            className="suggestion-item"
                          >
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    )}
                  
                  </div>
                </motion.div>

                {/* Desired Location */}
                <motion.div
                  className="col-md-6"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <div className="form-group">
                    <label className="form-label">Desired Location</label>
                    <motion.input
                      type="text"
                      className={`form-control form-input rounded-3 ${errors.desiredLocation ? 'is-invalid' : ''}`}
                      placeholder="e.g London"
                      pattern="^[a-zA-Z0-9\s]+$"
                      value={formData.desiredLocation}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || /^[a-zA-Z0-9\s]+$/.test(value)) {
                          setFormData({ ...formData, desiredLocation: value });
                        }
                      }}
                    />
                    {errors.desiredLocation && (
                      <div className="invalid-feedback d-block">
                        {errors.desiredLocation}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>



            <div className="exclusions mt-5">
              <h3 className="section-title">Exclusions:</h3>
              <div className="row g-4 mt-2">
                {/* Undesired Companies */}
                <motion.div
                  className="col-md-6"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <div className="form-group">
                    <label className="form-label">Undesired Companies</label>
                    <motion.input
                      type="text"
                      className={`form-control form-input rounded-3 ${errors.undesiredCompanies ? 'is-invalid' : ''}`}
                      placeholder="e.g Deloitte Consulting"
                      pattern="^[a-zA-Z0-9\s]+$"
                      value={formData.undesiredCompanies}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || /^[a-zA-Z0-9\s]+$/.test(value)) {
                          setFormData({ ...formData, undesiredCompanies: value });
                          if (errors.undesiredCompanies) {
                            setErrors(prev => ({
                              ...prev,
                              undesiredCompanies: ''
                            }));
                          }
                        }
                      }}
                    />
                    {errors.undesiredCompanies && (
                      <div className="invalid-feedback d-block">
                        {errors.undesiredCompanies}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Undesired Industries */}
                <motion.div
                  className="col-md-6"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <div className="form-group">
                    <label className="form-label">Undesired Industries</label>
                    <motion.input
                      type="text"
                      className={`form-control form-input rounded-3 ${errors.undesiredIndustries ? 'is-invalid' : ''}`}
                      placeholder="e.g Finance"
                      pattern="^[a-zA-Z0-9\s]+$"
                      value={formData.undesiredIndustries}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || /^[a-zA-Z0-9\s]+$/.test(value)) {
                          setFormData({ ...formData, undesiredIndustries: value });
                          if (errors.undesiredIndustries) {
                            setErrors(prev => ({
                              ...prev,
                              undesiredIndustries: ''
                            }));
                          }
                        }
                      }}
                    />
                    {errors.undesiredIndustries && (
                      <div className="invalid-feedback d-block">
                        {errors.undesiredIndustries}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Undesired Company Size */}
                <motion.div
                  className="col-md-6"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <div className="form-group">
                    <label className="form-label">Undesired Company Size</label>
                    <motion.input
                      type="text"
                      className={`form-control form-input rounded-3 ${errors.undesiredCompanySize ? 'is-invalid' : ''}`}
                      placeholder="e.g 0-50"
                      pattern="^[a-zA-Z0-9\s]+$"
                      value={formData.undesiredCompanySize}
                      onFocus={() => {
                        setSuggestedValues(suggestions);
                      }}
                      onBlur={() => setSuggestedValues([])}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || /^[a-zA-Z0-9\s]+$/.test(value)) {
                          setFormData({ ...formData, undesiredCompanySize: value });
                          if (errors.undesiredCompanySize) {
                            setErrors(prev => ({
                              ...prev,
                              undesiredCompanySize: ''
                            }));
                          }
                        }
                      }}
                    />
                    {errors.undesiredCompanySize && (
                      <div className="invalid-feedback d-block">
                        {errors.undesiredCompanySize}
                      </div>
                    )}
                    {suggestedValues.length > 0 && (
                      <div className="suggestions-list">
                        {suggestedValues.map((suggestion, index) => (
                          <div
                            key={index}
                            className="suggestion-item"
                            onClick={() => {
                              setFormData({ ...formData, undesiredCompanySize: suggestion });
                              setSuggestedValues([]);
                            }}
                          >
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Undesired Location */}
                <motion.div
                  className="col-md-6"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <div className="form-group">
                    <label className="form-label">Undesired Location</label>
                    <motion.input
                      type="text"
                      className={`form-control form-input rounded-3 ${errors.undesiredLocation ? 'is-invalid' : ''}`}
                      placeholder="e.g New York"
                      pattern="^[a-zA-Z0-9\s]+$"
                      value={formData.undesiredLocation}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || /^[a-zA-Z0-9\s]+$/.test(value)) {
                          setFormData({ ...formData, undesiredLocation: value });
                          if (errors.undesiredLocation) {
                            setErrors(prev => ({
                              ...prev,
                              undesiredLocation: ''
                            }));
                          }
                        }
                      }}
                    />
                    {errors.undesiredLocation && (
                      <div className="invalid-feedback d-block">
                        {errors.undesiredLocation}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>



            {/* Upload Button with Bounce */}
            <motion.div
              className="upload-resume mt-5"
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >

              <button type="button" className="btn upload-button">

                <label htmlFor="resume" className="upload-label" style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    id="resume"
                    type="file"
                    className={`file-input ${errors.resume ? 'is-invalid' : ''}`}
                    name="resume"
                    style={{ display: 'none' }}  // Hide the file input
                    onChange={handleFileChange}
                  // Handle file selection
                  />

                  <img src={uploadIcon} className="upload-icon" style={{ width: '20px', height: '20px' }} />
                  <span style={{ fontWeight: 'bold' }}>Upload Resume</span>

                </label>

              </button>

              {fileName && !uploading && (
                <div style={{ marginTop: '10px', fontWeight: 'bold', color: '#333', display: 'flex', alignItems: 'center' }}>
                  <p>{fileName}</p>
                </div>

              )}

              {uploading && (
                <div style={{ marginTop: '10px', width: '100%', textAlign: 'center', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '80%', flexGrow: 1 }}>
                    <p>{fileName}</p>
                    <div style={{ width: '100%', height: '5px', backgroundColor: '#ddd', borderRadius: '5px' }}>
                      <div
                        style={{
                          width: `${progress}%`,
                          height: '100%',
                          backgroundColor: '#4CAF50',
                          borderRadius: '5px',
                          transition: 'width 0.5s ease',
                        }}
                      />
                    </div>

                  </div>

                  {progress === 100 && (
                    <button
                      onClick={handleRemoveFile}
                      style={{
                        background: 'none',
                        color: 'red',
                        padding: '5px 10px',
                        border: 'none',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '33px'
                      }}
                    >
                      &#10005; {/* Cross icon (X) */}
                    </button>
                  )}
                </div>
              )}

            </motion.div>

            {errors.resume && <center> <div className="invalid-feedback d-block" style={{ marginTop: '10px', alignContent: 'center' }}>{errors.resume}</div></center>}

            {/* Submit Button with Bounce */}

            <motion.div
              className="submit-preferences mt-5"
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}
            >
              <motion.button
                type="submit"
                className="btn submit-button"
                whileHover={{ scale: 1.05 }}  // Hover effect
                whileTap={{ scale: 0.95 }}  // Tap effect
                transition={{ duration: 0.2 }}
              >
                SUBMIT PREFERENCES
              </motion.button>
            
           <motion.button
             type="button"
             className="btn run-now-button"
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             transition={{ duration: 0.2 }}
             onClick={handleRunAndSubmit}
           >
             RUN AND SUBMIT
           </motion.button>
            </motion.div>
          </form>

          {isPopupVisible && (
            <div className="popup">
              <div className="popup-content">
                <p>Preferences Submitted Successfully!</p>
                <button onClick={handleOkClick}>OK</button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CandidateForm;