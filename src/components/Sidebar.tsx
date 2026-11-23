import {
  LayoutDashboard,
  LogOut,
  Search,
  ShieldCheck,
  Stethoscope,
  UserCheck,
  Users,
} from "lucide-react";

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Patient Management", icon: Users },
    { label: "Search Patient", icon: Search },
    { label: "Clinic Sign-in", icon: UserCheck },
    { label: "Active Clinic Sessions", icon: ShieldCheck },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <Stethoscope size={22} />
        </div>
        <div>
          <h2>CBU CMS</h2>
          <span>Clinic Management</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-label">MAIN MENU</p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className={`sidebar-link ${
                activePage === item.label ? "active" : ""
              }`}
              onClick={() => onNavigate(item.label)}
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-info">
          <strong>CBU Clinic</strong>
          <span>Management System v1.0</span>
        </div>

        <button className="sidebar-link logout-link">
          <LogOut size={19} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
