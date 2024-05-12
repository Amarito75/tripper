import axios from "axios";
import moment from "moment";
const token = process.env.NEXT_PUBLIC_AMADEUS_KEY;

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
          date: "2024-11-01",
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
            cabin: cabin,
            coverage: "AT_LEAST_ONE_SEGMENT",
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
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function searchHotels(cityCode: string) {
  try {
    const response = await axios.get(
      `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}&radius=1&radiusUnit=KM&hotelSource=ALL`,
      {
        headers: {
          // "X-HTTP-Method-Override": "GET",
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function searchHotelById(hotelId: string | null) {
  try {
    const response = await axios.get(
      `https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=${hotelId}&adults=1&roomQuantity=1&paymentPolicy=NONE&bestRateOnly=true`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
