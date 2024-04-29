import React from "react";
import Header from "./_components/header";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default HomeLayout;
