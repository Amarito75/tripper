"use client";

import React from "react";
import { UserButton, useClerk } from "@clerk/nextjs";

const Header = () => {
  const { user } = useClerk();
  return (
    <div className="flex items-center right-0 top-0 bg-blue-600 py-6 px-4">
      <div className="flex items-start gap-x-4">
        <h1 className="text-white text-xl">
          Welcome {user?.firstName} {user?.lastName}
        </h1>
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
