import React, { useRef, useState } from "react";
import "./CandidateForm.css";
import uploadIcon from "../assets/upload-resume.png";

const FileUploadSection = ({ formik }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      try {
        // Check file type
        if (
          !selectedFile.type.includes("pdf") &&
          !selectedFile.type.includes("doc") &&
          !selectedFile.type.includes("docx")
        ) {
          // alert("Please upload a PDF or Word document");
          formik.setFieldError("resumeFile", "Please upload a pdf or word document");
          return;
        }

        // Check file size (e.g., 5MB limit)
        if (selectedFile.size > 5 * 1024 * 1024) {
          //alert("File size should be less than 5MB");
          formik.setFieldError("resumeFile","File size should be less than 5MB.");
          return;
        }
        formik.setFieldError("resumeFile","");

        // Convert file to base64 for preview if needed
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);

        reader.onload = () => {
          // Set the file information in Formik
          formik.setFieldValue("candidateResumeName", selectedFile.name);
          formik.setFieldValue("resumeFile", selectedFile);

          // Start upload animation
          setUploading(true);
          simulateUploadProgress();
        };

        reader.onerror = (error) => {
          console.error("Error reading file:", error);
        //  alert("Error reading file. Please try again.");
        formik.setFieldError("resumeFile", "Error reading file. Please try again.");
        };
      } catch (error) {
        console.error("Error handling file:", error);
        //alert("Error handling file. Please try again.");
      }
    }
  };

  const simulateUploadProgress = () => {
    let uploaded = 0;
    const interval = setInterval(() => {
      if (uploaded < 100) {
        uploaded += 10;
        setProgress(uploaded);
      } else {
        clearInterval(interval);
      }
    }, 200);
  };

  const handleRemoveFile = () => {
    formik.setFieldValue("candidateResumeName", "");
    formik.setFieldValue("resumeFile", null); // Clear the file from Formik's state
    setUploading(false);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Clear the file input
    }
  };

  return (
    <div>
      <div className="upload-resume mt-5">
        <button type="button" className="btn upload-button">
          <label
            htmlFor="resume"
            className="upload-label"
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              id="resume"
              type="file"
              ref={fileInputRef}
              className={`file-input ${formik.errors.resume ? "is-invalid" : ""
                }`}
              name="resume"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <img
              src={uploadIcon}
              className="upload-icon"
              style={{ width: "20px", height: "20px" }}
            />
            <span style={{ fontWeight: "bold" }}>Upload Resume</span>
          </label>
        </button>
        {/* <div
          style={{
            color: formik.touched.resume && formik.errors.resume && isSubmitting ? 'red' : 'green',
          }}
        >
          {formik.touched.resume && formik.errors.resume && isSubmitting
            ? formik.errors.resume
            : 'Resume is required'}
        </div> */}

        {formik.values.candidateResumeName && (
          <center>
            <h6 className="resumeName">{formik.values.candidateResumeName}*</h6>
          </center>
        )}
        {formik.errors.resumeFile &&   (
          <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {formik.errors.resumeFile}
          </div>
        )}



        {uploading && (
          <div
            style={{
              marginTop: "10px",
              width: "100%",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div style={{ width: "80%", flexGrow: 1 }}>
              <div
                style={{
                  width: "100%",
                  height: "5px",
                  backgroundColor: "#ddd",
                  borderRadius: "5px",
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    height: "100%",
                    backgroundColor: "#4CAF50",
                    borderRadius: "5px",
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
            </div>
            {progress === 100 && (
              <button
                onClick={handleRemoveFile}
                style={{
                  background: "none",
                  color: "red",
                  padding: "5px 10px",
                  border: "none",
                  borderRadius: "50%",
                  cursor: "pointer",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                &#10005;
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadSection;




// import React, { useRef, useState } from "react";
// import "./CandidateForm.css";
// import uploadIcon from "../assets/upload-resume.png";

// const FileUploadSection = ({ formik }) => {
//   const [uploading, setUploading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const fileInputRef = useRef(null);

//   const handleFileChange = async (e) => {
//     const selectedFile = e.target.files[0];

//     if (selectedFile) {
//       try {
//         // Check file type
//         if (
//           !selectedFile.type.includes("pdf") &&
//           !selectedFile.type.includes("doc") &&
//           !selectedFile.type.includes("docx")
//         ) {
//           formik.setFieldError("resumeFile", "Please upload a pdf or word document");
//           return;
//         }

//         // Check file size (e.g., 5MB limit)
//         if (selectedFile.size > 5 * 1024 * 1024) {
//           formik.setFieldError("resumeFile", "File size should be less than 5MB.");
//           return;
//         }
//         formik.setFieldError("resumeFile", "");

//         // Convert file to base64 for preview if needed
//         const reader = new FileReader();
//         reader.readAsDataURL(selectedFile);

//         reader.onload = () => {
//           // Set the file information in Formik
//           formik.setFieldValue("candidateResumeName", selectedFile.name);
//           formik.setFieldValue("resumeFile", selectedFile);

//           // Start upload animation
//           setUploading(true);
//           simulateUploadProgress();
//         };

//         reader.onerror = (error) => {
//           console.error("Error reading file:", error);
//           formik.setFieldError("resumeFile", "Error reading file. Please try again.");
//         };
//       } catch (error) {
//         console.error("Error handling file:", error);
//       }
//     }
//   };

//   const simulateUploadProgress = () => {
//     let uploaded = 0;
//     const interval = setInterval(() => {
//       if (uploaded < 100) {
//         uploaded += 10;
//         setProgress(uploaded);
//       } else {
//         clearInterval(interval);
//       }
//     }, 200);
//   };

//   const handleRemoveFile = () => {
//     formik.setFieldValue("candidateResumeName", "");
//     formik.setFieldValue("resumeFile", null);
//     setUploading(false);
//     setProgress(0);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = null;
//     }
//   };

//   return (
//     <div>
//       <div className="upload-resume mt-5">
//         <button type="button" className="btn upload-button">
//           <label
//             htmlFor="resume"
//             className="upload-label"
//             style={{ display: "flex", alignItems: "center" }}
//           >
//             <input
//               id="resume"
//               type="file"
//               ref={fileInputRef}
//               className={`file-input ${formik.errors.resumeFile ? "is-invalid" : ""}`}  
//               name="resumeFile"
//               style={{ display: "none" }}
//               onChange={handleFileChange}
//             />
//             <img
//               src={uploadIcon}
//               className="upload-icon"
//               style={{ width: "20px", height: "20px" }}
//             />
//             <span style={{ fontWeight: "bold" }}>Upload Resume</span>
//           </label>
//         </button>

//         {formik.values.candidateResumeName && (
//           <center>
//             <h6 className="resumeName">{formik.values.candidateResumeName}*</h6>
//           </center>
//         )}

//         {/* Error message with conditional color */}
//         {formik.errors.resumeFile && (
//           <div
//             style={{
//               color: formik.values.candidateResumeName === "" ? "red" : "white  ",
//               fontSize: "12px",
//               marginTop: "5px",
//             }}
//           >
//             {formik.errors.resumeFile}
//           </div>
//         )}

//         {uploading && (
//           <div
//             style={{
//               marginTop: "10px",
//               width: "100%",
//               textAlign: "center",
//               display: "flex",
//               alignItems: "center",
//               gap: "10px",
//             }}
//           >
//             <div style={{ width: "80%", flexGrow: 1 }}>
//               <div
//                 style={{
//                   width: "100%",
//                   height: "5px",
//                   backgroundColor: "#ddd",
//                   borderRadius: "5px",
//                 }}
//               >
//                 <div
//                   style={{
//                     width: `${progress}%`,
//                     height: "100%",
//                     backgroundColor: "#4CAF50",
//                     borderRadius: "5px",
//                     transition: "width 0.5s ease",
//                   }}
//                 />
//               </div>
//             </div>
//             {progress === 100 && (
//               <button
//                 onClick={handleRemoveFile}
//                 style={{
//                   background: "none",
//                   color: "red",
//                   padding: "5px 10px",
//                   border: "none",
//                   borderRadius: "50%",
//                   cursor: "pointer",
//                   width: "20px",
//                   height: "20px",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 &#10005;
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FileUploadSection;
