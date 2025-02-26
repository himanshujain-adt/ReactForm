import React, { useState } from "react";
import "./CandidateForm.css";
import { motion } from "framer-motion";

const InclusionSection = ({ formik }) => {
  const [filteredSuggestions1, setFilteredSuggestions1] = useState([]);

  const DesiredIndustriesSuggestions = [
    "0-50",
    "51-150",
    "151-500",
    "501-1000",
  ];

  const handleDesiredCompanySizeChange = (e) => {
    const value = e.target.value;

    const formattedValue = value.replace(/[^0-9.+-]/g, "");

    formik.setFieldValue("desiredCompanySize", formattedValue);

    if (formattedValue) {
      const filtered = DesiredIndustriesSuggestions.filter((suggestion) =>
        suggestion.replace(/[^0-9]/g, "").includes(formattedValue)
      );
      setFilteredSuggestions1(filtered);
    } else {
      setFilteredSuggestions1([]);
    }
  };

  const handleSuggestionClick1 = (suggestion) => {
    formik.setFieldValue("desiredCompanySize", suggestion);

    setFilteredSuggestions1([]);
  };

  return (
    <div>
      <div className="inclusions mt-5">
        <h3 className="section-title">Inclusions:</h3>
        <div className="row g-4 mt-2">
          {/* Desired Companies */}
          <div
            className="col-md-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="form-group">
              <label className="form-label">Desired Companies</label>
              <motion.input
                type="text"
                className="form-control"
                placeholder="e.g Microsoft"
                pattern="^[a-zA-Z0-9\s,]+$"
                name="desiredCompanies"
                value={formik.values.desiredCompanies}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>

          {/* Desired Industries */}
          <div
            className="col-md-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="form-group">
              <label className="form-label">Desired Industries</label>
              <motion.input
                type="text"
                className="form-control"
                placeholder="e.g IT"
                pattern="^[a-zA-Z0-9\s,]+$"
                name="desiredIndustry"
                value={formik.values.desiredIndustry}
                onChange={formik.handleChange}
              />
            </div>
          </div>

          {/* Desired Company Size - Updated with suggestions */}
          <div
            className="col-md-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="form-group">
              <label className="form-label">Desired Company Size</label>
              <motion.input
                type="text"
                className="form-control"
                placeholder="e.g 0-51"
                name="desiredCompanySize"
                value={formik.values.desiredCompanySize}
                onChange={handleDesiredCompanySizeChange}
              />
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
          </div>

          {/* Desired Location */}
          <div
            className="col-md-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="form-group">
              <label className="form-label">Desired Location</label>
              <motion.input
                type="text"
                className="form-control"
                placeholder="e.g London"
                pattern="^[a-zA-Z0-9\s,]+$"
                name="desiredLocations"
                value={formik.values.desiredLocations}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InclusionSection;
