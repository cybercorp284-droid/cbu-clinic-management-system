import {
  AlertCircle,
  CheckCircle,
  Search,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import type { Patient } from "../types/patient";
import { getPatients, getSessions, saveSessions } from "../utils/storage";

function ClinicSignIn() {
  const [clinicId, setClinicId] = useState("");
  const [patient, setPatient] = useState<Patient | null>(null);
  const [message, setMessage] = useState("");
  const [cpc, setCpc] = useState("");

  function handleVerify(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    const searchId = clinicId.trim();

    setPatient(null);
    setMessage("");
    setCpc("");

    if (!searchId) {
      setMessage("Please enter a Clinic ID.");
      return;
    }

    const patients = getPatients();

    const result = patients.find(
      (item) => item.clinicId.toLowerCase() === searchId.toLowerCase(),
    );

    if (!result) {
      setMessage("No registered patient found with this Clinic ID.");
      return;
    }

    const alreadySignedIn = getSessions().some(
      (session) => session.clinicId === result.clinicId && session.active,
    );

    setPatient(result);

    if (alreadySignedIn) {
      setMessage("This patient already has an active clinic session.");
    }
  }

  function handleSignIn() {
    if (!patient) return;

    const sessions = getSessions();

    const alreadySignedIn = sessions.some(
      (session) => session.clinicId === patient.clinicId && session.active,
    );

    if (alreadySignedIn) {
      setMessage("This patient already has an active clinic session.");
      return;
    }

    const newCpc = `CPC-${Math.floor(100000 + Math.random() * 900000)}`;

    sessions.push({
      sessionId: `SESSION-${Date.now()}`,
      clinicId: patient.clinicId,
      cpc: newCpc,
      signInTime: new Date().toISOString(),
      active: true,
    });

    saveSessions(sessions);
    setCpc(newCpc);
    setMessage("Patient successfully signed into the clinic.");
  }

  return (
    <div className="clinic-signin-page">
      <div className="page-heading">
        <div>
          <h1>Clinic Sign-in</h1>
          <p>Verify a registered patient and sign them into the clinic.</p>
        </div>
      </div>

      <div className="signin-card">
        <div className="signin-card-header">
          <div className="signin-icon">
            <UserCheck size={22} />
          </div>
          <div>
            <h2>Patient Verification</h2>
            <p>Enter the patient's Clinic ID to begin.</p>
          </div>
        </div>

        <form className="signin-form" onSubmit={handleVerify}>
          <label htmlFor="signinClinicId">Patient Clinic ID</label>

          <div className="signin-input-group">
            <Search size={18} />
            <input
              id="signinClinicId"
              type="text"
              value={clinicId}
              onChange={(event) => {
                setClinicId(event.target.value);
                setPatient(null);
                setMessage("");
                setCpc("");
              }}
              placeholder="Enter Clinic ID"
            />
            <button type="submit">Verify ID</button>
          </div>
        </form>

        {message && (
          <div className={cpc ? "signin-success" : "signin-message"}>
            {cpc ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{message}</span>
          </div>
        )}

        {patient && (
          <div className="verified-patient">
            <div className="verified-patient-header">
              <CheckCircle size={22} />
              <strong>Patient Identity Verified</strong>
            </div>

            <h3>
              {patient.firstName} {patient.lastName}
            </h3>
            <p>Clinic ID: {patient.clinicId}</p>
            <p>Student Number: {patient.studentNumber}</p>
            <p>Phone: {patient.phoneNumber}</p>

            {!cpc &&
              !getSessions().some(
                (session) =>
                  session.clinicId === patient.clinicId && session.active,
              ) && (
                <button
                  className="submit-button"
                  type="button"
                  onClick={handleSignIn}
                >
                  <UserCheck size={18} />
                  Sign Patient Into Clinic
                </button>
              )}
          </div>
        )}

        {cpc && (
          <div className="cpc-result">
            <ShieldCheck size={30} />
            <h3>Clinic Pass Code Generated</h3>
            <strong>{cpc}</strong>
            <p>This patient now has an active clinic session.</p>
            <small>SMS delivery is simulated in this prototype.</small>
          </div>
        )}

        {!patient && !message && (
          <div className="verification-placeholder">
            <ShieldCheck size={34} />
            <h3>Awaiting Patient Verification</h3>
            <p>
              Enter a valid Clinic ID to retrieve the patient's registered
              information.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClinicSignIn;
