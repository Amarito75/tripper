"use client";

import { searchActivities, searchFlights } from "@/services/tripper-api";
import axios from "axios";
import React, { useState } from "react";
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
      <h1 className="text-6xl text-black text-center my-8">
        Find your best trip
      </h1>
      <div className="flex justify-center items-center ">
        <TripForm />
      </div>
    </div>
  );
};

export default HeroSection;
