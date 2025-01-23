import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import uploadIcon from "../assets/upload-resume.png";
import './CandidateForm.css';

const CandidateForm = () => {

  const [selectedDays, setSelectedDays] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
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
    distributionList: '',
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


  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ['Candidate Details'],
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 2000,
      startDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });

    return () => {
      typed.destroy();
    };
  }, []);



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
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
  const handleCandidateEmailChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, candidateEmail: value });
  };

  const handleSalaryChange = (e) => {
    setFormData({ ...formData, minimumSalary: e.target.value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // setFormData({...formData,minimumScore:e.target.value})
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
            <h2 className="header-title">   <span ref={typedRef}> Candidate Details </span></h2>
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
              {/* Candidate Email */}
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
                    Candidate Email
                  </label>
                  <input
                    type="text"
                    className={`form-control form-input rounded-3 bold-text ${errors.candidateEmail ? 'is-invalid' : ''}`}
                    placeholder="e.g johndoe@gmail.com"
                    value={formData.candidateEmail}
                    onChange={handleCandidateEmailChange}
                  />

                  {errors.candidateEmail && <div className="invalid-feedback">{errors.candidateEmail}</div>}


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
                    value={formData.jobTitles}
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
                  <div className={`dropdown ${errors.jobLocation ? 'is-invalid' : ''}`} ref={dropdownRef}>
                    <motion.button
                      className={`btn custom-dropdown-button dropdown-toggle form-input rounded-3 w-100 text-start ${errors.jobLocation ? 'border-danger' : ''
                        }`}
                      type="button"
                      onClick={() => setIsLocationOpen(!isLocationOpen)}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {selectedLocations.length === 0
                        ? 'Select Job Location'
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
                      className={`dropdown-menu custom-dropdown-menu ${isLocationOpen ? 'show' : ''}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isLocationOpen ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {['Work From Home (WFH)', 'Work From Office (WFO)', 'Hybrid'].map((location) => (
                        <div key={location} className="form-check mb-2">
                          <input
                            className="form-check-input border border-dark"
                            type="checkbox"
                            id={`${location.toLowerCase().replace(/[\s()]+/g, '-')}Checkbox`}
                            checked={selectedLocations.includes(location)}
                            onChange={() => {
                              setSelectedLocations(prev =>
                                prev.includes(location)
                                  ? prev.filter(loc => loc !== location)
                                  : [...prev, location]
                              );
                              // Clear the error when user selects a location
                              if (errors.jobLocation) {
                                setErrors(prev => ({
                                  ...prev,
                                  jobLocation: ''
                                }));
                              }
                              setFormData(prev => ({
                                ...prev,
                                desiredLocations: selectedLocations
                              }));
                            }}
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor={`${location.toLowerCase().replace(/[\s()]+/g, '-')}Checkbox`}
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
                    value={formData.distributionList}
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
                  <label className="form-label">Minimum Salary</label>
                  <motion.input
                    type="number"
                    className={`form-control form-input rounded-3 ${errors.minimumSalary ? 'is-invalid' : ''}`}
                    placeholder="e.g 25000"
                    value={formData.minimumSalary}
                    onChange={handleSalaryChange}
                    whileHover={{ scale: 1.05 }} // Hover scale
                    transition={{ duration: 0.2 }}
                  />
                  {errors.minimumSalary && <div className="invalid-feedback">{errors.minimumSalary}</div>}
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
                  <div className={`dropdown ${errors.jobType ? 'is-invalid' : ''}`} ref={dropdownRef}>
                    <motion.button
                      className={`btn custom-dropdown-button dropdown-toggle form-input rounded-3 w-100 text-start ${errors.jobType ? 'border-danger' : ''
                        }`}
                      type="button"
                      onClick={() => setIsJobTypeOpen(!isJobTypeOpen)}
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
                      {['Full Time', 'Part Time', 'Contract', 'Internship'].map((jobType) => (
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

            {/* <div className="inclusions mt-5">
              <h3 className="section-title">Inclusions:</h3>
              <div className="row g-4 mt-2">
                {[
                  {
                    label: 'Desired Companies',
                    placeholder: 'e.g Microsoft',
                    name: 'desiredCompanies',
                    pattern: "^[a-zA-Z\\s]+$"
                  },
                  {
                    label: 'Desired Industries',
                    placeholder: 'e.g IT ',
                    name: 'desiredIndustries',
                    pattern: "^[a-zA-Z\\s]+$"
                  },
                  {
                    label: 'Desired Company Size',
                    placeholder: 'e.g Multinational',
                    name: 'desiredCompanySize',
                    pattern: "^[a-zA-Z\\s]+$"
                  },
                  {
                    label: 'Desired Location',
                    placeholder: 'e.g London',
                    name: 'desiredLocation',
                    pattern: "^[a-zA-Z\\s]+$"
                  }
                ].map(({ label, placeholder, name, pattern }) => (
                  <motion.div
                    key={label}
                    className="col-md-6"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                  >
                    <div className="form-group">
                      <label className="form-label">{label}</label>
                      <motion.input
                        type="text"
                        className={`form-control form-input rounded-3 ${errors[name] ? 'is-invalid' : ''}`}
                        placeholder={placeholder}
                        pattern={pattern}
                        value={formData[name]}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || new RegExp(pattern).test(value)) {
                            setFormData({ ...formData, [name]: value });
                            // Clear error when user starts typing
                            if (errors[name]) {
                              setErrors(prev => ({
                                ...prev,
                                [name]: ''
                              }));
                            }
                          }
                        }}
                      />
                      {errors[name] && (
                        <div className="invalid-feedback d-block">
                          {errors[name]}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div> */}


            {/* <div className="exclusions mt-5">
              <h3 className="section-title">Exclusions:</h3>
              <div className="row g-4 mt-2">
                {[
                  { label: 'Undesired Companies', placeholder: 'e.g Deloitte Consulting ', name: 'undesiredCompanies' },
                  { label: 'Undesired Industries', placeholder: 'e.g Finance', name: 'undesiredIndustries' },
                  { label: 'Undesired Company Size', placeholder: 'e.g Startup', name: 'undesiredCompanySize' },
                  { label: 'Undesired Location', placeholder: 'e.g New York', name: 'undesiredLocation' }
                ].map(({ label, placeholder, name }) => (
                  <motion.div
                    key={label}
                    className="col-md-6"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  >
                    <div className="form-group">
                      <label className="form-label">{label}</label>
                      <motion.input
                        type="text"
                        className={`form-control form-input rounded-3 ${errors[name] ? 'is-invalid' : ''}`}
                        placeholder={placeholder}
                        value={formData[name]}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData({ ...formData, [name]: value });
                          if (errors[name]) {
                            setErrors({ ...errors, [name]: '' });
                          }
                        }}
                        onBlur={(e) => {
                          const value = e.target.value.trim();
                          if (!value) {
                            setErrors((prevErrors) => ({
                              ...prevErrors,
                              [name]: `Please enter ${label.toLowerCase()}`,
                            }));
                          }
                        }}
                        pattern="^[a-zA-Z\s]+$"  // Added pattern here to allow only alphabets and spaces
                      />
                      {errors[name] && (
                        <div className="invalid-feedback d-block">{errors[name]}</div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

            </div> */}
            <div className="inclusions mt-5">
              <h3 className="section-title">Inclusions:</h3>
              <div className="row g-4 mt-2">
                {[
                  {
                    label: 'Desired Companies',
                    placeholder: 'e.g Microsoft',
                    name: 'desiredCompanies',
                    pattern: "^[a-zA-Z0-9\\s]+$"
                  },
                  {
                    label: 'Desired Industries',
                    placeholder: 'e.g IT ',
                    name: 'desiredIndustries',
                    pattern: "^[a-zA-Z0-9\\s]+$"
                  },
                  {
                    label: 'Desired Company Size',
                    placeholder: 'e.g Multinational',
                    name: 'desiredCompanySize',
                    pattern: "^[a-zA-Z0-9\\s]+$"
                  },
                  {
                    label: 'Desired Location',
                    placeholder: 'e.g London',
                    name: 'desiredLocation',
                    pattern: "^[a-zA-Z0-9\\s]+$"
                  }
                ].map(({ label, placeholder, name, pattern }) => (
                  <motion.div
                    key={label}
                    className="col-md-6"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                  >
                    <div className="form-group">
                      <label className="form-label">{label}</label>
                      <motion.input
                        type="text"
                        className={`form-control form-input rounded-3 ${errors[name] ? 'is-invalid' : ''}`}
                        placeholder={placeholder}
                        pattern={pattern}
                        value={formData[name]}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || new RegExp(pattern).test(value)) {
                            setFormData({ ...formData, [name]: value });
                            if (errors[name]) {
                              setErrors(prev => ({
                                ...prev,
                                [name]: ''
                              }));
                            }
                          }
                        }}
                      />
                      {errors[name] && (
                        <div className="invalid-feedback d-block">
                          {errors[name]}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="exclusions mt-5">
              <h3 className="section-title">Exclusions:</h3>
              <div className="row g-4 mt-2">
                {[
                  {
                    label: 'Undesired Companies',
                    placeholder: 'e.g Deloitte Consulting ',
                    name: 'undesiredCompanies',
                    pattern: "^[a-zA-Z0-9\\s]+$"
                  },
                  {
                    label: 'Undesired Industries',
                    placeholder: 'e.g Finance',
                    name: 'undesiredIndustries',
                    pattern: "^[a-zA-Z0-9\\s]+$"
                  },
                  {
                    label: 'Undesired Company Size',
                    placeholder: 'e.g Startup',
                    name: 'undesiredCompanySize',
                    pattern: "^[a-zA-Z0-9\\s]+$"
                  },
                  {
                    label: 'Undesired Location',
                    placeholder: 'e.g New York',
                    name: 'undesiredLocation',
                    pattern: "^[a-zA-Z0-9\\s]+$"
                  }
                ].map(({ label, placeholder, name, pattern }) => (
                  <motion.div
                    key={label}
                    className="col-md-6"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  >
                    <div className="form-group">
                      <label className="form-label">{label}</label>
                      <motion.input
                        type="text"
                        className={`form-control form-input rounded-3 ${errors[name] ? 'is-invalid' : ''}`}
                        placeholder={placeholder}
                        pattern={pattern}
                        value={formData[name]}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || new RegExp(pattern).test(value)) {
                            setFormData({ ...formData, [name]: value });
                            if (errors[name]) {
                              setErrors(prev => ({
                                ...prev,
                                [name]: ''
                              }));
                            }
                          }
                        }}
                      />
                      {errors[name] && (
                        <div className="invalid-feedback d-block">
                          {errors[name]}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
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
            >
              <motion.button
                type="submit"
                className="btn submit-button"
                whileHover={{ scale: 1.1 }}  // Hover effect
                whileTap={{ scale: 0.95 }}  // Tap effect
                transition={{ duration: 0.2 }}
              >
                SUBMIT PREFERENCES
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