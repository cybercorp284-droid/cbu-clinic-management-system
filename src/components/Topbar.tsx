import { Bell, ChevronDown, Search } from "lucide-react";

function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-search">
        <Search size={18} />
        <input type="text" placeholder="Search patients, clinic ID..." />
      </div>

      <div className="topbar-right">
        <button className="notification-button" aria-label="Notifications">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <div className="topbar-divider"></div>

        <div className="user-profile">
          <div className="user-avatar">R</div>

          <div className="user-details">
            <strong>Receptionist</strong>
            <span>Clinic Administrator</span>
          </div>

          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}

export default Topbar;
