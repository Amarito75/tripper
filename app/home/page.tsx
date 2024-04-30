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

const HomePage = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [radius, setRadius] = useState(1);
  const [locationName, setLocationName] = useState("");
  const [activitiesResults, setActivitiesResults] = useState();
  const [originLocation, setOriginLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [flightResults, setFlightsResults] = useState([]);

  // const getCoordinates = async (locationName: string) => {
  //   try {
  //     const response = await axios.get(
  //       `https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=AIzaSyCkY8UVf8oLyg3v-JVMXYGxwqdP4XonYoo`
  //     );
  //     console.log(response.data);
  //     setLatitude(response.data.results[0].geometry.location.lat);
  //     setLongitude(response.data.results[0].geometry.location.lng);
  //   } catch (error) {
  //     console.error("Error fetching coordinates:", error);
  //   }
  // };

  const handleSearchFlights = async () => {
    try {
      const response = await searchFlights(originLocation, destinationLocation);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
      <Input
        value={originLocation}
        onChange={(e) => setOriginLocation(e.target.value)}
        placeholder="From ex:PAR"
      />
      <Input
        value={destinationLocation}
        onChange={(e) => setDestinationLocation(e.target.value)}
        placeholder="TO ex:NYC"
      />
      <Button onClick={handleSearchFlights}>Get Flights</Button>
    </div>
  );
};

export default HomePage;
