import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import "./CandidateForm.css";
import { Button } from "react-bootstrap";

const CandidateDetailsSection = ({ formik }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);
  const inputRef = useRef(null);
  const locationDropdownRef = useRef(null);
  const jobTypedropdownRef = useRef(null);
  const jobScheduledropdownRef = useRef(null);
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [isJobTypeOpen, setIsJobTypeOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [cachedResults, setCachedResults] = useState({});
  const suggestionsListRef = useRef(null);

  const locations = [
    "Work From Home (WFH)",
    "Work From Office (WFO)",
    "Hybrid",
  ];
  const jobTypes = ["Full Time", "Part Time", "Contract", "Internship"];

  const locationValueMap = {
    "Work From Home (WFH)": "WFH",
    "Work From Office (WFO)": "WFO",
    Hybrid: "HYBRID",
  };
  const valueMap = {
    "FULL TIME": "FULL TIME",
    "PART TIME": "PART TIME",
    CONTRACT: "CONTRACT",
    INTERNSHIP: "INTERNSHIP",
  };

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const valueDayMap = {
    displayToApi: {
      Monday: "MON",
      Tuesday: "TUE",
      Wednesday: "WED",
      Thursday: "THU",
      Friday: "FRI",
      Saturday: "SAT",
      Sunday: "SUN",
    },
    apiToDisplay: {
      MON: "Monday",
      TUE: "Tuesday",
      WED: "Wednesday",
      THU: "Thursday",
      FRI: "Friday",
      SAT: "Saturday",
      SUN: "Sunday",
    },
  };
  const handleSalaryChange = (e) => {
    const value = e.target.value;

    const formattedValue = value.replace(/[^0-9.]/g, "");

    formik.setFieldValue("lowestSalary", formattedValue);

    if (formattedValue) {
      const filtered = salarySuggestions.filter((suggestion) =>
        suggestion.replace(/[^0-9]/g, "").includes(formattedValue)
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const toApiDayValue = (displayValue) => {
    return valueDayMap.displayToApi[displayValue] || displayValue;
  };
  const toDisplayDayaValue = (apiValue) => {
    return valueDayMap.apiToDisplay[apiValue] || apiValue;
  };

  const handleDayToggle = (day) => {
    const newSelectedDays = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];
    setSelectedDays(newSelectedDays);

    let apiValues = newSelectedDays.map((d) => toApiDayValue[d] || d);

    formik.setFieldValue("reportSchedules", apiValues);

    return newSelectedDays;
  };



  useEffect(() => {
    if (Array.isArray(formik.values.reportSchedules)) {
      const displayValues = formik.values.reportSchedules.map((day) =>
        toDisplayDayaValue(day)
      );
      setSelectedDays(displayValues);
    } else if (formik.values.reportSchedules) {
      const displayValue = toDisplayDayaValue(formik.values.reportSchedules);
      setSelectedDays([displayValue]);
    }
  }, [formik.values.reportSchedules]);

  const handleLocationToggle = (location) => {
    setSelectedLocations((prev) => {
      const newLocations = prev.includes(location)
        ? prev.filter((loc) => loc !== location)
        : [...prev, location];

      const apiLocations = newLocations.map(
        (loc) => locationValueMap[loc] || loc
      );

      // Update Formik values using setFieldValue
      formik.setFieldValue("jobLocations", apiLocations);
      return newLocations;
    });
  };

  const handleJobTypeToggle = (jobType) => {
    setSelectedJobTypes((prev) => {
      const newJobTypes = prev.includes(jobType)
        ? prev.filter((loc) => loc !== jobType)
        : [...prev, jobType];

      const apiLocations = newJobTypes.map((loc) => valueMap[loc] || loc);

      formik.setFieldValue("jobTypes", apiLocations);

      return newJobTypes;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) && // Check if clicked outside input field
        suggestionsListRef.current &&
        !suggestionsListRef.current.contains(event.target) // Check if clicked outside suggestions list
      ) {
        setShowSuggestions(false); // Close suggestions
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

      if (
        jobScheduledropdownRef.current &&
        !jobScheduledropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getDisplayValue = (apiValue) => {
    const displayMap = {
      WFH: "Work From Home (WFH)",
      WFO: "Work From Office (WFO)",
      HYBRID: "Hybrid",
    };
    return displayMap[apiValue] || apiValue;
  };
  const getDisplayValue1 = (apiValue) => {
    const displayMap1 = {
      FULLTIME: "FULL TIME",
      PARTTIME: "PART TIME",
      CONTRACT: "CONTRACT",
      INTERNSHIP: "INTERNSHIP",
    };
    return displayMap1[apiValue] || apiValue;
  };

  useEffect(() => {
    if (Array.isArray(formik.values.jobLocations)) {
      const displayLocations = formik.values.jobLocations.map((loc) =>
        getDisplayValue(loc)
      );
      setSelectedLocations(displayLocations);
    }
  }, [formik.values.jobLocations]);

  useEffect(() => {
    if (Array.isArray(formik.values.jobTypes)) {
      const displayJobTypes = formik.values.jobTypes.map((loc) =>
        getDisplayValue1(loc)
      );
      setSelectedJobTypes(displayJobTypes);
    }
  }, [formik.values.jobTypes]);

  const salarySuggestions = [
    "$25000",
    "$50000",
    "$75000",
    "$100000",
    "$150000",
    "$200000",
  ];
  const formatSalary = (salary) => {
    return salary.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  useEffect(() => {
    if (searchTerm) {
      formik.setFieldValue("jobTitles", searchTerm);
    }
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setErrorMessage("");
        window.location.reload();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchTerm]);

  const handleSuggestionClick = (suggestion) => {
    formik.setFieldValue("lowestSalary", suggestion);
    setFilteredSuggestions([]);
  };

  const handleSearchClick = async () => {
    const userEmail = formik.values.candidateId;

    if (!userEmail) {
      setErrors({ candidateEmail: "Please enter an email" });
      return;
    }

    try {
      const response = await fetch(
        `http://192.168.1.29:8087/getUserVerification?userEmail=${encodeURIComponent(
          userEmail
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      console.log(data);

      if (!data || !data.prefs) {
        setErrorMessage(data ? data.statusMessage : "No Records Found");
        return;
      }
      let jobTitlesArray = data.prefs.jobTitles; // Assuming this is your array
      let jobTitlesString = jobTitlesArray.join(", ");

      setSelectedJobs(data.prefs.jobTitles);
      setSearchTerm(jobTitlesString);

      const jobLocations = data.prefs.jobLocations || [];

      const jobTypesProperCase = data.prefs.jobTypes || [];
      const jobTypes = jobTypesProperCase.map(jobType => {
        return jobType
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(" "); // 
      });
      console.log("jobTypes fetch=>>>>>>", jobTypes);


      const reportSchedulesDisplay = data.prefs.reportSchedules || [];
      const reportSchedules = reportSchedulesDisplay.map(schedule => {
        return schedule.charAt(0).toUpperCase() + schedule.slice(1).toLowerCase();
      });
      console.log("fetch result===>", reportSchedulesDisplay);

      // Update Formik values using setValues
      formik.setValues((prevValues) => ({
        ...prevValues,
        candidateName: data.prefs.candidateName,
        candidateEmail: data.prefs.candidateEmail,
        jobTitles: data.prefs.jobTitles ? data.prefs.jobTitles.join(",") : "",
        lowestSalary: data.prefs.lowestSalary,
        distributionList: data.distributionList
          ? data.distributionList.join(",")
          : "",
        minimumScore: data.prefs.minimumScore,
        physicalLocation: data.prefs.physicalLocation,
        jobLocations: jobLocations,
        jobTypes: jobTypes,
        reportSchedules: reportSchedules,

        // Inclusions
        desiredLocations: data.prefs.desiredLocations
          ? data.prefs.desiredLocations.join(",")
          : "",
        desiredCompanies: data.prefs.desiredCompanies
          ? data.prefs.desiredCompanies.join(",")
          : "",
        desiredIndustry: data.prefs.desiredIndustry
          ? data.prefs.desiredIndustry.join(",")
          : "",
        desiredCompanySize: data.prefs.desiredCompanySize,

        // Exclusions
        undesiredCompanies: data.prefs.undesiredCompanies
          ? data.prefs.undesiredCompanies.join(",")
          : "",
        undesiredIndustry: data.prefs.undesiredIndustry
          ? data.prefs.undesiredIndustry.join(",")
          : "",
        undesiredCompanySize: data.prefs.undesiredCompanySize,
        undesiredLocations: data.prefs.undesiredLocations
          ? data.prefs.undesiredLocations.join(",")
          : "",
        candidateResumeName: data.prefs.candidateResumeName,
      }));

      // Optionally, set additional state if needed
      setSelectedLocations(jobLocations);
      setSelectedJobTypes(jobTypes);
      setSelectedDays(reportSchedules);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred while fetching data.");
    }
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const fetchJobSuggestions = async (query) => {
    if (!query) return; // Handle empty query input
    const lowercaseQuery = query.toLowerCase();
    // Check if results are already cached (in useState)
    if (cachedResults[lowercaseQuery]) {
      setSuggestions(cachedResults[lowercaseQuery]);
      return;
    }
    try {
      const response = await fetch(
        `http://13.234.215.73:8087/getSuggestions/${query}`,


        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch job suggestions: ${response.statusText}`
        );
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Invalid response format: data is not an array");
      }
      // Filter out already selected jobs from suggestions and remove duplicates
      const jobTitles = [
        ...new Set(
          data.filter((title) => !selectedJobs.includes(title)) // Exclude selected jobs
        ),
      ].slice(0, 10); // Limit to 10 suggestions

      setSuggestions(jobTitles);

      // Cache the results in useState
      setCachedResults((prev) => ({ ...prev, [lowercaseQuery]: jobTitles }));
    } catch (error) {
      console.error("Error fetching job suggestions:", error);
      setSuggestions([]);
    }
  };

  const debouncedFetch = debounce(fetchJobSuggestions, 200);

  // const handleJobInputChange = (e) => {
  //   const value = e.target.value;
  //   setSearchTerm(value);
  //   setShowSuggestions(true);

  //   const terms = value.split(",").map((term) => term.trim());
  //   const lastTerm = terms[terms.length - 1];

  //   if (lastTerm.length === 3 || lastTerm.length === 5) {
  //     debouncedFetch(lastTerm);
  //     setShowSuggestions(true);
  //   } else {
  //     setSuggestions([]);
  //     setShowSuggestions(false);
  //   }

  //   setSelectedIndex(-1);
  //   console.log(searchTerm);
  // };

  let lastValidTerm = '';  // Store the last valid search term



  const handleJobInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const terms = value.split(",").map((term) => term.trim());
    const lastTerm = terms[terms.length - 1];
    console.log("terms", terms);
    if (lastTerm.length >= 3) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }

    if (lastTerm.length === 3 || lastTerm.length === 5) {
      debouncedFetch(lastTerm);
    }

    setSelectedIndex(-1);
  };

  const removeJob = (jobToRemove) => {
    setSelectedJobs((prev) => {
      const updatedJobs = prev.filter((job) => job !== jobToRemove);
      // Update Formik values
      formik.setFieldValue("jobTitles", updatedJobs.join(", "));
      return updatedJobs;
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleJobSelection(suggestions[selectedIndex]);
      } else if (searchTerm.trim()) {
        // Handle manual entry on Enter key
        handleJobSelection();
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    } else if (
      e.key === "Backspace" &&
      searchTerm === "" &&
      selectedJobs.length > 0
    ) {
      removeJob(selectedJobs[selectedJobs.length - 1]);
    }
  };

  const handleJobSelection = (suggestion) => {
    setSelectedJobs((prev) => {
      let updatedJobs = [...prev];

      // If it's a suggestion from dropdown
      if (suggestion) {
        if (updatedJobs.includes(suggestion)) {
          updatedJobs = updatedJobs.filter((job) => job !== suggestion);
        } else {
          updatedJobs.push(suggestion);
        }
      }

      // Join all jobs with comma and set as input value
      const joinedJobs = updatedJobs.join(", ");
      setSearchTerm(joinedJobs);

      // Update Formik values with all jobs
      formik.setFieldValue("jobTitles", joinedJobs);

      return updatedJobs;
    });

    // Reset suggestions and focus
    //   setSearchTerm("");
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };


  // const handleJobSelection = (suggestion) => {
  //   setSelectedJobs((prev) => {
  //     let updatedJobs = [...prev];

  //     // If it's a suggestion from dropdown
  //     if (suggestion) {
  //       // Add the job if not already selected
  //       if (!updatedJobs.includes(suggestion)) {
  //         updatedJobs.push(suggestion);
  //       }
  //     }

  //     // Join all jobs with a comma and set as Formik field value
  //     const joinedJobs = updatedJobs.join(", ");
  //     formik.setFieldValue("jobTitles", joinedJobs);

  //     return updatedJobs;
  //   });

  //   // Keep the suggestions dropdown open
  //   setSearchTerm("");
  //   setSuggestions([]);  // You can clear suggestions to reduce noise, but don't close the dropdown
  //   setShowSuggestions(true); // Keep the suggestions visible
  //   setSelectedIndex(-1); // Reset selected index
  //   inputRef.current?.focus(); // Keep focus on the input field
  // };

  // const handleJobSelection = (suggestion) => {
  //   setSelectedJobs((prev) => {
  //     let updatedJobs = [...prev]; // Copy the previous state
  
  //     // If it's a suggestion from dropdown
  //     if (suggestion) {
  //       if (updatedJobs.includes(suggestion)) {
  //         // Remove the suggestion from selected jobs if it's already selected
  //         updatedJobs = updatedJobs.filter((job) => job !== suggestion);
  //       } else {
  //         // Add the suggestion to selected jobs if it's not selected already
  //         updatedJobs.push(suggestion);
  //       }
  //     }
  //     return updatedJobs; // Return the updated selected jobs list
  //   });
  // };
  
  return (
    <div className="row g-4">
      {/* Candidate Name */}
      <div
        className="col-md-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="form-group">
          <label className="form-label">Candidate Name</label>
          <input
            type="text"
            required
            className={`form-control ${formik.touched.candidateName && formik.errors.candidateName
              ? "is-invalid"
              : ""
              }`}
            placeholder="e.g John Doe"
            name="candidateName"
            value={formik.values.candidateName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.candidateName && formik.errors.candidateName && (
            <div className="invalid-feedback">
              {formik.errors.candidateName}
            </div>
          )}
        </div>
      </div>

      {/* Candidate Email */}
      <div
        className="col-md-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div
          className="form-group input-container"
          style={{ position: "relative", display: "flex", gap: "2%" }}
        >
          <div style={{ width: "100%" }} className="input-field">
            <label className="form-label">Candidate Email</label>
            <input
              type="text"
              className={`form-control ${formik.touched.candidateId && formik.errors.candidateId
                ? "is-invalid"
                : ""
                }`}
              placeholder="e.g johndoe@gmail.com"
              name="candidateId"
              required
              value={formik.values.candidateId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.candidateId && formik.errors.candidateId && (
              <span className="invalid-feedback error-message">
                {formik.errors.candidateId}
              </span>
            )}
          </div>
          {!formik.errors.candidateId && formik.values.candidateId && (
            <div
              style={{ width: "20%", marginTop: "auto" }}
              className="search-button"
            >
              <Button
                size={25}
                title="search"
                onClick={handleSearchClick}
                style={{ cursor: "pointer" }}
              >
                <FaSearch />
              </Button>
            </div>
          )}

          {errorMessage && (
            <div className="popup">
              <div className="popup-content" ref={popupRef}>
                {/* Close button */}
                <span
                  className="popup-close"
                  onClick={() => {
                    setErrorMessage(""); // Clear the error message
                    window.location.reload();
                    formik.setFieldValue(
                      "candidateId",
                      formik.values.candidateId
                    );
                  }}
                >
                  &times;
                </span>

                {/* Error message */}
                <p>{errorMessage}</p>

                {/* OK button */}
                <button
                  onClick={() => {
                    setErrorMessage(""); // Clear the error message
                    window.location.reload();
                  }}
                >
                  Ok
                </button>
              </div>
            </div>
          )}
        </div>
      </div>


      {/* Target Job Title */}
      <div className="col-md-6">
        <div className="form-group">
          <label className="form-label">Target Job Title</label>
          <div className="position-relative">
            {/* Input field with dropdown button */}
            <div className="input-group">
              <input
                type="text"
                ref={inputRef}
                required
                className={`form-control ${formik.touched.jobTitles && formik.errors.jobTitles
                  ? "is-invalid"
                  : ""
                  }`}
                // CHANGED: Use searchTerm instead of selectedJobs for the input value
                value={searchTerm} // Only show the search term in the input field
                onChange={handleJobInputChange}
                onKeyDown={handleKeyDown}
                placeholder={
                  selectedJobs.length === 0
                    ?"Enter 3 characters to search job"
                    : "Add another job title..."
                }
              />
              <button
                className="btn btn-outline-primary dropdown-toggle"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowSuggestions(!showSuggestions);
                }}
                style={{ border: "1px solid #ced4da" }}
              >
                {/* CHANGED: Show the count of selected jobs in the button */}
                {selectedJobs.length > 0 && `${selectedJobs.length}`}
              </button>
            </div>

            {formik.touched.jobTitles && formik.errors.jobTitles && (
              <div className="invalid-feedback d-block">
                {formik.errors.jobTitles}
              </div>
            )}

            {/* Suggestions and selected jobs dropdown */}
            {showSuggestions && (
              <ul
                className="suggestions-list"
                ref={suggestionsListRef}
                style={{
                  position: "absolute",
                  width: "100%",
                  maxHeight: "200px",
                  overflowY: "auto",
                  zIndex: 1000,
                  backgroundColor: "white",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  marginTop: "2px",
                }}
              >
                {/* Display selected jobs first */}
                {selectedJobs.length > 0 && (
                  <li className="px-3 py-2 bg-light">
                    <small className="text-muted">Selected Jobs:</small>
                  </li>
                )}
                {selectedJobs.map((job, index) => (
                  <li
                    key={`selected-${index}`}
                    className="suggestion-item d-flex align-items-center px-3 py-2"
                    style={{ cursor: "pointer" }}
                  >
                    <input
                      type="checkbox"
                      checked={true}
                      onChange={() => handleJobSelection(job)}
                      className="me-2"
                    />
                    <span>{job}</span>
                  </li>
                ))}

                {/* Display suggestions */}
                {suggestions.length > 0 && (
                  <li className="px-3 py-2 bg-light">
                    <small className="text-muted">Suggestions:</small>
                  </li>
                )}
                {suggestions
                  .filter((suggestion) => !selectedJobs.includes(suggestion))
                  .map((suggestion, index) => (
                    <li
                      key={`suggestion-${index}`}
                      className="suggestion-item d-flex align-items-center px-3 py-2"
                      style={{ cursor: "pointer" }}
                    >
                      <input
                        type="checkbox"
                        checked={false}
                        onChange={() => handleJobSelection(suggestion)}
                        className="me-2"
                      />
                      <span>{suggestion}</span>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>


      {/* Job Location */}
      <div
        className="col-md-6"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="form-group">
          <label className="form-label">Job Location</label>
          <div
            className={`dropdown ${formik.errors.jobLocations ? "is-invalid" : ""
              }`}
            ref={locationDropdownRef}
          >
            <motion.button
              className={`btn custom-dropdown-button dropdown-toggle form-input rounded-3 w-100 text-start ${formik.touched.jobLocations && formik.errors.jobLocations
                ? "border-danger"
                : ""
                }`}
              type="button"
              required
              onClick={() => setIsLocationOpen((prev) => !prev)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              style={{ position: "sticky", overflow: "hidden" }}
            >
              {selectedLocations.length === 0
                ? "Select Job Location"
                : selectedLocations.length === 1
                  ? selectedLocations[0]
                  : `${selectedLocations}`}
            </motion.button>
            {formik.touched.jobLocations && formik.errors.jobLocations && (
              <div className="invalid-feedback d-block">
                {formik.errors.jobLocations}
              </div>
            )}
            <div
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
                    
                    id={`${location
                      .toLowerCase()
                      .replace(/[\s()]+/g, "-")}Checkbox`}
                    checked={selectedLocations.includes(location)}
                    onChange={() => handleLocationToggle(location)}
                  />
                  <label
                    className="form-check-label ms-2"
                    htmlFor={`${location
                      .toLowerCase()
                      .replace(/[\s()]+/g, "-")}Checkbox`}
                  >
                    {location}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Distribution List */}
      <div
        className="col-md-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{}}
      >
        <div className="form-group">
          <label className="form-label">Distribution List:</label>
          <input
            type="text"
            className={`form-control ${formik.touched.distributionList && formik.errors.distributionList
              ? "is-invalid"
              : ""
              }`}
            placeholder="e.g. Emails to receive the results"
            name="distributionList"
            required
            value={
              Array.isArray(formik.values.distributionList)
                ? formik.values.distributionList.join(", ")
                : formik.values.distributionList
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.distributionList && formik.errors.distributionList ? (
            <div className="invalid-feedback">
              {formik.errors.distributionList}
            </div>
          ) : null}
        </div>
      </div>

      {/* Physical Location */}
      <div
        className="col-md-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{}}
      >
        <div className="form-group">
          <label className="form-label">Physical Location</label>
          <input
            type="text"
            required
            className={`form-control ${formik.touched.physicalLocation && formik.errors.physicalLocation
              ? "is-invalid"
              : ""
              }`}
            placeholder="e.g. New York"
            value={formik.values.physicalLocation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="physicalLocation"
          />
          {formik.touched.physicalLocation && formik.errors.physicalLocation ? (
            <div className="invalid-feedback">
              {formik.errors.physicalLocation}
            </div>
          ) : null}
        </div>
      </div>

      {/* Minimum Salary */}
      <div
        className="col-md-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="form-group">
          <label className="form-label">Minimum Salary ($)</label>
          <motion.input
            type="text"
            required
            className={`form-control ${formik.touched.lowestSalary && formik.errors.lowestSalary
              ? "is-invalid"
              : ""
              }`}
            placeholder="e.g $ 25000"
            name="lowestSalary"
            value={formik.values.lowestSalary}
            onChange={handleSalaryChange}
            whileHover={{ scale: 1.05 }} // Hover scale
            transition={{ duration: 0.2 }}
          />
          {formik.touched.lowestSalary && formik.errors.lowestSalary ? (
            <div className="invalid-feedback">{formik.errors.lowestSalary}</div>
          ) : null}
          {filteredSuggestions.length > 0 && (
            <ul className="suggestions-list">
              {filteredSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="suggestion-item"
                >
                  {formatSalary(suggestion?.replace("$", "$"))}{" "}
                  {/* Add commas back for formatting */}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Minimum Score */}
      <div
        className="col-md-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="form-group">
          <label className="form-label">Minimum Score</label>
          <motion.input
            type="text"
            required
            className={`form-control ${formik.touched.minimumScore && formik.errors.minimumScore
              ? "is-invalid"
              : ""
              }`}
            placeholder="Enter score in percentage"
            name="minimumScore"
            value={formik.values.minimumScore}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            whileHover={{ scale: 1.05 }} // Hover scale
            transition={{ duration: 0.2 }}
          />
          {formik.touched.minimumScore && formik.errors.minimumScore ? (
            <div className="invalid-feedback">{formik.errors.minimumScore}</div>
          ) : null}
        </div>
      </div>

      {/* Job Type */}
      <div
        className="col-md-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <div className="form-group">
          <label className="form-label">Job Type</label>
          <div
            className={`dropdown ${formik.errors.jobTypes ? "is-invalid" : ""}`}
            ref={jobTypedropdownRef}
          >
            <motion.button
              className={`btn custom-dropdown-button dropdown-toggle form-input rounded-3 w-100 text-start ${formik.touched.jobTypes && formik.errors.jobTypes
                ? "border-danger"
                : ""
                }`}
              type="button"
              required
              onClick={() => setIsJobTypeOpen((prev) => !prev)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              style={{ position: "sticky", overflow: "hidden" }}
            >
              {selectedJobTypes.length === 0
                ? "Select Job Type"
                : selectedJobTypes.length === 1
                  ? selectedJobTypes[0]
                  : `${selectedJobTypes} `}
            </motion.button>
            {formik.touched.jobTypes && formik.errors.jobTypes && (
              <div className="invalid-feedback d-block">
                {formik.errors.jobTypes}
              </div>
            )}
            <div
              className={`dropdown-menu custom-dropdown-menu ${isJobTypeOpen ? "show" : ""
                }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: isJobTypeOpen ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {jobTypes.map((type) => (
                <div key={type} className="form-check mb-2">
                  <input
                    className="form-check-input border border-dark"
                    type="checkbox"
                    id={`${type
                      .toLowerCase()
                      .replace(/[\s()]+/g, "-")}Checkbox`}
                    checked={selectedJobTypes.includes(type)}
                    onChange={() => handleJobTypeToggle(type)}
                  />
                  <label
                    className="form-check-label ms-2"
                    htmlFor={`${type
                      .toLowerCase()
                      .replace(/[\s()]+/g, "-")}Checkbox`}
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Report Schedule */}
      <div
        className="col-md-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <div className="form-group">
          <label className="form-label">Report Schedule</label>
          <div
            className={`dropdown ${formik.errors.reportSchedules ? "is-invalid" : ""
              }`}
            ref={jobScheduledropdownRef}
          >
            <motion.button
              className={`btn custom-dropdown-button dropdown-toggle form-input rounded-3 w-100 text-start ${formik.touched.reportSchedules && formik.errors.reportSchedules
                ? "border-danger"
                : ""
                }`}
              type="button"
              required
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              style={{ position: "sticky", overflow: "hidden" }}
            >
              {selectedDays.length === 0
                ? "Select Day Of The Week"
                : selectedDays.length === days.length
                  ? "All Days Selected"
                  : `${selectedDays} `}
            </motion.button>
            {formik.touched.reportSchedules &&
              formik.errors.reportSchedules && (
                <div className="invalid-feedback d-block">
                  {formik.errors.reportSchedules}
                </div>
              )}
            <div
              className={`dropdown-menu custom-dropdown-menu ${isOpen ? "show" : ""
                }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {days.map((day) => (
                <div key={day} className="form-check mb-2">
                  <input
                    className="form-check-input border border-dark"
                    type="checkbox"
                    id={`${day.toLowerCase().replace(/[\s()]+/g, "-")}Checkbox`}
                    checked={selectedDays.includes(day)}
                    onChange={() => handleDayToggle(day)}
                  />
                  <label
                    className="form-check-label ms-2"
                    htmlFor={`${day
                      .toLowerCase()
                      .replace(/[\s()]+/g, "-")}Checkbox`}
                  >
                    {day.charAt(0).toUpperCase() + day.slice(1).toLowerCase()}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailsSection;
