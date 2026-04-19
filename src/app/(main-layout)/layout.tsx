import React from "react";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="w-full h-20 bg-gray-200">
        <h1>Navbar</h1>
      </div>
      {children}
      <div className="w-full h-100 bg-gray-200">
        <h1>Footer</h1>
      </div>
    </div>
  );
}

export default MainLayout;
