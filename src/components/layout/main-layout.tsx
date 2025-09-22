import React from "react";

interface MainLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export function MainLayout({ sidebar, children }: MainLayoutProps) {
  return (
    <div className="flex flex-1 h-screen py-6 px-16">
      <aside className="hidden md:flex md:flex-shrink-0 w-72 flex-col">
        {sidebar}
      </aside>
      <main className="flex-1 relative focus:outline-none">
        <div>{children}</div>
      </main>
    </div>
  );
}
