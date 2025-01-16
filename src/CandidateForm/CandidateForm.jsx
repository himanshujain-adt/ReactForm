
// import React from 'react';
// import { useState, useRef, useEffect } from 'react';
// import './CandidateForm.css';

// const CandidateForm = () => {
//   const [selectedDays, setSelectedDays] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const days = [
//     'Monday', 'Tuesday', 'Wednesday', 'Thursday',
//     'Friday', 'Saturday', 'Sunday'
//   ];

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleDayToggle = (day) => {
//     setSelectedDays(prev =>
//       prev.includes(day)
//         ? prev.filter(d => d !== day)
//         : [...prev, day]
//     );
//   };

//   const getButtonText = () => {
//     if (selectedDays.length === 0) return 'Select Day Of The Week';
//     if (selectedDays.length === days.length) return 'All Days Selected';
//     return `${selectedDays.length} Day${selectedDays.length > 1 ? 's' : ''} Selected`;
//   };

//   return (
//     <div className="main-container">
//       <div className="container">
//         <div className="form-container">
//           <div className="candidate-details-header mb-3">
//             <h2 className="header-title">Candidate Details</h2>
//           </div>

//           <form>
//             <div className="row g-4">
//               <div className="col-md-6">
//                 <div className="form-group">
//                   <label className="form-label">Target Job Title</label>
//                   <input 
//                     type="text" 
//                     className="form-control form-input rounded-3"
//                     placeholder="Enter target job title"
//                   />
//                 </div>
//               </div>

//               <div className="col-md-6">
//                 <div className="form-group">
//                   <label className="form-label">Job Location</label>
//                   <select className="form-select form-input rounded-3">
//                     <option>Select Job Location</option>
//                     <option value="work-from-home">Work From Home (WFH)</option>
//                     <option value="work-from-office">Work From Office (WFO)</option>
//                     <option value="hybrid">Hybrid</option>
//                   </select>
//                 </div>
//               </div>
              
//               <div className="col-md-6">
//                 <div className="form-group">
//                   <label className="form-label">Minimum Salary</label>
//                   <input 
//                     type="text" 
//                     className="form-control form-input rounded-3"
//                     placeholder="Enter minimum salary"
//                   />
//                 </div>
//               </div>

//               <div className="col-md-6">
//                 <div className="form-group">
//                   <label className="form-label">Minimum Score</label>
//                   <input 
//                     type="text" 
//                     className="form-control form-input rounded-3"
//                     placeholder="Enter minimum score"
//                   />
//                 </div>
//               </div>

//               <div className="col-md-6">
//                 <div className="form-group">
//                   <label className="form-label">Job Type</label>
//                   <select className="form-select form-input rounded-3">
//                     <option value="" disabled selected>Select Job Type</option>
//                     <option value="full-time">Full Time</option>
//                     <option value="part-time">Part Time</option>
//                     <option value="contract">Contract</option>
//                     <option value="internship">Internship</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="col-md-6">
//                 <div className="form-group">
//                   <label className="form-label">Report Schedule</label>
//                   <div className="dropdown" ref={dropdownRef}>
//                     <button
//                       className="btn custom-dropdown-button dropdown-toggle"
//                       type="button"
//                       onClick={() => setIsOpen(!isOpen)}
//                     >
//                       {getButtonText()}
//                     </button>
//                     <div className={`dropdown-menu custom-dropdown-menu ${isOpen ? 'show' : ''}`}>
//                       {days.map((day) => (
//                         <div key={day} className="form-check mb-2">
//                           <input
//                             className="form-check-input rounded-3"
//                             type="checkbox"
//                             id={`${day.toLowerCase()}Checkbox`}
//                             checked={selectedDays.includes(day)}
//                             onChange={() => handleDayToggle(day)}
//                           />
//                           <label 
//                             className="form-check-label ms-2" 
//                             htmlFor={`${day.toLowerCase()}Checkbox`}
//                           >
//                             {day}
//                           </label>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="inclusions mt-5">
//               <h3 className="section-title">Inclusions:</h3>
//               <div className="row g-4 mt-2">
//                 {['Desired Companies', 'Desired Industries', 'Desired Company Size', 'Desired Location'].map((label) => (
//                   <div key={label} className="col-md-6">
//                     <div className="form-group">
//                       <label className="form-label">{label}</label>
//                       <input 
//                         type="text" 
//                         className="form-control form-input rounded-3"
//                         placeholder={`Enter ${label.toLowerCase()}`}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="exclusions mt-5">
//               <h3 className="section-title">Exclusions:</h3>
//               <div className="row g-4 mt-2">
//                 {['Undesired Companies', 'Undesired Industries', 'Undesired Company Size', 'Undesired Location'].map((label) => (
//                   <div key={label} className="col-md-6">
//                     <div className="form-group">
//                       <label className="form-label">{label}</label>
//                       <input 
//                         type="text" 
//                         className="form-control form-input rounded-3"
//                         placeholder={`Enter ${label.toLowerCase()}`}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="upload-resume mt-5">
//               <button type="button" className="btn upload-button">
//                 Upload Resume
//               </button>
//             </div>

//             <div className="submit-preferences mt-5">
//               <button type="submit" className="btn submit-button">
//                 SUBMIT PREFERENCES
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CandidateForm;



//latest code 
// import React, { useState, useRef, useEffect } from 'react';
// import { motion } from 'framer-motion';  // Import motion from Framer Motion
// import './CandidateForm.css';

// const CandidateForm = () => {
//   const [selectedDays, setSelectedDays] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const days = [
//     'Monday', 'Tuesday', 'Wednesday', 'Thursday',
//     'Friday', 'Saturday', 'Sunday'
//   ];

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleDayToggle = (day) => {
//     setSelectedDays(prev =>
//       prev.includes(day)
//         ? prev.filter(d => d !== day)
//         : [...prev, day]
//     );
//   };

//   const getButtonText = () => {
//     if (selectedDays.length === 0) return 'Select Day Of The Week';
//     if (selectedDays.length === days.length) return 'All Days Selected';
//     return `${selectedDays.length} Day${selectedDays.length > 1 ? 's' : ''} Selected`;
//   };

//   return (
//     <div className="main-container">
//       <div className="container">
//         <div className="form-container">
//           <div className="candidate-details-header mb-3">
//             <h2 className="header-title">Candidate Details</h2>
//           </div>

//           <form>
//             <div className="row g-4">
//               <div className="col-md-6">
//                 <div className="form-group">
//                   {/* Wrap label with motion.div to animate */}
//                   <motion.label 
//                     className="form-label"
//                     initial={{ opacity: 0 }} 
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     Target Job Title
//                   </motion.label>
//                   <input 
//                     type="text" 
//                     className="form-control form-input rounded-3"
//                     placeholder="Enter target job title"
//                   />
//                 </div>
//               </div>

//               <div className="col-md-6">
//                 <div className="form-group">
//                   <motion.label 
//                     className="form-label"
//                     initial={{ opacity: 0 }} 
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     Job Location
//                   </motion.label>
//                   <select className="form-select form-input rounded-3">
//                     <option>Select Job Location</option>
//                     <option value="work-from-home">Work From Home (WFH)</option>
//                     <option value="work-from-office">Work From Office (WFO)</option>
//                     <option value="hybrid">Hybrid</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="col-md-6">
//                 <div className="form-group">
//                   <motion.label 
//                     className="form-label"
//                     initial={{ opacity: 0 }} 
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     Minimum Salary
//                   </motion.label>
//                   <input 
//                     type="text" 
//                     className="form-control form-input rounded-3"
//                     placeholder="Enter minimum salary"
//                   />
//                 </div>
//               </div>

//               <div className="col-md-6">
//                 <div className="form-group">
//                   <motion.label 
//                     className="form-label"
//                     initial={{ opacity: 0 }} 
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     Minimum Score
//                   </motion.label>
//                   <input 
//                     type="text" 
//                     className="form-control form-input rounded-3"
//                     placeholder="Enter minimum score"
//                   />
//                 </div>
//               </div>

//               <div className="col-md-6">
//                 <div className="form-group">
//                   <motion.label 
//                     className="form-label"
//                     initial={{ opacity: 0 }} 
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     Job Type
//                   </motion.label>
//                   <select className="form-select form-input rounded-3">
//                     <option value="" disabled selected>Select Job Type</option>
//                     <option value="full-time">Full Time</option>
//                     <option value="part-time">Part Time</option>
//                     <option value="contract">Contract</option>
//                     <option value="internship">Internship</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="col-md-6">
//                 <div className="form-group">
//                   <motion.label 
//                     className="form-label"
//                     initial={{ opacity: 0 }} 
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     Report Schedule
//                   </motion.label>
//                   <div className="dropdown" ref={dropdownRef}>
//                     <button
//                       className="btn custom-dropdown-button dropdown-toggle"
//                       type="button"
//                       onClick={() => setIsOpen(!isOpen)}
//                     >
//                       {getButtonText()}
//                     </button>
//                     <div className={`dropdown-menu custom-dropdown-menu ${isOpen ? 'show' : ''}`}>
//                       {days.map((day) => (
//                         <div key={day} className="form-check mb-2">
//                           <input
//                             className="form-check-input rounded-3"
//                             type="checkbox"
//                             id={`${day.toLowerCase()}Checkbox`}
//                             checked={selectedDays.includes(day)}
//                             onChange={() => handleDayToggle(day)}
//                           />
//                           <label 
//                             className="form-check-label ms-2" 
//                             htmlFor={`${day.toLowerCase()}Checkbox`}
//                           >
//                             {day}
//                           </label>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="inclusions mt-5">
//               <h3 className="section-title">Inclusions:</h3>
//               <div className="row g-4 mt-2">
//                 {['Desired Companies', 'Desired Industries', 'Desired Company Size', 'Desired Location'].map((label) => (
//                   <div key={label} className="col-md-6">
//                     <div className="form-group">
//                       <motion.label 
//                         className="form-label"
//                         initial={{ opacity: 0 }} 
//                         animate={{ opacity: 1 }}
//                         transition={{ duration: 0.5 }}
//                       >
//                         {label}
//                       </motion.label>
//                       <input 
//                         type="text" 
//                         className="form-control form-input rounded-3"
//                         placeholder={`Enter ${label.toLowerCase()}`}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="exclusions mt-5">
//               <h3 className="section-title">Exclusions:</h3>
//               <div className="row g-4 mt-2">
//                 {['Undesired Companies', 'Undesired Industries', 'Undesired Company Size', 'Undesired Location'].map((label) => (
//                   <div key={label} className="col-md-6">
//                     <div className="form-group">
//                       <motion.label 
//                         className="form-label"
//                         initial={{ opacity: 0 }} 
//                         animate={{ opacity: 1 }}
//                         transition={{ duration: 0.5 }}
//                       >
//                         {label}
//                       </motion.label>
//                       <input 
//                         type="text" 
//                         className="form-control form-input rounded-3"
//                         placeholder={`Enter ${label.toLowerCase()}`}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="upload-resume mt-5">
//               <button type="button" className="btn upload-button">
//                 Upload Resume
//               </button>
//             </div>

//             <div className="submit-preferences mt-5">
//               <button type="submit" className="btn submit-button">
//                 SUBMIT PREFERENCES
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CandidateForm;




//code with api integration 
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './CandidateForm.css';
import axios from 'axios';
import Typed from 'typed.js';



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
  });
  const dropdownRef = useRef(null);
  const typedRef = useRef(null);
  const days = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday', 'Sunday'
  ];


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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    const payload = {
      prefs: formData,
      dayOfWeek: selectedDays[0] || '',  // You can adjust this logic as needed
    };

    try {
      const response = await axios.post('/schedule', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="main-container">
      <div className="container">
        <div className="form-container">
          <div className="candidate-details-header mb-3">
            <h2 className="header-title">   <span ref={typedRef}> Candidate Details </span></h2>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="form-group">
                  <motion.label 
                    className="form-label"
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    Target Job Title
                  </motion.label>
                  <input 
                    type="text" 
                    className="form-control form-input rounded-3"
                    placeholder="Enter target job title"
                    value={formData.jobTitles.join(', ')}
                    onChange={(e) => setFormData({ ...formData, jobTitles: e.target.value.split(',') })}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <motion.label 
                    className="form-label"
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    Job Location
                  </motion.label>
                  <select
                    className="form-select form-input rounded-3"
                    onChange={(e) => setFormData({ ...formData, desiredLocations: [e.target.value] })}
                  >
                    <option>Select Job Location</option>
                    <option value="work-from-home">Work From Home (WFH)</option>
                    <option value="work-from-office">Work From Office (WFO)</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <motion.label 
                    className="form-label"
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    Minimum Salary
                  </motion.label>
                  <input 
                    type="text" 
                    className="form-control form-input rounded-3"
                    placeholder="Enter minimum salary"
                    value={formData.lowestSalary}
                    onChange={(e) => setFormData({ ...formData, lowestSalary: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <motion.label 
                    className="form-label"
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    Minimum Score
                  </motion.label>
                  <input 
                    type="text" 
                    className="form-control form-input rounded-3"
                    placeholder="Enter minimum score"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <motion.label 
                    className="form-label"
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    Job Type
                  </motion.label>
                  <select 
                    className="form-select form-input rounded-3"
                    onChange={(e) => setFormData({ ...formData, jobTitles: [e.target.value] })}
                  >
                    <option value="" disabled selected>Select Job Type</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <motion.label 
                    className="form-label"
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    Report Schedule
                  </motion.label>
                  <div className="dropdown" ref={dropdownRef}>
                    <button
                      className="btn custom-dropdown-button dropdown-toggle"
                      type="button"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      {getButtonText()}
                    </button>
                    <div className={`dropdown-menu custom-dropdown-menu ${isOpen ? 'show' : ''}`}>
                      {days.map((day) => (
                        <div key={day} className="form-check mb-2">
                          <input
                            className="form-check-input rounded-3"
                            type="checkbox"
                            id={`${day.toLowerCase()}Checkbox`}
                            checked={selectedDays.includes(day)}
                            onChange={() => handleDayToggle(day)}
                          />
                          <label 
                            className="form-check-label ms-2" 
                            htmlFor={`${day.toLowerCase()}Checkbox`}
                          >
                            {day}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="inclusions mt-5">
              <h3 className="section-title">Inclusions:</h3>
              <div className="row g-4 mt-2">
                {['Desired Companies', 'Desired Industries', 'Desired Company Size', 'Desired Location'].map((label) => (
                  <div key={label} className="col-md-6">
                    <div className="form-group">
                      <motion.label 
                        className="form-label"
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {label}
                      </motion.label>
                      <input 
                        type="text" 
                        className="form-control form-input rounded-3"
                        placeholder={`Enter ${label.toLowerCase()}`}
                        onChange={(e) => setFormData({ ...formData, [label.replace(' ', '').toLowerCase()]: e.target.value })}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="exclusions mt-5">
              <h3 className="section-title">Exclusions:</h3>
              <div className="row g-4 mt-2">
                {['Undesired Companies', 'Undesired Industries', 'Undesired Company Size', 'Undesired Location'].map((label) => (
                  <div key={label} className="col-md-6">
                    <div className="form-group">
                      <motion.label 
                        className="form-label"
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {label}
                      </motion.label>
                      <input 
                        type="text" 
                        className="form-control form-input rounded-3"
                        placeholder={`Enter ${label.toLowerCase()}`}
                        onChange={(e) => setFormData({ ...formData, [label.replace(' ', '').toLowerCase()]: e.target.value })}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>


            <div className="upload-resume mt-5">
              <button type="button" className="btn upload-button">
                Upload Resume
              </button>
            </div>


            <div className="submit-preferences mt-5">
              <button type="submit" className="btn submit-button">
                SUBMIT PREFERENCES
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CandidateForm;







