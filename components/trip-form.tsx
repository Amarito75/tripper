import {
  searchActivities,
  searchCityByKeyword,
  searchCoffee,
  searchFlights,
  searchHotelById,
  searchHotels,
  searchRestaurant,
} from "@/services/tripper-api";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import {
  Bed,
  Calendar,
  Clock,
  Croissant,
  Luggage,
  MoveDown,
  MoveRight,
  PersonStanding,
  PersonStandingIcon,
  Plane,
  PlaneLanding,
  PlaneTakeoff,
  Star,
  UserRound,
  Users,
} from "lucide-react";
import {
  addDays,
  format,
  formatDate,
  formatDuration,
  parseISO,
} from "date-fns";
import { enUS } from "date-fns/locale";
import { formatCustomDuration, timeFormatter } from "@/lib/formatter";
import MapCard from "./map";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import ItemCard from "./ui/item-icon-card";
import { DatePicker } from "./ui/date-picker";
import { Combobox } from "./ui/combobox";
import { DateRange } from "react-day-picker";

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
    latitude: number;
    longitude: number;
  };
  offers: {
    price: {
      currency: string;
      total: string;
    };
    checkInDate: string;
    checkOutDate: string;
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

interface APIResult {
  address: string;
  description: string;
  gps_coordinates: {
    latitude: number;
    longitude: number;
  };
  hours?: string;
  lsig: string;
  place_id: string;
  place_id_search: string;
  position: number;
  rating: number;
  reviews: number;
  reviews_original: string;
  thumbnail: string;
  title: string;
  type: string;
  service_options?: {
    dine_in?: boolean;
    no_delivery?: boolean;
    takeout?: boolean;
  };
}

interface Results {
  local_results: APIResult[];
}

const TripForm = () => {
  const [flightResults, setFlightsResults] = useState<FlightResults[]>([]);
  const [coffeesResults, setCoffeesResults] = useState<Results>();
  const [restaurantsResults, setRestaurantsResults] = useState<Results>();
  const [returnFlightsResults, setReturnFlightsResults] = useState<
    FlightResults[]
  >([]);
  const [hotelResults, setHotelResults] = useState<HotelsResults[]>([]);
  const [hotelIdResult, setHotelIdResult] = useState<HotelIdResult[]>([]);
  const [activitiesResults, setActivitiesResults] = useState<
    ActivitiesResults[]
  >([]);
  const [cityName, setCityName] = useState("");
  const [originLocation, setOriginLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [keyword, setKeyword] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [searchResults, setSearchResults] = useState<SearchResults[]>([]);
  const [locationName, setLocationName] = useState("");
  const [hotelId, setHotelId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>(
    undefined
  );

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
    const formattedFromDate = selectedDate?.from
      ? format(selectedDate.from, "yyyy-MM-dd")
      : "";
    const formattedToDate = selectedDate?.to
      ? format(selectedDate.to, "yyyy-MM-dd")
      : "";
    try {
      const response = await searchFlights(
        originLocation,
        destinationLocation,
        "ECONOMY",
        formattedFromDate
      );
      console.log("FLIGHTS :", response?.data.data);
      setFlightsResults(response?.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchReturnFlights = async () => {
    const formattedFromDate = selectedDate?.from
      ? format(selectedDate.from, "yyyy-MM-dd")
      : "";
    const formattedToDate = selectedDate?.to
      ? format(selectedDate.to, "yyyy-MM-dd")
      : "";
    try {
      const response = await searchFlights(
        destinationLocation,
        originLocation,
        "ECONOMY",
        formattedToDate
      );
      console.log("FLIGHTS :", response?.data.data);
      setReturnFlightsResults(response?.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchHotelsById = async () => {
    try {
      const response = await searchHotelById(hotelId);
      console.log("HOTEL :", response.data[0]);
      setHotelIdResult(response.data);
      setLongitude(response.data[0].hotel.longitude);
      setLatitude(response.data[0].hotel.latitude);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchActivities = async () => {
    try {
      const response = await searchActivities(latitude, longitude, 5);
      console.log("ACTIVITES: ", response?.data.data);
      setActivitiesResults(response?.data?.data);
      console.log(typeof activitiesResults);
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

  const handleSearchCity = async () => {
    try {
      const response = await searchCityByKeyword(keyword);
      console.log(response.data[0].name);
      setCityName(response.data[0].name);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchRestaurant = async () => {
    try {
      const response = await searchRestaurant("Tokyo");
      console.log(JSON.parse(response));
      setRestaurantsResults(JSON.parse(response));
    } catch (error) {
      console.log(error);
    }
  };

  console.log(restaurantsResults);

  const handleSearchCoffee = async () => {
    try {
      const response = await searchCoffee("Tokyo");
      setCoffeesResults(JSON.parse(response));
    } catch (error) {
      console.log(error);
    }
  };

  const onClick = () => {
    handleSearchFlights();
    handleSearchReturnFlights();
    handleSearchHotels();
    handleSearchCity();
    if (latitude && longitude) {
      handleSearchActivities();
    }
    if (keyword && cityName) {
      handleSearchCoffee();
      handleSearchRestaurant();
    }
  };

  useEffect(() => {
    if (hotelId) {
      handleSearchHotelsById();
    }
    if (latitude && longitude) {
      handleSearchActivities();
    }
    if (cityName) {
      handleSearchCoffee();
    }
  }, [hotelId, latitude, longitude, cityName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationName(e.target.value);
    getCoordinates(e.target.value);
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-x-4">
        <Combobox
          value={originLocation}
          onChange={setOriginLocation}
          onSelect={(value: string) => {
            setOriginLocation(value);
          }}
          onInputChange={handleChange}
        />
        <Combobox
          value={destinationLocation}
          onChange={setDestinationLocation}
          onSelect={(value: string, label: string) => {
            setDestinationLocation(value);
            setKeyword(label);
          }}
          onInputChange={handleChange}
        />
        <DatePicker
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />{" "}
        <Button onClick={onClick}>Search</Button>
      </div>
      {searchResults &&
        searchResults.map((result, index) => (
          <p className="" key={index}>
            Result for :{result.address_components[0].short_name}
          </p>
        ))}
      {flightResults && flightResults.length > 0 && (
        <div className="mt-8 space-y-4 mb-4">
          <h1 className="text-3xl text-black font-bold">Flight</h1>
          <Separator />
          <div className="bg-black rounded-xl shadow-lg shadow-black/25 p-4 mt-2 border border-gray-400">
            <div className="flex justify-center w-full">
              {flightResults[0].itineraries.map((itinerary, i) => (
                <>
                  <div key={i} className="w-full">
                    {itinerary.segments.map((segment, j) => (
                      <>
                        <div key={j} className="w-full space-y-6">
                          <div className="flex items-center justify-center space-x-8">
                            <PlaneTakeoff className="text-white" />
                            <h1 className="text-3xl text-white font-semibold tracking-wide">
                              {segment.departure.iataCode}
                            </h1>
                            <MoveRight className="text-white" />
                            <h1 className="text-3xl text-white font-semibold tracking-wide">
                              {segment.arrival.iataCode}
                            </h1>
                            <PlaneLanding className="text-white" />
                          </div>
                          <Separator className="w-full" />
                          <div className="flex-col items-center justify-between px-8 py-2">
                            <div className="flex flex-col items-start my-2 space-y-2">
                              <h2 className="text-white text-lg font-semibold">
                                Departure
                              </h2>
                              <div className="flex items-center justify-between w-full">
                                <ItemCard
                                  title={"Airport"}
                                  text={segment.departure.iataCode}
                                  icon={
                                    <Plane className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                                  }
                                />
                                <ItemCard
                                  title={"Day"}
                                  text={
                                    timeFormatter(segment.departure.at)
                                      .formattedDate
                                  }
                                  icon={
                                    <Calendar className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                                  }
                                />

                                <ItemCard
                                  title={"Time"}
                                  text={
                                    timeFormatter(segment.departure.at)
                                      .formattedTime
                                  }
                                  icon={
                                    <Clock className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                                  }
                                />
                              </div>
                            </div>
                            <Separator />
                            <div className="flex flex-col items-start my-2 space-y-2">
                              <h2 className="text-white text-lg font-semibold">
                                Arrival
                              </h2>
                              <div className="flex items-center justify-between w-full">
                                <ItemCard
                                  title={"Airport"}
                                  text={segment.arrival.iataCode}
                                  icon={
                                    <Plane className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                                  }
                                />
                                <ItemCard
                                  title={"Day"}
                                  text={
                                    timeFormatter(segment.arrival.at)
                                      .formattedDate
                                  }
                                  icon={
                                    <Calendar className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                                  }
                                />

                                <ItemCard
                                  title={"Time"}
                                  text={
                                    timeFormatter(segment.arrival.at)
                                      .formattedTime
                                  }
                                  icon={
                                    <Clock className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between px-8 mt-3">
                          <div className="flex items-center space-x-2">
                            <Badge className="space-x-2">
                              <Clock className="w-4 h-4" />
                              <p className="text-md">
                                {formatCustomDuration(itinerary.duration)}
                              </p>
                            </Badge>
                            <Badge className="space-x-2">
                              <Luggage className="w-4 h-4" />
                              <p className="text-md">Included</p>
                            </Badge>
                          </div>
                          <div className="flex items-end text-center">
                            <h1 className="text-gray-200 text-2xl text-center font-semibold">
                              {flightResults[0].price.currency}{" "}
                              {flightResults[0].price.total} / person
                            </h1>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      )}
      {returnFlightsResults && returnFlightsResults.length > 0 && (
        <div className="mt-8 space-y-4 mb-4">
          <h1 className="text-3xl text-black font-bold">Flight</h1>
          <Separator />
          <div className="bg-black rounded-xl shadow-lg shadow-black/25 p-4 mt-2 border border-gray-400">
            <div className="flex justify-center w-full">
              {returnFlightsResults[0].itineraries.map((itinerary, i) => (
                <>
                  <div key={i} className="w-full">
                    {itinerary.segments.map((segment, j) => (
                      <>
                        <div key={j} className="w-full space-y-6">
                          <div className="flex items-center justify-center space-x-8">
                            <PlaneTakeoff className="text-white" />
                            <h1 className="text-3xl text-white font-semibold tracking-wide">
                              {segment.departure.iataCode}
                            </h1>
                            <MoveRight className="text-white" />
                            <h1 className="text-3xl text-white font-semibold tracking-wide">
                              {segment.arrival.iataCode}
                            </h1>
                            <PlaneLanding className="text-white" />
                          </div>
                          <Separator className="w-full" />
                          <div className="flex-col items-center justify-between px-8 py-2">
                            <div className="flex flex-col items-start my-2 space-y-2">
                              <h2 className="text-white text-lg font-semibold">
                                Departure
                              </h2>
                              <div className="flex items-center justify-between w-full">
                                <ItemCard
                                  title={"Airport"}
                                  text={segment.departure.iataCode}
                                  icon={
                                    <Plane className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                                  }
                                />
                                <ItemCard
                                  title={"Day"}
                                  text={
                                    timeFormatter(segment.departure.at)
                                      .formattedDate
                                  }
                                  icon={
                                    <Calendar className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                                  }
                                />

                                <ItemCard
                                  title={"Time"}
                                  text={
                                    timeFormatter(segment.departure.at)
                                      .formattedTime
                                  }
                                  icon={
                                    <Clock className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                                  }
                                />
                              </div>
                            </div>
                            <Separator />
                            <div className="flex flex-col items-start my-2 space-y-2">
                              <h2 className="text-white text-lg font-semibold">
                                Arrival
                              </h2>
                              <div className="flex items-center justify-between w-full">
                                <ItemCard
                                  title={"Airport"}
                                  text={segment.arrival.iataCode}
                                  icon={
                                    <Plane className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                                  }
                                />
                                <ItemCard
                                  title={"Day"}
                                  text={
                                    timeFormatter(segment.arrival.at)
                                      .formattedDate
                                  }
                                  icon={
                                    <Calendar className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                                  }
                                />

                                <ItemCard
                                  title={"Time"}
                                  text={
                                    timeFormatter(segment.arrival.at)
                                      .formattedTime
                                  }
                                  icon={
                                    <Clock className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between px-8 mt-3">
                          <div className="flex items-center space-x-2">
                            <Badge className="space-x-2">
                              <Clock className="w-4 h-4" />
                              <p className="text-md">
                                {formatCustomDuration(itinerary.duration)}
                              </p>
                            </Badge>
                            <Badge className="space-x-2">
                              <Luggage className="w-4 h-4" />
                              <p className="text-md">Included</p>
                            </Badge>
                          </div>
                          <div className="flex items-end text-center">
                            <h1 className="text-gray-200 text-2xl text-center font-semibold">
                              {flightResults[0]?.price.currency}{" "}
                              {flightResults[0]?.price.total} / person
                            </h1>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      )}

      {hotelResults && hotelResults.length > 0 && (
        <div className="mt-8 space-y-4 mb-4">
          <h1 className="text-3xl text-black font-bold">Hotel</h1>
          <Separator />

          <div className="bg-black rounded-xl shadow-lg shadow-black/25 p-4 mt-2 border border-gray-400">
            {hotelIdResult && hotelIdResult.length > 0 && (
              <div className="flex-col items-center justify-center w-full">
                <h1 className="flex justify-center text-2xl text-white my-2">
                  {hotelIdResult[0].hotel.name}
                </h1>
                <Separator />
                <div className="flex-col items-start m-4 py-4">
                  <h1 className="text-white text-lg font-semibold">Details</h1>
                  <div className="flex items-center justify-between my-4">
                    <ItemCard
                      title={"From"}
                      text={
                        timeFormatter(hotelIdResult[0].offers[0].checkInDate)
                          .formattedDate
                      }
                      icon={
                        <Calendar className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                      }
                    />

                    <ItemCard
                      title={"To"}
                      text={
                        timeFormatter(hotelIdResult[0].offers[0].checkInDate)
                          .formattedDate
                      }
                      icon={
                        <Calendar className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                      }
                    />
                    <ItemCard
                      title={"Person"}
                      text={"1"}
                      icon={
                        <UserRound className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                      }
                    />
                  </div>
                  <Separator />
                  <h1 className="text-white text-lg font-semibold">Room</h1>
                  <div className="flex items-center justify-between my-4">
                    <ItemCard
                      title={"Type Bed"}
                      text={"Queen size"}
                      icon={
                        <Bed className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                      }
                    />

                    <ItemCard
                      title={"Breakfast"}
                      text={"Yes"}
                      icon={
                        <Croissant className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                      }
                    />
                    <ItemCard
                      title={"Check-In"}
                      text={"From 11h to 23h"}
                      icon={
                        <Clock className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                      }
                    />
                  </div>
                </div>
                <div className="flex-col justify-center items-center w-full px-4 rounded-full">
                  <h1 className="text-white text-lg font-semibold">
                    Emplacement
                  </h1>
                  <div className="relative w-full h-48 rounded-full">
                    <MapCard
                      latitude={hotelIdResult[0].hotel.latitude}
                      longitude={hotelIdResult[0].hotel.longitude}
                      name={hotelIdResult[0].hotel.name}
                      address={""}
                    />
                  </div>
                </div>

                <div className="flex justify-end px-4 my-4 ">
                  {hotelIdResult[0]?.offers[0]?.price ? (
                    <p className="place-self-end text-2xl text-white">
                      {hotelIdResult[0].offers[0].price.currency}{" "}
                      {hotelIdResult[0].offers[0].price.total} / night
                    </p>
                  ) : (
                    "Price not available"
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {activitiesResults && activitiesResults.length > 0 && (
        <div className="mt-8 space-y-4 mb-4">
          <h1 className="text-3xl text-black font-bold">Activity</h1>
          <Separator />
          <div className="bg-black rounded-xl shadow-lg shadow-black/25 p-4 mt-2 border border-gray-400">
            <div className="flex-col items-center justify-center px-4 my-2">
              <h1 className="text-xl text-white font-semibold py-1">
                {activitiesResults[2].name}
              </h1>
              <Separator />
              <h2 className="text-white text-xl font-semibold my-4 place-self-start">
                Details
              </h2>
              <div className="flex items-center justify-between">
                <ItemCard
                  title={"Duration"}
                  text={activitiesResults[2].minimumDuration}
                  icon={
                    <Clock className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                  }
                />
                <ItemCard
                  title={"In Group"}
                  text={"No"}
                  icon={
                    <Users className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                  }
                />
                <ItemCard
                  title={"Time"}
                  text={`From 15h to 17h30`}
                  icon={
                    <Clock className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                  }
                />
              </div>
              <div className="">
                <h2 className="text-white text-xl font-semibold my-4 place-self-start">
                  Emplacement
                </h2>
                <div className="relative w-full h-48 rounded-full">
                  <MapCard
                    latitude={activitiesResults[0].geoCode.latitude}
                    longitude={activitiesResults[0].geoCode.longitude}
                    name={""}
                    address={""}
                  />
                </div>
              </div>
              <div className="flex justify-end my-2">
                <h1 className="text-2xl text-white">
                  {activitiesResults[0].price.currencyCode &&
                  activitiesResults[0].price.amount
                    ? `${activitiesResults[0].price.currencyCode} ${activitiesResults[0].price.amount} / person`
                    : "FREE"}
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
      {coffeesResults &&
        coffeesResults.local_results &&
        coffeesResults.local_results.length > 0 && (
          <div className="mt-8 space-y-4 mb-4">
            <h1 className="text-3xl text-black font-bold">Coffee</h1>
            <Separator />
            <div className="bg-black rounded-xl shadow-lg shadow-black/25 p-4 mt-2 border border-gray-400">
              <h1 className="text-white text-xl flex justify-center my-2">
                {coffeesResults.local_results[0].title}
              </h1>
              <Separator />
              <h2 className="text-white text-xl my-2">Details</h2>
              <div className="flex justify-between items-center">
                <ItemCard
                  title={"Open hours"}
                  text={coffeesResults.local_results[0].hours || ""}
                  icon={
                    <Clock className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                  }
                />
                <ItemCard
                  title={"Rating"}
                  text={`${coffeesResults.local_results[0].rating || 0}/5`}
                  icon={
                    <Star className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                  }
                />
                <ItemCard
                  title={"Reviews"}
                  text={coffeesResults.local_results[0].reviews || ""}
                  icon={
                    <PersonStandingIcon className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                  }
                />
              </div>
              <h2 className="text-white text-xl my-2">Emplacement</h2>
              <div className="relative w-full h-48 rounded-full">
                <MapCard
                  latitude={
                    coffeesResults?.local_results[0]?.gps_coordinates.latitude
                  }
                  longitude={
                    coffeesResults?.local_results[0]?.gps_coordinates.longitude
                  }
                  name={""}
                  address={""}
                />
              </div>
              <div className="flex justify-end my-2">
                <h3 className="text-white text-xl z-50 py-2">
                  {coffeesResults.local_results[0]?.address}
                </h3>
              </div>
            </div>
          </div>
        )}
      {coffeesResults &&
        coffeesResults.local_results &&
        coffeesResults.local_results.length > 0 && (
          <div className="mt-8 space-y-4 mb-4">
            <div className="bg-black rounded-xl shadow-lg shadow-black/25 p-4 mt-2 border border-gray-400">
              <h1 className="text-white text-xl flex justify-center my-2">
                {coffeesResults.local_results[1].title}
              </h1>
              <Separator />
              <h2 className="text-white text-xl my-2">Details</h2>
              <div className="flex justify-between items-center">
                <ItemCard
                  title={"Open hours"}
                  text={coffeesResults.local_results[1].hours || ""}
                  icon={
                    <Clock className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                  }
                />
                <ItemCard
                  title={"Rating"}
                  text={`${coffeesResults.local_results[1].rating || 0}/5`}
                  icon={
                    <Star className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                  }
                />
                <ItemCard
                  title={"Reviews"}
                  text={coffeesResults.local_results[1].reviews || ""}
                  icon={
                    <PersonStandingIcon className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                  }
                />
              </div>
              <h2 className="text-white text-xl my-2">Emplacement</h2>
              <div className="relative w-full h-48 rounded-full">
                <MapCard
                  latitude={
                    coffeesResults?.local_results[1]?.gps_coordinates.latitude
                  }
                  longitude={
                    coffeesResults?.local_results[1]?.gps_coordinates.longitude
                  }
                  name={""}
                  address={""}
                />
              </div>
              <div className="flex justify-end my-2">
                <h3 className="text-white text-xl z-50 py-2">
                  {coffeesResults.local_results[0]?.address}
                </h3>
              </div>
            </div>
          </div>
        )}

      {restaurantsResults &&
        restaurantsResults.local_results &&
        restaurantsResults.local_results.length > 0 && (
          <div className="mt-8 space-y-4 mb-4">
            <h1 className="text-3xl text-black font-bold">Restaurant</h1>
            <Separator />
            <div className="bg-black rounded-xl shadow-lg shadow-black/25 p-4 mt-2 border border-gray-400">
              <h1 className="text-white text-xl flex justify-center my-2">
                {restaurantsResults.local_results[0].title}
              </h1>
              <Separator />
              <h2 className="text-white text-xl my-2">Details</h2>
              <div className="flex justify-between items-center">
                <ItemCard
                  title={"Open hours"}
                  text={restaurantsResults.local_results[0].hours || ""}
                  icon={
                    <Clock className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                  }
                />
                <ItemCard
                  title={"Rating"}
                  text={`${restaurantsResults.local_results[0].rating || 0}/5`}
                  icon={
                    <Star className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                  }
                />
                <ItemCard
                  title={"Reviews"}
                  text={restaurantsResults.local_results[0].reviews || ""}
                  icon={
                    <PersonStandingIcon className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                  }
                />
              </div>
              <h2 className="text-white text-xl my-2">Emplacement</h2>
              <div className="relative w-full h-48 rounded-full">
                <MapCard
                  latitude={
                    restaurantsResults?.local_results[0]?.gps_coordinates
                      .latitude
                  }
                  longitude={
                    restaurantsResults?.local_results[0]?.gps_coordinates
                      .longitude
                  }
                  name={""}
                  address={""}
                />
              </div>
              <div className="flex justify-end my-2">
                <h3 className="text-white text-xl z-50 py-2">
                  {restaurantsResults.local_results[0]?.address}
                </h3>
              </div>
            </div>
          </div>
        )}
      {restaurantsResults &&
        restaurantsResults.local_results &&
        restaurantsResults.local_results.length > 0 && (
          <div className="mt-8 space-y-4 mb-4">
            <div className="bg-black rounded-xl shadow-lg shadow-black/25 p-4 mt-2 border border-gray-400">
              <h1 className="text-white text-xl flex justify-center my-2">
                {restaurantsResults.local_results[1].title}
              </h1>
              <Separator />
              <h2 className="text-white text-xl my-2">Details</h2>
              <div className="flex justify-between items-center">
                <ItemCard
                  title={"Open hours"}
                  text={restaurantsResults.local_results[1].hours || ""}
                  icon={
                    <Clock className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                  }
                />
                <ItemCard
                  title={"Rating"}
                  text={`${restaurantsResults.local_results[1].rating || 0}/5`}
                  icon={
                    <Star className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                  }
                />
                <ItemCard
                  title={"Reviews"}
                  text={restaurantsResults.local_results[1].reviews || ""}
                  icon={
                    <PersonStandingIcon className="text-white w-9 h-9 p-2 rounded-md bg-primary" />
                  }
                />
              </div>
              <h2 className="text-white text-xl my-2">Emplacement</h2>
              <div className="relative w-full h-48 rounded-full">
                <MapCard
                  latitude={
                    restaurantsResults?.local_results[1]?.gps_coordinates
                      .latitude
                  }
                  longitude={
                    restaurantsResults?.local_results[1]?.gps_coordinates
                      .longitude
                  }
                  name={""}
                  address={""}
                />
              </div>
              <div className="flex justify-end my-2">
                <h3 className="text-white text-xl z-50 py-2">
                  {restaurantsResults.local_results[1]?.address}
                </h3>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default TripForm;
