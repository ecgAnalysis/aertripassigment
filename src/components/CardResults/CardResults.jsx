import { useEffect, useState } from "react";
import { useFormContext } from "../../contextAPI/FormContext/FormContext";
import FlightCard from "../cards/FlightCard/FlightCard";
import { FlightFilters } from "./SortFilters";

function CardResults() {
  const { state } = useFormContext();
  const [filteredFlights, setFilteredFlights] = useState(
    state?.flightDetails || []
  );

  useEffect(() => {
    setFilteredFlights(state?.flightDetails || []);
  }, [state?.flightDetails]);

  return (
    <div className="space-y-4">
      <div className="container">
        {filteredFlights.length > 0 ? (
          <>
            {/*  Sort and filter slider  */}
            <FlightFilters
              flights={state?.flightDetails || []}
              onFilterChange={setFilteredFlights}
            />

            {/*  Cards */}
            {filteredFlights.map((data, key) => (
              <FlightCard key={key} data={data} />
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default CardResults;
