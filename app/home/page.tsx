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

interface AutocompleteResult {
  description: string;
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

const HomePage = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [radius, setRadius] = useState(1);
  const [locationName, setLocationName] = useState("");
  const [activitiesResults, setActivitiesResults] = useState();
  const [originLocation, setOriginLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [flightResults, setFlightsResults] = useState<FlightResults[]>([]);
  const [searchResults, setSearchResults] = useState<AutocompleteResult[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cabinType, setCabinType] = useState("ECONOMY");

  const getCoordinates = async (locationName: string) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=AIzaSyCkY8UVf8oLyg3v-JVMXYGxwqdP4XonYoo`
      );
      console.log(response.data);
      setLatitude(response.data.results[0].geometry.location.lat);
      setLongitude(response.data.results[0].geometry.location.lng);
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // const handleSearchActivities = async () => {
  //   try {
  //     const response = await searchActivities(latitude, longitude, 1);
  //     console.log("ACTIVITES: ", response?.data.data);
  //     setActivitiesResults(response?.data?.data);
  //     console.log(typeof activitiesResults);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      {/* <Input
        value={locationName}
        onChange={(e) => setLocationName(e.target.value)}
        placeholder="Search a city"
      />
      {latitude} {longitude}
      <Button
        onClick={() => {
          getCoordinates(locationName);
          handleSearchActivities();
        }}
      >
        Get coordinates
      </Button>
      {activitiesResults?.map((activity: any, index: React.Key) => (
        <div
          key={index}
          className="p-4 bg-white shadow-sm shadow-black rounded-lg"
        >
          <div className="flex-col">
            <Image
              src={activity.pictures[0]}
              alt="activity picture"
              width={200}
              height={200}
            />
            <h1 className="text-bold text-xl">{activity.name}</h1>
          </div>
          <p>Minimum Duration: {activity.minimumDuration}</p>
          <p>
            Price: {activity.price.amount} {activity.price.currencyCode}
          </p>
        </div>
      ))} */}
      {/* <div className="absolute inset-y-0 right-0 w-3/5">
        <MapCard
          latitude={latitude}
          longitude={longitude}
          name={""}
          address={""}
        />
      </div> */}
      <div className="flex items-center space-x-8">
        <h1 className="uppercase">From</h1>
        <Input
          type="search"
          placeholder="Search a city..."
          value={originLocation}
          onChange={(e) => setOriginLocation(e.target.value)}
        />
        <Input
          type="search"
          placeholder="Search a city..."
          value={destinationLocation}
          onChange={(e) => setDestinationLocation(e.target.value)}
        />
        {/* <Select value={cabinType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Class</SelectLabel>
              <SelectItem value="ECONOMY">Economy</SelectItem>
              <SelectItem value="PREMIUM_ECONOMY">Premium Economy</SelectItem>
              <SelectItem value="BUSINESS">Business</SelectItem>
              <SelectItem value="FIRST">First</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> */}
        <select
          name=""
          id=""
          value={cabinType}
          onChange={(e) => setCabinType(e.target.value)}
        >
          <option value="ECONOMY">Economy</option>
          <option value="PREMIUM_ECONOMY">Premium Economy</option>
          <option value="BUSINESS">Business</option>
          <option value="FIRST">First</option>
        </select>
        <Button onClick={handleSearchFlights}>Get Flights</Button>
      </div>
      {flightResults.map((result, index) => (
        <div className="" key={index}>
          <h1 className="">{result.lastTicketingDate}</h1>
          <h2 className="">
            {result.price.currency} {result.price.total}
          </h2>
          <h1 className="">
            Departure :{result.itineraries[0].segments[0].departure.iataCode} |{" "}
            {result.itineraries[0].segments[0].departure.at}
          </h1>
          <h1 className="">
            Arrival :{result.itineraries[0].segments[1].arrival.iataCode} |{" "}
            {result.itineraries[0].segments[1].arrival.at}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
