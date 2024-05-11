import {
  searchFlights,
  searchHotelById,
  searchHotels,
} from "@/services/tripper-api";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import {
  MoveDown,
  MoveRight,
  Plane,
  PlaneLanding,
  PlaneTakeoff,
} from "lucide-react";
import { format, formatDuration, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";

interface FlightResults {
  lastTicketingDate: string;
  price: {
    currency: string;
    total: string;
  };
  oneWay: boolean;
  numberOfBookableSeats: number;
  itineraries: {
    duration: string;
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

interface HotelIdResult {
  hotel: {
    name: string;
  };
  offers: {
    price: {
      currency: string;
      total: string;
    };
  }[];
}
[];

interface HotelsResults {
  distance: {
    value: number;
    unit: string;
  };
  hotelId: string;
  name: string;
  geoCode: {
    latitude: number;
    longitude: number;
  };
}
[];

interface SearchResults {
  address_components: {
    short_name: string;
  }[];
}
[];

const TripForm = () => {
  const [flightResults, setFlightsResults] = useState<FlightResults[]>([]);
  const [hotelResults, setHotelResults] = useState<HotelsResults[]>([]);
  const [hotelIdResult, setHotelIdResult] = useState<HotelIdResult[]>([]);
  const [originLocation, setOriginLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [searchResults, setSearchResults] = useState<SearchResults[]>([]);
  const [locationName, setLocationName] = useState("");
  const [hotelId, setHotelId] = useState<string | null>(null);

  const getCoordinates = async (locationName: string) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}?language=english&key=AIzaSyCkY8UVf8oLyg3v-JVMXYGxwqdP4XonYoo`
      );
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
        "ECONOMY"
      );
      setFlightsResults(response?.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchHotelsById = async () => {
    try {
      const response = await searchHotelById("MCLONGHM");
      console.log("HOTEL", response.data[0]);
      setHotelIdResult(response.data[0]);
      console.log(hotelIdResult[0].hotel.name);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchHotels = async () => {
    try {
      const response = await searchHotels(destinationLocation);
      setHotelResults(response.data);
      if (response.data.length > 0) {
        setHotelId(response.data[0].hotelId);
        console.log();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClick = () => {
    handleSearchFlights();
    handleSearchHotels();
  };

  useEffect(() => {
    if (hotelId) {
      handleSearchHotelsById();
    }
  }, [hotelId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationName(e.target.value);
    getCoordinates(locationName);
    getCoordinates;
  };

  console.log(flightResults);

  const timeFormatter = (time: string) => {
    const isoDateTime = time;
    const date = new Date(isoDateTime);

    // Formater la date en anglais
    const formattedDate = format(date, "eee, d MMMM yyyy", { locale: enUS });

    // Formater l'heure
    const formattedTime = format(date, "HH:mm");

    return { formattedDate, formattedTime };
  };

  const formatCustomDuration = (duration: string) => {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (!match) return ""; // Si la durée n'est pas au format attendu, retourne une chaîne vide

    const hours = match[1] ? parseInt(match[1], 10) : 0;
    const minutes = match[2] ? parseInt(match[2], 10) : 0;

    return `${hours}h${minutes.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-x-4">
        <Input
          type="text"
          value={originLocation}
          onChange={(e) => setOriginLocation(e.target.value)}
          placeholder="Choose an origin location"
        />
        <Input
          type="text"
          value={destinationLocation}
          onChange={(e) => setDestinationLocation(e.target.value)}
          placeholder="Choose a destination location"
        />
        <Input
          value={locationName}
          onChange={handleChange}
          placeholder="Search a city"
        />

        <Button onClick={onClick}>Search</Button>
      </div>
      {searchResults &&
        searchResults.map((result, index) => (
          <p className="" key={index}>
            Result for :{result.address_components[0].short_name}
          </p>
        ))}
      {flightResults && flightResults.length > 0 && (
        <div className="mt-8">
          <h1 className="text-xl text-red-500">Flight</h1>
          <div className="bg-white rounded-lg shadow-lg shadow-black/25 p-4 mt-2">
            {/* <p className="text-green-500">{flightResults[0].price.currency}</p>
      <h1>{flightResults[0].price.total}</h1> */}
            <div className="flex justify-between w-full">
              {flightResults[0].itineraries.map((itinerary, i) => (
                <>
                  <div key={i} className="">
                    {itinerary.segments.map((segment, j) => (
                      <div key={j} className="flex items-start space-x-20">
                        <div className="flex flex-col items-center">
                          <p className="text-black">
                            {timeFormatter(segment.arrival.at).formattedDate}
                          </p>
                          <p className="text-sm text-gray-400">
                            {timeFormatter(segment.arrival.at).formattedTime}
                          </p>
                        </div>
                        <div className="flex flex-col items-center space-y-4">
                          <p className="text-xl">
                            {segment.departure.iataCode}
                          </p>
                          <MoveDown />
                          <p className="text-xl">{segment.arrival.iataCode}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p>{formatCustomDuration(itinerary.duration)}</p>
                </>
              ))}
            </div>
          </div>
        </div>
      )}
      {hotelResults && hotelResults.length > 0 && (
        <div className="mt-4">
          <h1 className="text-red-500 text-lg">Hotels :</h1>
          <div className="bg-white rounded-lg shadow-lg shadow-black/25 p-4 mt-2">
            <h1 className="">{hotelResults[0].name}</h1>
            <h1 className="">{hotelResults[0].geoCode.latitude}</h1>
            <h1 className="">{hotelResults[0].geoCode.longitude}</h1>
            <p className="">{hotelResults[0].hotelId}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripForm;
