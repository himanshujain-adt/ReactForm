import * as Yup from "yup";
export const CandidateSchema = Yup.object().shape({
  candidateName: Yup.string().
    matches(/^[a-zA-Z\s,.]*$/, "Only letters, spaces, and commas are allowed")
    .required("Candidate name is required"),
  candidateId: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
  jobTitles: Yup.string()
    .required("Job title cannot be empty")
    .min(1, "At least one job title is required"),
  distributionList: Yup.string()
    .matches(
      /^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})(,\s*[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})*$/i,
      "Invalid email address or format. Emails must be comma-separated."
    )
    .required("Email address is required")
    .min(1, "At least one email is required"),
  physicalLocation: Yup.string().matches(/^[a-zA-Z0-9, ]+$/, "Only letters, numbers,spaces and commas are allowed")
    .required("Physical Location is required"),
  lowestSalary: Yup.string("Please enter a valid number for salary").required(
    "Please enter a minimum salary"
  ),
  minimumScore: Yup.string()
    .required("Minimum Score is required")
    .matches(/^\d+(\.\d+)?%$/, "Score must be a valid number followed by '%'") // Regex to ensure only numbers and '%' at the end
    .transform((value) => value.trim()) // Remove any extra spaces
    .test(
      "is-valid-number",
      "Score must be a valid number between 0 and 100",
      (value) => {
        // Extract the number from the value (without the '%' symbol) and check the range
        const numberValue = parseFloat(value.replace("%", ""));
        return !isNaN(numberValue) && numberValue >= 0 && numberValue <= 100;
      }
    ),

  jobTypes: Yup.array()
    .min(1, "At least one option must be selected")
    .required("Job Type is required"),
  reportSchedules: Yup.array()
    .min(1, "At least one option must be selected")
    .required("Report Schedule  is required"),
  jobLocations: Yup.array()
    .min(1, "At least one location must be selected")
    .required("Job location is required"),
 resumeFile: Yup.mixed().required('Resume is required'),




});
