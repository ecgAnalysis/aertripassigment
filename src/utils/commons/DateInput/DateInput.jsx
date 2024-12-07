import { useState, useCallback, useEffect, memo } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { format, addDays, isBefore, startOfToday } from "date-fns";
import styles from "./DateInput.module.css";

function DateInput({
  label = "Dpart",
  value = "",
  onChange = () => {},
  className,
}) {
  const [selectedDate, setSelectedDate] = useState(value || new Date());
  const today = startOfToday();

  const handleDateChange = useCallback(
    (days) => {
      setSelectedDate((current) => {
        const newDate = addDays(current, days);
        // Prevent selecting dates before today
        return isBefore(newDate, today) ? current : newDate;
      });
    },
    [today]
  );

  useEffect(() => {
    onChange(selectedDate);
  }, [selectedDate]);

  return (
    <Box className={styles.container}>
      <Box className={styles.datePickerWrapper}>
        <div className={styles.date_container}>
          <TextField
            label={label}
            value={format(selectedDate, "d MMM")}
            sx={{
              width: "210px !important",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
                borderBottom: "1px solid gray",
                borderRadius: "0px",
              },
              "input.Mui-focused": {
                borderBottom: "1px solid rgb(0 208 149) !important",
              },
              ".MuiFormLabel-root.Mui-focused": {
                color: " rgb(0 208 149) !important",
              },
              "& .MuiOutlinedInput-notchedOutline:focus": {
                borderBottom: "1px solid rgb(0 208 149)",
              },
            }}
            variant="outlined"
            InputProps={{
              inputComponent: ({ inputRef, ...rest }) => (
                <>
                  {" "}
                  <input
                    className=""
                    ref={inputRef}
                    {...rest}
                    type="text"
                  />{" "}
                  {selectedDate && (
                    <span className={styles.display_day_name}>
                      {format(selectedDate, "EEE")}{" "}
                    </span>
                  )}
                </>
              ),
            }}
            //   onChange={onChange}
            className={className}
          />

          <Box className={styles.navigationButtons}>
            <IconButton
              size="small"
              onClick={() => handleDateChange(-1)}
              disabled={isBefore(addDays(selectedDate, -1), today)}
              className={styles.navButton}
            >
              <ChevronLeft fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => handleDateChange(1)}
              className={styles.navButton}
            >
              <ChevronRight fontSize="small" />
            </IconButton>
          </Box>
        </div>
      </Box>
    </Box>
  );
}

export default memo(DateInput);
