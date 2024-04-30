import React from "react";
import Logo from "./ui/logo";
import { Button } from "./ui/button";
import Link from "next/link";

const navItems = [
  {
    label: "How it works",
    href: "#info",
  },
  {
    label: "About",
    href: "#about",
  },
];

const Header = () => {
  return (
    <div className="w-full top-0 right-0 bg-blue-600 px-3 lg:py-6">
      <div className="flex items-center justify-between px-4 lg:px-16">
        <Logo />
        <div className="flex justify-between space-x-8">
          {navItems.map((navItem, index) => (
            <>
              <a
                key={index}
                href={navItem.href}
                className="text-lg text-white font-semibold"
              >
                {navItem.label}
              </a>
            </>
          ))}
        </div>
        <div className="flex items-center gap-x-8">
          <Link href={"/home"}>Connect</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
