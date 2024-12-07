import React, { memo, useCallback, useEffect, useState } from "react";
import {
  Box,
  FormControl,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./AutoSuggestInput.module.css";

function AutoSuggestInput({
  className,
  label,
  value,
  onChange,
  options = [],
  renderSuggestRow,
  suggestions = [],
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [input, setInput] = useState(value?.label || "");
  const [list, setList] = useState(options);
  const handleSearchInput = (e) => {
    setInput(e.target.value);
  };

  const filterAirports = useCallback(() => {
    let modifiedList = options.filter((data) =>
      Object.keys(data).some((k) =>
        input.trim()
          ? data[k].toLowerCase().includes(input.trim().toLowerCase())
          : k
      )
    );
    setList(modifiedList);
  }, [input]);

  useEffect(() => {
    filterAirports();
    if (!input.trim()) onChange({});
  }, [input]);

  useEffect(() => {
    if (value?.label) {
      setInput(value?.label);
    }
  }, [value]);

  const handleAirportSelection = (airportMeta) => {
    onChange(airportMeta);
  };

  return (
    <FormControl>
      <div className={styles.custom_input_area}>
        <TextField
          label={label}
          value={input}
          onChange={handleSearchInput}
          className="autoSuggestContainer"
          sx={{
            width: "250px !important",
            ["& .MuiOutlinedInput-notchedOutline"]: {
              border: "none",
              borderBottom: "1px solid gray",
              borderRadius: "0px",
            },
            ["input.Mui-focused"]: {
              borderBottom: "1px solid rgb(0 208 149) !important",
            },
            [".MuiFormLabel-root.Mui-focused"]: {
              color: "rgb(0 208 149) !important",
            },
            ["& .MuiOutlinedInput-notchedOutline:focus"]: {
              borderBottom: "1px solid rgb(0 208 149)",
            },
          }}
          variant="outlined"
          //   onChange={onChange}
          className={className}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 300)}
        />
        {value?.value && (
          <div className={styles.airport_code}>
            <span> {value?.value} </span>
          </div>
        )}
      </div>

      {isFocused && (
        <div className={styles.suggestions_list}>
          <List className={styles.list}>
            {list.map((airport, key) => (
              <ListItem
                key={`${airport.code} ${key}`}
                disablePadding
                onClick={() =>
                  handleAirportSelection({
                    label: airport.city,
                    value: airport.code,
                  })
                }
              >
                <ListItemButton className={styles.airportItem}>
                  <Box className={styles.airportCode}>
                    <Typography variant="body1" fontWeight={500}>
                      {airport.code}
                    </Typography>
                  </Box>
                  <ListItemText
                    primary={
                      <Typography variant="body1">
                        {airport.city}, {airport.country}
                      </Typography>
                    }
                    secondary={airport.name}
                    className={styles.airportDetails}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </FormControl>
  );
}

export default memo(AutoSuggestInput);
