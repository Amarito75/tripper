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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import TripForm from "../trip-form";

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
  id: string;
  geoCode: {
    latitude: number;
    longitude: number;
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
  const [budgetNumber, setBudgetNumber] = useState(0);

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

  const saveActivity = async (activity: any) => {
    try {
      await axios.post("/api/activity", activity);
      console.log("Activity saved successfully!");
    } catch (error) {
      console.error("Error saving activity:", error);
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

  const handleInputChange = (e: any) => {
    setBudgetNumber(e.target.value);
  };

  return (
    <div className="h-screen">
      <div className="relative h-1/2">
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
          <h1 className="text-6xl text-black text-center mb-8">
            Find your best trip
          </h1>
          <TripForm />
          {/* <div className="relative flex justify-center backdrop-blur-lg p-2 rounded-full w-auto">
            <div className="flex items-end p-4 justify-between rounded-full w-full gap-x-4">
              <div className="flex-col items-start">
                <h3 className="text-white uppercase text-sm">destination</h3>
                <input
                  value={locationName}
                  onChange={handleChange}
                  placeholder="Search a city"
                  className="focus:outline-none bg-transparent placeholder:text-white border border-white p-2 rounded-full"
                />
              </div>

              <div className="flex-col items-start">
                <h3 className="text-white uppercase text-sm">guests</h3>
                <Select>
                  <SelectTrigger className="bg-transparent focus:outline-none rounded-full active:outline-none">
                    <SelectValue
                      placeholder="Choose number of guests"
                      className="placeholder:text-white text-white"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-transparent backdrop-blur-lg rounded-xl text-white">
                    <SelectGroup>
                      <SelectLabel>Guests</SelectLabel>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-col items-start">
                <h3 className="text-white uppercase text-sm">budget</h3>
                <input
                  type="number"
                  placeholder="Enter your budget"
                  value={budgetNumber}
                  onChange={handleInputChange}
                  className="focus:outline-none bg-transparent placeholder:text-white border border-white p-2 rounded-full text-white"
                />
              </div>

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
          </div> */}
        </div>
      </div>
      {/* <p className="flex justify-center">
        {searchResults.map((result, index) => (
          <p key={index}>{result.formatted_address}</p>
        ))}
      </p> */}
      {/* <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-8">
        {activitiesResults &&
          activitiesResults
            .filter((result) => {
              const priceAsNumber = parseFloat(result.price.amount);
              return !isNaN(priceAsNumber) && budgetNumber >= priceAsNumber;
            })
            .map((result, index) => (
              <CardProduct
                key={index}
                text={result.minimumDuration}
                price={result.price.amount}
                image={result.pictures[0]}
                title={result.name}
                onClick={() =>
                  saveActivity({
                    name: result.name,
                    price: result.price.amount,
                    longitude: result.geoCode.longitude,
                    latitude: result.geoCode.latitude,
                    activityId: result.id,
                  })
                }
                currency={result.price.currencyCode}
              />
            ))}
      </div> */}
    </div>
  );
};

export default HeroSection;
