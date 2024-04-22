import Header from "@/components/header";
import MapCard from "@/components/map";
import { Search } from "@/components/search";
import HeroSection from "@/components/sections/hero";
import Info from "@/components/sections/info";

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <Info />
    </div>
  );
}
