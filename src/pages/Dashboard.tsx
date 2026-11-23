import {
  Activity,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";
import { getPatients, getSessions } from "../utils/storage";

interface DashboardProps {
  onNavigate?: (page: string) => void;
}

function Dashboard({ onNavigate }: DashboardProps) {
  const patients = getPatients();
  const sessions = getSessions();

  const today = new Date().toDateString();

  const todaysSignIns = sessions.filter(
    (session) => new Date(session.signInTime).toDateString() === today,
  );

  const activeSessions = sessions.filter((session) => session.active);

  const totalPatients = patients.length;
  const totalSignIns = todaysSignIns.length;
  const activeCpcs = activeSessions.length;

  return (
    <div className="dashboard-page">
      <div className="dashboard-welcome">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back. Here is an overview of today's clinic activities.</p>
        </div>

        <div className="dashboard-date">
          <Clock size={16} />
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon green">
            <Users size={22} />
          </div>
          <div className="stat-info">
            <span>Total Patients</span>
            <h2>{totalPatients.toLocaleString()}</h2>
            <small>Registered patients</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">
            <UserCheck size={22} />
          </div>
          <div className="stat-info">
            <span>Today's Sign-ins</span>
            <h2>{totalSignIns}</h2>
            <small>Patients signed in today</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            <Activity size={22} />
          </div>
          <div className="stat-info">
            <span>Active CPCs</span>
            <h2>{activeCpcs}</h2>
            <small>Currently active clinic sessions</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            <ShieldCheck size={22} />
          </div>
          <div className="stat-info">
            <span>Registered Patients</span>
            <h2>{totalPatients}</h2>
            <small>Patients with a Clinic ID</small>
          </div>
        </div>
      </div>

      <div className="dashboard-content-grid">
        <div className="dashboard-panel">
          <div className="panel-header">
            <div>
              <h3>Clinic Overview</h3>
              <p>Today's clinic activity summary</p>
            </div>
          </div>

          <div className="overview-placeholder">
            <Activity size={40} />
            <h4>Clinic Activity</h4>
            <p>
              {totalSignIns} patient sign-in
              {totalSignIns === 1 ? "" : "s"} recorded today.
            </p>
            <p>
              {activeCpcs} active clinic session
              {activeCpcs === 1 ? "" : "s"} currently running.
            </p>
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="panel-header">
            <div>
              <h3>Quick Actions</h3>
              <p>Frequently used operations</p>
            </div>
          </div>

          <div className="quick-actions">
            <button
              className="quick-action"
              onClick={() => onNavigate?.("Clinic Sign-in")}
            >
              <UserCheck size={20} />
              <span>Clinic Sign-in</span>
            </button>

            <button
              className="quick-action"
              onClick={() => onNavigate?.("Patient Management")}
            >
              <Users size={20} />
              <span>Register Patient</span>
            </button>

            <button
              className="quick-action"
              onClick={() => onNavigate?.("Active Clinic Sessions")}
            >
              <ShieldCheck size={20} />
              <span>View Active CPCs</span>
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-panel recent-panel">
        <div className="panel-header">
          <div>
            <h3>Recent Clinic Sign-ins</h3>
            <p>Latest patients signed into the clinic</p>
          </div>
          <button
            className="text-button"
            onClick={() => onNavigate?.("Active Clinic Sessions")}
          >
            View all <ArrowUpRight size={16} />
          </button>
        </div>

        {todaysSignIns.length === 0 ? (
          <div className="empty-state">
            <Users size={32} />
            <p>No clinic sign-ins recorded today.</p>
          </div>
        ) : (
          <div className="recent-signins-list">
            {[...todaysSignIns]
              .reverse()
              .slice(0, 5)
              .map((session) => {
                const patient = patients.find(
                  (item) => item.clinicId === session.clinicId,
                );

                return (
                  <div className="recent-signin-item" key={session.sessionId}>
                    <div>
                      <strong>
                        {patient
                          ? `${patient.firstName} ${patient.lastName}`
                          : "Patient not found"}
                      </strong>
                      <small>{session.clinicId}</small>
                    </div>

                    <span>
                      {new Date(session.signInTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
