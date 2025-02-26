import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import "./CandidateForm.css";
import { CandidateSchema } from "../validation-input/Validation";
import CandidateDetailsSection from "./CandidateDetailsSection";
import FileUploadSection from "./FileUploadSection";
import InclusionSection from "./InclusionSection";
import ExclusionSection from "./ExclusionSection";
import axios from "axios";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";


const CandidateForm = () => {
  const popupRef = useRef(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [init, setInit] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");



  const initialValues = {
    candidateId: "",
    jobTitles: "",
    jobTypes: "",
    resumeFile: null,
    desiredLocations: "",
    undesiredRoles: "",
    undesiredCompanies: "",
    lowestSalary: "",
    minimumScore: "",
    desiredCompanies: "",
    desiredIndustry: "",
    desiredCompanySize: "",
    reportSchedules: "",
    jobLocations: "",
    undesiredIndustry: "",
    undesiredCompanySize: "",
    undesiredLocations: "",
    distributionList: "",
    physicalLocation: "",
    candidateName: "",
    candidateResumeName: "",
  };

  const handleOkClick = () => {
    setPopupVisible(false);
    window.location.reload();
  };

  const validateAndSubmit = async (values, formikBag, runNow) => {
    const errors = await formikBag.validateForm();

    Object.keys(values).forEach((field) => {
      formikBag.setFieldTouched(field, true);
    });

    if (Object.keys(errors).length > 0) {
      //alert("Please Fill all the required details");
      formikBag.setErrors(errors);

      return;
    }
    //runNow();

    const resumeFile = document.getElementById("resume").files[0];
    if (!resumeFile) {
      // alert("Resume is required");
      formikBag.setErrors(errors);
      return
    }

    try {
      const formData = new FormData();
      // Convert reportSchedules to uppercase
      const reportSchedulesUpperCase = values.reportSchedules
        ? values.reportSchedules.map((schedule) => schedule.toUpperCase())
        : [];

      const jobTypesProperCase = values.jobTypes.map(jobType => {
        return jobType.toUpperCase();
      });
      console.log("jobTypesProperCase post",jobTypesProperCase);
      const schedule = {
        prefs: {
          candidateId: values.candidateId,
          candidateName: values.candidateName,
          jobTitles: values.jobTitles
            ? values.jobTitles.split(",").map((e) => e.trim())
            : [],
          minimumScore: values.minimumScore.includes("%")
            ? values.minimumScore
            : `${values.minimumScore}%`,
          jobLocations: values.jobLocations,
          // jobTypes: values.jobTypes,
          jobTypes: jobTypesProperCase,
          desiredLocations: values.desiredLocations
            ? values.desiredLocations.split(",").map((e) => e.trim())
            : [],
          physicalLocation: values.physicalLocation || "",
          lowestSalary:
            values.lowestSalary && !values.lowestSalary.startsWith("$")
              ? `$${values.lowestSalary}`
              : values.lowestSalary || "",
          undesiredCompanies: values.undesiredCompanies
            ? values.undesiredCompanies.split(",").map((e) => e.trim())
            : [],
          desiredCompanies: values.desiredCompanies
            ? values.desiredCompanies.split(",").map((e) => e.trim())
            : [],
          desiredIndustry: values.desiredIndustry
            ? values.desiredIndustry.split(",").map((e) => e.trim())
            : [],
          undesiredIndustry: values.undesiredIndustry
            ? values.undesiredIndustry.split(",").map((e) => e.trim())
            : [],
          desiredCompanySize: values.desiredCompanySize,
          undesiredCompanySize: values.undesiredCompanySize,
          undesiredLocations: values.undesiredLocations
            ? values.undesiredLocations.split(",").map((e) => e.trim())
            : [],
          //  reportSchedules: values.reportSchedules,
          reportSchedules: reportSchedulesUpperCase,
        },
        distributionList: values.distributionList
          ? values.distributionList.split(",").map((e) => e.trim())
          : [],
      };

      formData.append("schedule", JSON.stringify(schedule));
      formData.append("resume", resumeFile);
      formData.append("initialize", runNow);

      const response = await axios.post(
       // "http://13.234.215.73:8087/schedule",
        "http://192.168.1.29:8087/schedule",

        // `https://www.google.co.uk/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setPopupVisible(true);

        // Set the correct popup message based on whether runNow is true or false
        if (runNow) {
          setPopupMessage("Preferences submission successful! You’ll receive job results within the next 24 hours.");
        } else {
          setPopupMessage("Form submitted successfully!");
        }

        // Optionally hide the popup after 3 seconds
        // setTimeout(() => setPopupVisible(false), 3000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again.");
    } finally {
      formikBag.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CandidateSchema}
      onSubmit={(values, formikBag) =>
        validateAndSubmit(values, formikBag, init)
      }


    >
      {(formik) => (
        <div className="main-container">
          <div className="container">
            <div
              className="form-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="candidate-details-header mb-5">
                <h2 className="header-title">
                  <span>Candidate Profile</span>
                </h2>
              </div>

              <Form>
                <CandidateDetailsSection formik={formik} />
                <InclusionSection formik={formik} />
                <ExclusionSection formik={formik} />
                <FileUploadSection formik={formik} />

                <div
                  className="submit-preferences mt-5"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <motion.button
                    type="submit"
                    className="btn submit-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    disabled={formik.isSubmitting}
                    onClick={() => {
                      // e.preventDefault();
                      setInit(false);
                      formik.handleSubmit();
                    }}
                  >
                    SUBMIT PREFERENCES
                  </motion.button>

                  <motion.button
                    type="submit"
                    className="btn run-now-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    disabled={formik.isSubmitting}
                    onClick={() => {
                      // e.preventDefault();

                      setInit(true);
                      formik.handleSubmit();
                    }}
                  >
                    RUN AND SUBMIT
                  </motion.button>
                </div>
              </Form>

              {isPopupVisible && (
                <div className="popup">
                  <div className="popup-content" ref={popupRef}>
                    <p>{popupMessage}</p> {/* Dynamically render the message here */}
                    <button onClick={handleOkClick}>OK</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default CandidateForm;
