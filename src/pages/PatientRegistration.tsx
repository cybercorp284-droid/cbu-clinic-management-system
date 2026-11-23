import { CheckCircle, UserPlus } from "lucide-react";
import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { addPatient, generateClinicId } from "../utils/storage";

function PatientRegistration() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    studentNumber: "",
    phoneNumber: "",
    email: "",
    gender: "",
  });

  const [generatedId, setGeneratedId] = useState("");

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const clinicId = generateClinicId();

    addPatient({
      ...formData,
      clinicId,
      dateRegistered: new Date().toISOString(),
    });

    setGeneratedId(clinicId);

    setFormData({
      firstName: "",
      lastName: "",
      studentNumber: "",
      phoneNumber: "",
      email: "",
      gender: "",
    });
  }

  function handleClear() {
    setGeneratedId("");
    setFormData({
      firstName: "",
      lastName: "",
      studentNumber: "",
      phoneNumber: "",
      email: "",
      gender: "",
    });
  }

  return (
    <div className="registration-page">
      <div className="page-heading">
        <div>
          <h1>Register New Patient</h1>
          <p>Register a patient and generate their unique Clinic ID.</p>
        </div>
      </div>

      {generatedId && (
        <div className="registration-success">
          <CheckCircle size={22} />
          <div>
            <strong>Patient registered successfully!</strong>
            <p>
              Generated Clinic ID: <strong>{generatedId}</strong>
            </p>
            <p>Please provide this Clinic ID to the patient.</p>
          </div>
        </div>
      )}

      <div className="registration-card">
        <div className="registration-card-header">
          <div className="registration-icon">
            <UserPlus size={22} />
          </div>
          <div>
            <h2>Patient Information</h2>
            <p>Enter the patient's details below to create a new record.</p>
          </div>
        </div>

        <form className="patient-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                type="text"
                placeholder="Enter first name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                type="text"
                placeholder="Enter last name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="studentNumber">Student Number</label>
              <input
                id="studentNumber"
                name="studentNumber"
                value={formData.studentNumber}
                onChange={handleChange}
                type="text"
                placeholder="Enter student number"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                type="tel"
                placeholder="+260..."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter email address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div className="form-footer">
            <button
              type="button"
              className="cancel-button"
              onClick={handleClear}
            >
              Clear Form
            </button>

            <button type="submit" className="submit-button">
              <UserPlus size={18} />
              Register Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PatientRegistration;
