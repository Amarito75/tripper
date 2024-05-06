"use client";

import MapCard from "@/components/map";
import { Button } from "@/components/ui/button";
import { ImagesSlider } from "@/components/ui/images-slider";
import { Input } from "@/components/ui/input";
import { searchActivities, searchFlights } from "@/services/tripper-api";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import { PlaceholdersAndVanishInput } from "../ui/placeholder-and-vanish-input";
import { SearchIcon } from "lucide-react";
import { CardProduct } from "../ui/card-product";

interface AutocompleteResult {
  minimumDuration: string;
  id: string;
  matched_substrings: {
    length: number;
    offset: number;
  }[];
  place_id: string;
  reference: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
  terms: {
    offset: number;
    value: string;
  }[];
  types: string[];
}

interface FlightResults {
  lastTicketingDate: string;
  price: {
    currency: string;
    total: string;
  };
  oneWay: boolean;
  numberOfBookableSeats: number;
  itineraries: {
    segments: {
      arrival: {
        at: string;
        iataCode: string;
        terminale: string;
      };
      departure: {
        at: string;
        iataCode: string;
        terminale: string;
      };
    }[];
  }[];
}
[];

interface SearchResults {
  formatted_address: string;
}
[];

interface ActivitiesResults {
  name: string;
  pictures: string;
  minimumDuration: string;
  bookingLink: string;
  price: {
    amount: string;
    currencyCode: string;
  };
}
[];

const HeroSection = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [radius, setRadius] = useState(1);
  const [locationName, setLocationName] = useState("");
  const [activitiesResults, setActivitiesResults] = useState<
    ActivitiesResults[]
  >([]);
  const [originLocation, setOriginLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [flightResults, setFlightsResults] = useState<FlightResults[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResults[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cabinType, setCabinType] = useState("ECONOMY");

  const placeholders = ["Paris", "London", "New York", "Dubai", "Hong Kong"];

  const getCoordinates = async (locationName: string) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=AIzaSyCkY8UVf8oLyg3v-JVMXYGxwqdP4XonYoo`
      );
      console.log(response.data.results);
      setLatitude(response.data.results[0].geometry.location.lat);
      setLongitude(response.data.results[0].geometry.location.lng);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const handleSearchFlights = async () => {
    try {
      const response = await searchFlights(
        originLocation,
        destinationLocation,
        cabinType
      );
      console.log(response?.data.data);
      setFlightsResults(response?.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(flightResults);

  const handleSearchSubmit = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchQuery}&key=AIzaSyCkY8UVf8oLyg3v-JVMXYGxwqdP4XonYoo`
      );
      console.log(response.data);
      setSearchResults(response.data.predictions);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSelectLocation = (location: string) => {
    setOriginLocation(location);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationName(e.target.value);
    getCoordinates(locationName);
    getCoordinates;
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchActivities = async () => {
    try {
      const response = await searchActivities(latitude, longitude, 1);
      console.log("ACTIVITES: ", response?.data.data);
      setActivitiesResults(response?.data?.data);
      console.log(typeof activitiesResults);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-32">
        <span className="inline-flex animate-text-gradient bg-gradient-to-r from-[#ACACAC] via-[#363636] to-[#ACACAC] bg-[200%_auto] text-6xl text-center text-transparent font-medium bg-clip-text">
          Find the best trip
        </span>
      </div>
      <div className="mt-8 flex justify-center">
        <div className="flex items-center border border-black/25 p-4 rounded-full w-2/5">
          <input
            value={locationName}
            onChange={handleChange}
            placeholder="Search a city"
            className="w-full focus:outline-none"
          />
          <button
            onClick={() => {
              getCoordinates(locationName);
              handleSearchActivities();
            }}
            className="bg-black p-2 rounded-full"
          >
            <SearchIcon className="text-white" />
          </button>
        </div>
      </div>
      <p className="flex justify-center">
        {searchResults.map((result, index) => (
          <p key={index}>{result.formatted_address}</p>
        ))}
        {/* {searchResults[0]?.formatted_address} */}
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-8">
        {activitiesResults.map((result, index) => (
          <CardProduct
            key={index}
            text={result.minimumDuration}
            price={result.price.amount}
            image={result.pictures[0]}
            title={result.name}
          />
        ))}
      </div>
    </>
  );
};

export default HeroSection;
