import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import { memo } from "react";
import styles from "./Select.module.css";
const nativeSelectStyles = {
  fontFamily: "inherit",
  [".MuiFormControl-root"]: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
};

function Select({
  label = "",
  value,
  onChange,
  inputProps,
  renderOption,
  options = [],
  displayLabel = true,
}) {
  return (
    <FormControl fullWidth sx={nativeSelectStyles}>
      {displayLabel && (
        <InputLabel
          variant="standard"
          htmlFor={label}
          sx={{
            [".MuiInputLabel-root"]: {
              fontSize: "15px !important",
              color: "#0006 !important",
              fontFamily: "inherit !important",
              fontWeight: "600 !important",
            },
            [".MuiInputLabel-root.Mui-focused"]: {
              color: "color(display-p3 0 0.59216 0.44314)",
            },
          }}
        >
          {label}
        </InputLabel>
      )}
      <NativeSelect
        className={styles.native_select}
        sx={{
          borderBottom: "none", // Ensure border-bottom is removed here too
          "&:focus": {
            borderBottom: "none", // Remove focus border if it appears
          },
          ".MuiNativeSelect-root:before": {
            border: "none",
          },
        }}
        value={value}
        onChange={onChange}
        inputProps={inputProps}
      >
        {options?.map(({ value, label }, key) => (
          <option value={value} key={key}>
            {label}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}

export default memo(Select);
