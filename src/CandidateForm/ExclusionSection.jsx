import React, { useState } from "react";
import "./CandidateForm.css";
import { motion } from "framer-motion";

const ExclusionSection = ({ formik }) => {
  const [filteredSuggestions2, setFilteredSuggestions2] = useState([]);

  const UndesiredCompanySizeSuggestion = [
    "0-50",
    "51-150",
    "151-500",
    "501-1000",
  ];

  const handleUnDesiredCompanySizeChange = (e) => {
    const value = e.target.value;

    // Remove any non-numeric characters (except for periods)
    const formattedValue = value.replace(/[^0-9.+-]/g, "");

    // Update form data
    formik.setFieldValue("undesiredCompanySize", formattedValue);

    // Filter suggestions based on user input
    if (formattedValue) {
      const filtered = UndesiredCompanySizeSuggestion.filter((suggestion) =>
        suggestion.replace(/[^0-9]/g, "").includes(formattedValue)
      );
      setFilteredSuggestions2(filtered);
    } else {
      setFilteredSuggestions2([]);
    }
  };

  const handleSuggestionClick2 = (suggestion) => {
    // Set the selected suggestion to the input field
    formik.setFieldValue("undesiredCompanySize", suggestion);

    setFilteredSuggestions2([]); // Hide suggestions after selection
  };
  return (
    <div>
      <div className="exclusions mt-5">
        <h3 className="section-title">Exclusions:</h3>
        <div className="row g-4 mt-2">
          {/* Undesired Companies */}
          <div
            className="col-md-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="form-group">
              <label className="form-label">Undesired Companies</label>
              <motion.input
                type="text"
                className="form-control"
                placeholder="e.g Deloitte Consulting"
                pattern="^[a-zA-Z0-9\s,]+$"
                name="undesiredCompanies"
                value={formik.values.undesiredCompanies}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>

          {/* Undesired Industries */}
          <div
            className="col-md-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="form-group">
              <label className="form-label">Undesired Industries</label>
              <motion.input
                type="text"
                className="form-control"
                placeholder="e.g Finance"
                pattern="^[a-zA-Z0-9\s,]+$"
                name="undesiredIndustry"
                value={formik.values.undesiredIndustry}
                onChange={formik.handleChange}
              />
            </div>
          </div>

          {/* Undesired Company Size */}
          <div
            className="col-md-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="form-group">
              <label className="form-label">Undesired Company Size</label>
              <motion.input
                type="text"
                className="form-control"
                placeholder="e.g 0-51"
                value={formik.values.undesiredCompanySize}
                onChange={handleUnDesiredCompanySizeChange}
              />
              {/* Company Size Suggestions Dropdown */}
              {filteredSuggestions2.length > 0 && (
                <ul className="suggestions-list ">
                  {filteredSuggestions2.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick2(suggestion)}
                      className="suggestion-item "
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Undesired Location */}
          <div
            className="col-md-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="form-group">
              <label className="form-label">Undesired Location</label>
              <motion.input
                type="text"
                className="form-control"
                placeholder="e.g New York"
                pattern="^[a-zA-Z0-9\s,]+$"
                name="undesiredLocations"
                value={formik.values.undesiredLocations}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExclusionSection;
