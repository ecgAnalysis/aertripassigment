import jsonData from "../../../json/api-data.json";

export function findFlights(fromCode, toCode, date) {
  // Ensure data is available

  return new Promise((resolve, rejected) => {
    try {
      if (!jsonData || !jsonData.data || !jsonData.data.flights) {
        return [];
      }

      // Extract flights
      const flights = jsonData.data.flights.flatMap((flight) =>
        flight.results.j.flatMap((journey) =>
          journey.leg.flatMap((leg) =>
            leg.flights.map((meta) => ({ ...meta, farepr: journey.farepr }))
          )
        )
      );
      // Filter flights
      const filteredFlights = flights.filter(
        (flight) =>
          flight.fr === fromCode && flight.to === toCode && flight.dd === date
      );

      resolve(
        filteredFlights.map((flight) => {
          return {
            from: flight.fr,
            to: flight.to,
            departureTime: flight.dt,
            arrivalTime: flight.at,
            airline: flight.al,
            flightDuration: flight.ft,
            fare: flight.farepr,
          };
        })
      );
    } catch (err) {
      rejected(err);
    }
  });
}
