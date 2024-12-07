"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  NativeSelect,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import {
  SwapHoriz,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import styles from "./Form.module.css";
import Select from "../../../utils/commons/Select/Select";
import AutoSuggestInput from "../../../utils/commons/AutoSuggest/AutoSuggestInput";
import DateInput from "../../../utils/commons/DateInput/DateInput";
import JSONData from "../../../json/api-data.json";
import { useFormContext } from "../../../contextAPI/FormContext/FormContext";
import { findFlights } from "../../../utils/utilityFunctions/FindFlights/FindFlights";

export default function FlightSearch() {
  const { state, dispatch } = useFormContext();
  const [tripType, setTripType] = useState("oneway");
  const [passengers, setPassengers] = useState("2");
  const [classType, setClassType] = useState("economy");
  const [fromCity, setFromCity] = useState({});
  const [toCity, setToCity] = useState({});
  const [fromList, setFromList] = useState([]);
  const [toList, setToList] = useState([]);
  const [date, setDate] = useState(new Date());

  const tripTypeOptions = [
    { value: "oneway", label: "Oneway" },
    { value: "roundtrip", label: "Round Trip" },
    { value: "multicity", label: "Multi City" },
  ];

  const passengerOptions = [
    { value: "1", label: "1 Passenger" },
    { value: "2", label: "2 Passengers" },
    { value: "3", label: "3 Passengers" },
    { value: "4", label: "4 Passengers" },
  ];

  const classTypeOptions = [
    { value: "economy", label: "Economy" },
    { value: "business", label: "Business" },
    { value: "first", label: "First Class" },
  ];

  const handleTripTypeChange = (event) => {
    setTripType(event.target.value);
  };

  const handlePassengersChange = (event) => {
    setPassengers(event.target.value);
  };

  const handleClassChange = (event) => {
    setClassType(event.target.value);
  };

  const handleSwap = useCallback(() => {
    setFromCity(toCity.label.trim() ? { ...toCity } : {});
    setToCity(fromCity.label.trim() ? { ...fromCity } : {});
  }, [toCity, fromCity]);

  const getFlightDepartureList = useMemo(() => {
    let jsonList = JSONData.data.flights[1].results.apdet;

    return Object.keys(jsonList).map((metaKey) => ({
      code: metaKey,
      city: jsonList[metaKey]["c"],
      name: jsonList[metaKey]["n"],
      country: jsonList[metaKey]["cname"],
    }));
  }, []);

  const getFromFlightDepartureList = useCallback(
    (value) => {
      return getFlightDepartureList.filter((data) =>
        toCity.value ? data.code !== value : getFlightDepartureList
      );
    },
    [toCity, fromList]
  );

  const getToFlightDepartureList = useCallback(() => {
    return getFlightDepartureList.filter((data) =>
      fromCity.value ? data.code !== fromCity.value : true
    );
  }, [fromCity, fromList, toList]);

  const flightRecords = async () => {
    const date = "2021-10-17"; // Specific date --- as dates in the JSON are older

    const res = await findFlights(fromCity.value, toCity.value, date);
    if (res) {
      handleDispatch(res);
    }
  };

  const handleDispatch = (res) => {
    dispatch({
      type: "SET_FLIGHT_RESPONSE",
      response: res,
    });
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.topSelects}>
        <Select
          displayLabel={false}
          label="Trip Type"
          value={tripType}
          onChange={handleTripTypeChange}
          inputProps={{
            name: "trip-type",
            id: "trip-type",
          }}
          options={tripTypeOptions}
        />

        <Select
          displayLabel={false}
          label="Passengers"
          value={passengers}
          onChange={handlePassengersChange}
          inputProps={{
            name: "passengers",
            id: "passengers",
          }}
          options={passengerOptions}
        />

        <Select
          displayLabel={false}
          label="Class"
          value={classType}
          onChange={handleClassChange}
          inputProps={{
            name: "class-type",
            id: "class-type",
          }}
          options={classTypeOptions}
        />
      </Box>

      <Box className={styles.searchBox}>
        <Box className={styles.cityInputs}>
          <div>
            <AutoSuggestInput
              label="From"
              value={fromCity}
              variant="outlined"
              onChange={setFromCity}
              options={getFromFlightDepartureList(toCity.value)}
              className={styles.cityInput}
            />
          </div>
          <div>
            <IconButton className={styles.swapButton} onClick={handleSwap}>
              <SwapHoriz />
            </IconButton>
          </div>
          <div>
            <AutoSuggestInput
              label="To"
              value={toCity}
              onChange={setToCity}
              options={getToFlightDepartureList()}
              variant="outlined"
              className={styles.cityInput}
            />
          </div>
        </Box>

        <Box className={styles.navigationButtons}>
          <DateInput label="Dpart" value={date} onChange={setDate} />
        </Box>

        <Button
          variant="contained"
          color="primary"
          className={styles.searchButton}
          onClick={flightRecords}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
}
