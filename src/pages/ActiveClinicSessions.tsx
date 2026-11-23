import { Activity, Clock, LogOut, ShieldCheck } from "lucide-react";
import { useState } from "react";
import type { ClinicSession, Patient } from "../types/patient";
import { getPatients, getSessions, saveSessions } from "../utils/storage";

function ActiveClinicSessions() {
  const [sessions, setSessions] = useState<ClinicSession[]>(() =>
    getSessions(),
  );
  const patients: Patient[] = getPatients();

  const activeSessions = sessions.filter((session) => session.active);

  function handleSignOut(sessionId: string) {
    const updatedSessions = sessions.map((session) =>
      session.sessionId === sessionId
        ? {
            ...session,
            active: false,
            signOutTime: new Date().toISOString(),
          }
        : session,
    );

    saveSessions(updatedSessions);
    setSessions(updatedSessions);
  }

  function formatTime(date: string) {
    return new Date(date).toLocaleString();
  }

  return (
    <div className="active-sessions-page">
      <div className="page-heading">
        <div>
          <h1>Active Clinic Sessions</h1>
          <p>Monitor patients currently signed into the clinic.</p>
        </div>

        <div className="active-status">
          <span></span>
          Live Sessions
        </div>
      </div>

      <div className="session-summary">
        <div className="session-summary-card">
          <Activity size={22} />
          <div>
            <span>Active Patients</span>
            <h2>{activeSessions.length}</h2>
          </div>
        </div>

        <div className="session-summary-card">
          <ShieldCheck size={22} />
          <div>
            <span>Active CPCs</span>
            <h2>{activeSessions.length}</h2>
          </div>
        </div>
      </div>

      <div className="sessions-panel">
        <div className="sessions-panel-header">
          <div>
            <h2>Currently Signed-in Patients</h2>
            <p>Patients with an active clinic pass code.</p>
          </div>
        </div>

        <div className="sessions-table">
          <div className="sessions-table-header">
            <span>Patient</span>
            <span>Clinic ID</span>
            <span>CPC</span>
            <span>Sign-in Time</span>
            <span>Action</span>
          </div>

          {activeSessions.length === 0 ? (
            <div className="sessions-empty">
              <ShieldCheck size={36} />
              <h3>No Active Sessions</h3>
              <p>Patients signed into the clinic will appear here.</p>
            </div>
          ) : (
            activeSessions.map((session) => {
              const patient = patients.find(
                (item) => item.clinicId === session.clinicId,
              );

              return (
                <div className="session-row" key={session.sessionId}>
                  <span>
                    {patient
                      ? `${patient.firstName} ${patient.lastName}`
                      : "Patient not found"}
                  </span>

                  <span>{session.clinicId}</span>
                  <span className="session-cpc">{session.cpc}</span>
                  <span>{formatTime(session.signInTime)}</span>

                  <button
                    className="signout-button"
                    onClick={() => handleSignOut(session.sessionId)}
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="session-note">
        <Clock size={17} />
        <span>Signing out a patient automatically deactivates their CPC.</span>
      </div>
    </div>
  );
}

export default ActiveClinicSessions;
