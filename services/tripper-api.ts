import axios from "axios";
import moment from "moment";

export async function searchActivities(
  latitude: number,
  longitude: number,
  radius: number
) {
  try {
    const token = process.env.NEXT_PUBLIC_AMADEUS_KEY;
    const response = await axios.get(
      `https://test.api.amadeus.com/v1/shopping/activities?latitude=${latitude}&longitude=${longitude}&radius=${radius}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function searchFlights(
  originLocationCode: string,
  destinationLocationCode: string,
  cabin: string
) {
  const token = process.env.NEXT_PUBLIC_AMADEUS_KEY;
  const currentTimestamp = Date.now();
  const formattedDate = moment(currentTimestamp).format("YYYY-MM-DD");
  const formattedTime = moment(currentTimestamp).format("HH:mm:ss");
  const body = {
    currencyCode: "USD",
    originDestinations: [
      {
        id: "1",
        originLocationCode: originLocationCode,
        destinationLocationCode: destinationLocationCode,
        departureDateTimeRange: {
          date: formattedDate,
          time: formattedTime,
        },
      },
    ],
    travelers: [
      {
        id: "1",
        travelerType: "ADULT",
      },
    ],
    sources: ["GDS"],
    searchCriteria: {
      maxFlightOffers: 2,
      flightFilters: {
        cabinRestrictions: [
          {
            cabin: cabin,
            coverage: "MOST_SEGMENTS",
            originDestinationIds: ["1"],
          },
        ],
      },
    },
  };
  try {
    const response = await axios.post(
      "https://test.api.amadeus.com/v2/shopping/flight-offers",
      body,
      {
        headers: {
          // "X-HTTP-Method-Override": "GET",
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
  }
}
