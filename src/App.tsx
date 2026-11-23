import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import MainLayout from "./layouts/MainLayout";
import ActiveClinicSessions from "./pages/ActiveClinicSessions";
import ClinicSignIn from "./pages/ClinicSignIn";
import Dashboard from "./pages/Dashboard";
import PatientRegistration from "./pages/PatientRegistration";
import PatientSearch from "./pages/PatientSearch";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  function renderPage() {
    switch (activePage) {
      case "Patient Management":
        return <PatientRegistration />;

      case "Search Patient":
        return <PatientSearch />;

      case "Clinic Sign-in":
        return <ClinicSignIn />;

      case "Active Clinic Sessions":
        return <ActiveClinicSessions />;

      default:
        return <Dashboard onNavigate={setActivePage} />;
    }
  }

  return (
    <MainLayout>
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      <div className="main-content">
        <Topbar />

        <main className="page-content">{renderPage()}</main>
      </div>
    </MainLayout>
  );
}

export default App;
