import { AlertCircle, CheckCircle, Search, UserRound } from "lucide-react";
import { useState } from "react";
import type { Patient } from "../types/patient";
import { getPatients } from "../utils/storage";

function PatientSearch() {
  const [clinicId, setClinicId] = useState("");
  const [patient, setPatient] = useState<Patient | null>(null);
  const [searched, setSearched] = useState(false);

  function handleSearch() {
    const searchId = clinicId.trim();

    setPatient(null);
    setSearched(true);

    if (!searchId) {
      return;
    }

    const patients = getPatients();

    const result = patients.find(
      (item) => item.clinicId.toLowerCase() === searchId.toLowerCase(),
    );

    setPatient(result || null);
  }

  return (
    <div className="patient-search-page">
      <div className="page-heading">
        <div>
          <h1>Patient Search</h1>
          <p>Search and retrieve patient records using their Clinic ID.</p>
        </div>
      </div>

      <div className="search-card">
        <div className="search-card-header">
          <div className="search-icon">
            <Search size={22} />
          </div>
          <div>
            <h2>Find a Patient</h2>
            <p>Enter the patient's Clinic ID to retrieve their information.</p>
          </div>
        </div>

        <form
          className="patient-search-form"
          onSubmit={(event) => {
            event.preventDefault();
            handleSearch();
          }}
        >
          <div className="search-input-group">
            <label htmlFor="clinicId">Clinic ID</label>
            <div className="clinic-id-input">
              <Search size={18} />
              <input
                id="clinicId"
                type="text"
                value={clinicId}
                onChange={(event) => {
                  setClinicId(event.target.value);
                  setSearched(false);
                  setPatient(null);
                }}
                placeholder="e.g. CBU-2026-0001"
              />
            </div>
          </div>

          <button className="search-submit-button" type="submit">
            Search Patient
          </button>
        </form>
      </div>

      {searched && !clinicId.trim() && (
        <div className="search-message error">
          <AlertCircle size={20} />
          <span>Please enter a Clinic ID before searching.</span>
        </div>
      )}

      {searched && clinicId.trim() !== "" && !patient && (
        <div className="search-message error">
          <AlertCircle size={20} />
          <span>No patient found with that Clinic ID.</span>
        </div>
      )}

      {patient && (
        <div className="patient-result-card">
          <div className="patient-result-header">
            <div className="patient-result-avatar">
              <UserRound size={26} />
            </div>

            <div>
              <h2>
                {patient.firstName} {patient.lastName}
              </h2>
              <span>{patient.clinicId}</span>
            </div>

            <div className="verified-label">
              <CheckCircle size={16} />
              Registered
            </div>
          </div>

          <div className="patient-details-grid">
            <div>
              <span>Student Number</span>
              <strong>{patient.studentNumber}</strong>
            </div>

            <div>
              <span>Phone Number</span>
              <strong>{patient.phoneNumber}</strong>
            </div>

            <div>
              <span>Email Address</span>
              <strong>{patient.email || "Not provided"}</strong>
            </div>

            <div>
              <span>Gender</span>
              <strong>{patient.gender}</strong>
            </div>

            <div>
              <span>Date Registered</span>
              <strong>
                {new Date(patient.dateRegistered).toLocaleDateString()}
              </strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientSearch;
