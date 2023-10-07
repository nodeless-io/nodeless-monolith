import React from "react";
import { Box, InputBase, InputLabel, FormControl } from "@mui/material";
import { CustomInputInterface } from "../../../../types/custom-components.interface";
import { alpha, styled } from "@mui/material/styles";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(2),
  },

  "& .MuiInputBase-input": {
    borderRadius: "6px",
    position: "relative",
    backgroundColor: "transparent",
    border: "1px solid #D1D5DB",
    fontSize: "14px",
    width: {
      xs: "100%",
      md: "300px",
    },
    padding: "10px 15px",
    fontWeight: "600",
    marginTop: "5px",
    marginBottom: "10px",
    color: "#4B5563",
    height: "15px",
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: "#D1D5DB",
    },
  },
}));

export const CustomInput = ({
  label,
  value,
  handleChange,
  type = "text",
  autoFocus,
  name,
  multiline,
  rows,
  placeholder,
  disabled,
  required,
  min,
  id,
  size = "small",
}: CustomInputInterface) => {
  return (
    <Box sx={styles.formItem}>
      <FormControl variant="standard" sx={{ width: "100%" }}>
        <InputLabel shrink sx={styles.textFieldLabel} color="secondary">
          {label} <span style={{ marginLeft: "5px", color: "red" }}>*</span>
        </InputLabel>

        <BootstrapInput
          id={id}
          value={value}
          onChange={handleChange}
          type={type}
          autoFocus={autoFocus}
          name={name}
          multiline={multiline}
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          sx={styles.textfield}
          fullWidth
          size={size}
          inputProps={{ min }}
        />
      </FormControl>
    </Box>
  );
};

export const CustomInputWithEndAdornment = ({
  label,
  value,
  handleChange,
  type = "text",
  autoFocus,
  name,
  multiline,
  rows,
  placeholder,
  disabled,
  required,
  min,
  id,
  size = "small",
  endAdornment,
}: CustomInputInterface) => {
  return (
    <Box sx={styles.formItem}>
      <FormControl
        variant="standard"
        sx={{ width: "100%", position: "relative" }}
      >
        <InputLabel shrink sx={styles.textFieldLabel} color="secondary">
          {label} <span style={{ marginLeft: "5px", color: "red" }}>*</span>
        </InputLabel>

        <BootstrapInput
          id={id}
          value={value}
          onChange={handleChange}
          type={type}
          autoFocus={autoFocus}
          name={name}
          multiline={multiline}
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          sx={styles.textfield}
          fullWidth
          size={size}
          inputProps={{ min, maxLength: "20" }}
        />
        <Box
          sx={{
            position: "absolute",
            right: 15,
            top: "40%",
            paddingLeft: "50px",
          }}
        >
          {endAdornment}
        </Box>
      </FormControl>
    </Box>
  );
};

const styles = {
  formItem: {
    marginBottom: "5px",
    width: "100%",
    position: "relative",
  },
  textFieldLabel: {
    color: "#6B7280",
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "5px",
  },
  textfield: {
    width: "100%",
    color: "#6B7280",
    fontSize: "14px",
    borderRadius: "8px",
  },
};
