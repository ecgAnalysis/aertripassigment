import { useState, useEffect } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Slider,
  Typography,
  Box,
  Paper,
  styled,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import styles from "./cardResult.module.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const PrettoSlider = styled(Slider)({
  color: "rgb(2, 202, 155)",
});

export function FlightFilters({ flights, onFilterChange }) {
  const [sortBy, setSortBy] = useState("fare");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (flights.length > 0) {
      const prices = flights.map((flight) => flight.fare); // Use fare instead of price
      setMinPrice(Math.min(...prices));
      setMaxPrice(Math.max(...prices));
      setPriceRange([Math.min(...prices), Math.max(...prices)]);
    }
  }, [flights]);

  const handleSortChange = (value) => {
    setSortBy(value);
    setAnchorEl(null);
    let sortedFlights = [...flights];

    switch (value) {
      case "fare":
        sortedFlights.sort((a, b) => a.fare - b.fare); // Sort by fare
        break;
      case "flightDuration":
        sortedFlights.sort((a, b) => a.flightDuration - b.flightDuration); // Sort by flight duration
        break;
      case "departureTime":
        sortedFlights.sort(
          (a, b) =>
            new Date(a.departureTime).getTime() -
            new Date(b.departureTime).getTime()
        ); // Sort by departure time
        break;
      case "arrivalTime":
        sortedFlights.sort(
          (a, b) =>
            new Date(a.arrivalTime).getTime() -
            new Date(b.arrivalTime).getTime()
        ); // Sort by arrival time
        break;
      default:
        break;
    }

    // Apply fare filter
    sortedFlights = sortedFlights.filter(
      (flight) => flight.fare >= priceRange[0] && flight.fare <= priceRange[1] // Filter based on fare
    );

    onFilterChange(sortedFlights);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    let filteredFlights = [...flights];

    if (sortBy !== "fare") {
      handleSortChange(sortBy);
    }

    // Apply fare filter
    filteredFlights = filteredFlights.filter(
      (flight) => flight.fare >= newValue[0] && flight.fare <= newValue[1] // Filter based on fare
    );

    setTimeout(() => onFilterChange(filteredFlights), 1000);
  };

  const handleReset = () => {
    setSortBy("fare");
    setPriceRange([minPrice, maxPrice]);
    onFilterChange(flights);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={`  ${styles.sort_container}`}>
      <div className={styles.flex}>
        <div className={styles.icon_sort}>
          <SortIcon />
        </div>
        <div className={styles.card_sort}>
          <Button
            variant="outlined"
            onClick={handleClick}
            endIcon={
              Boolean(anchorEl) ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
            }
          >
            Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
          </Button>
        </div>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleSortChange("fare")}>
            Fare: Low to High
          </MenuItem>
          <MenuItem onClick={() => handleSortChange("flightDuration")}>
            Flight Duration: Shortest First
          </MenuItem>
          <MenuItem onClick={() => handleSortChange("departureTime")}>
            Departure Time: Earliest First
          </MenuItem>
          <MenuItem onClick={() => handleSortChange("arrivalTime")}>
            Arrival Time: Earliest First
          </MenuItem>
        </Menu>
        <div className={styles.card_sort_reset}>
          <Button variant="text" onClick={handleReset}>
            Clear Filters
          </Button>
        </div>
      </div>
      <div className={styles.sort_fare}>
        <Box sx={{ width: "100%" }}>
          <Typography id="fare-range-slider" gutterBottom>
            Fare Range
          </Typography>
          <PrettoSlider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={minPrice}
            max={maxPrice}
            step={10}
            aria-labelledby="fare-range-slider"
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2">₹{priceRange[0]}</Typography>
            <Typography variant="body2">₹{priceRange[1]}</Typography>
          </Box>
        </Box>
      </div>
    </div>
  );
}
