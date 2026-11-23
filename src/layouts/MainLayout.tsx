import type { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return <div className="main-layout">{children}</div>;
}

export default MainLayout;
