import axios from "axios";

export async function searchActivities(
  latitude: number,
  longitude: number,
  radius: number
) {
  try {
    const response = await axios.get(
      `https://test.api.amadeus.com/v1/shopping/activities?latitude=${latitude}&longitude=${longitude}&radius=${radius}`,
      {
        headers: {
          Authorization: `Bearer XnHu9YuQryAFqjrN1vvd70Xlzg9e`,
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
  destinationLocationCode: string
) {
  const token = process.env.NEXT_PUBLIC_AMADEUS_KEY;
  const body = {
    currencyCode: "USD",
    originDestinations: [
      {
        id: "1",
        originLocationCode: originLocationCode,
        destinationLocationCode: destinationLocationCode,
        departureDateTimeRange: {
          date: "2024-11-11",
          time: "10:00:00",
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
            cabin: "BUSINESS",
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
