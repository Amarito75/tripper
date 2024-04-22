import Sphere from "@/components/sphere";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="mt-16 h-screen">
      <div className="lg:flex lg:justify-center lg:items-start lg:space-x-32">
        <div className="flex-col justify-center items-start space-y-16">
          <h1 className="font-bold text-6xl mx-8">
            Travel easily with <label className="text-blue-500">Tripper</label>
          </h1>
          <div className="flex items-center mx-8 space-x-16">
            <Button className="bg-blue-500 hover:bg-blue-600">
              Try for free
            </Button>
            <Link href={"#info"}>
              <Button className="bg-transparent hover:bg-transparent border border-blue-500 hover:border-blue-600 text-blue-500 hover:text-blue-600">
                Discover
              </Button>
            </Link>
          </div>
        </div>
        <div>
          <Sphere />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
