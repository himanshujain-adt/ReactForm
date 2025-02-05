// import React, { useState, useEffect, useRef } from 'react';
// import { X } from 'lucide-react';

// const JobTitleSearch = ({ formData, handleJobTitleChange, errors }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedJobs, setSelectedJobs] = useState(formData.jobTitles ? formData.jobTitles.split(',').map(job => job.trim()) : []);
//   const [suggestions, setSuggestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState(-1);
//   const [cachedResults, setCachedResults] = useState({});
//   const wrapperRef = useRef(null);
//   const inputRef = useRef(null);

//   // Handle clicks outside of the component
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
//         setShowSuggestions(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Update parent form data when selected jobs change
//   useEffect(() => {
//     if (selectedJobs.length > 0) {
//       handleJobTitleChange(selectedJobs.join(', '));
//     } else {
//       handleJobTitleChange('');
//     }
//   }, [selectedJobs, handleJobTitleChange]);

//   const debounce = (func, delay) => {
//     let timeoutId;
//     return (...args) => {
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(() => func(...args), delay);
//     };
//   };

//   const fetchJobSuggestions = async (query) => {
//     const lowercaseQuery = query.toLowerCase();
//     if (cachedResults[lowercaseQuery]) {
//       setSuggestions(cachedResults[lowercaseQuery]);
//       return;
//     }

//     setLoading(true);
//     try {
//       // Using a proxy server to handle CORS
//       const response = await fetch(
//         `/api/proxy/jobs?query=${encodeURIComponent(query)}`,
//         {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }
//       );
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch job suggestions');
//       }

//       const data = await response.json();

//       const jobTitles = Array.isArray(data.results) 
//         ? data.results
//             .map((job) => job.title)
//             .filter((title) => !selectedJobs.includes(title))
//             .filter((title, index, self) => self.indexOf(title) === index)
//             .slice(0, 10)
//         : [];

//       setSuggestions(jobTitles);
//       setCachedResults((prev) => ({ ...prev, [lowercaseQuery]: jobTitles }));
//     } catch (error) {
//       console.error('Error fetching job suggestions:', error);
//       setSuggestions([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const debouncedFetch = debounce(fetchJobSuggestions, 500);

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);

//     if (value.length >= 3) {
//       debouncedFetch(value);
//       setShowSuggestions(true);
//     } else {
//       setSuggestions([]);
//       setShowSuggestions(false);
//     }
//     setSelectedIndex(-1);
//   };

//   const handleSuggestionClick = (suggestion) => {
//     if (!selectedJobs.includes(suggestion)) {
//       const newSelectedJobs = [...selectedJobs, suggestion];
//       setSelectedJobs(newSelectedJobs);
//     }
//     setSearchTerm('');
//     setSuggestions([]);
//     setShowSuggestions(false);
//     setSelectedIndex(-1);
//     inputRef.current?.focus();
//   };

//   const removeJob = (jobToRemove) => {
//     const newSelectedJobs = selectedJobs.filter((job) => job !== jobToRemove);
//     setSelectedJobs(newSelectedJobs);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'ArrowDown') {
//       e.preventDefault();
//       setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
//     } else if (e.key === 'ArrowUp') {
//       e.preventDefault();
//       setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
//     } else if (e.key === 'Enter' && selectedIndex >= 0) {
//       e.preventDefault();
//       handleSuggestionClick(suggestions[selectedIndex]);
//     } else if (e.key === 'Escape') {
//       setShowSuggestions(false);
//     } else if (e.key === 'Backspace' && searchTerm === '' && selectedJobs.length > 0) {
//       removeJob(selectedJobs[selectedJobs.length - 1]);
//     }
//   };

//   return (
//     <div className="relative" ref={wrapperRef}>
//       <div className="flex flex-wrap gap-2 p-2 border rounded-lg bg-white">
//         {selectedJobs.map((job, index) => (
//           <div
//             key={index}
//             className="flex items-center gap-1 px-2 py-1 bg-blue-100 rounded-full"
//           >
//             <span>{job}</span>
//             <button
//               type="button"
//               onClick={() => removeJob(job)}
//               className="p-1 hover:text-red-500"
//             >
//               <X size={14} />
//             </button>
//           </div>
//         ))}
//         <input
//           ref={inputRef}
//           type="text"
//           value={searchTerm}
//           onChange={handleInputChange}
//           onKeyDown={handleKeyDown}
//           className={`flex-1 outline-none border-none ${errors?.jobTitles ? 'text-red-500' : ''}`}
//           placeholder={selectedJobs.length === 0 ? "e.g Java Developer" : ""}
//         />
//       </div>

//       {showSuggestions && suggestions.length > 0 && (
//         <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
//           {suggestions.map((suggestion, index) => (
//             <div
//               key={index}
//               className={`px-4 py-2 cursor-pointer ${
//                 index === selectedIndex ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
//               }`}
//               onClick={() => handleSuggestionClick(suggestion)}
//               onMouseEnter={() => setSelectedIndex(index)}
//             >
//               {suggestion}
//             </div>
//           ))}
//         </div>
//       )}
      
//       {errors?.jobTitles && (
//         <div className="text-red-500 text-sm mt-1">{errors.jobTitles}</div>
//       )}
//     </div>
//   );
// };

// export default JobTitleSearch;