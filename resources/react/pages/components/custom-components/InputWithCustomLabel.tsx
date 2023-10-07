import React from "react";
import { alpha, styled } from "@mui/material/styles";
import { InputBase, InputLabel, FormControl, Box } from "@mui/material";
import { CustomInputWithLabelInterface } from "../../../types/custom-components.interface";

export const InputWithCustomLabel = ({
  label,
  value,
  handleChange,
  type = "text",
  autoFocus,
  name,
  disabled,
  required,
  labelColor = "secondary",
  height = "15px",
  width = "300px",
  color = "#FF5A1F",
  borderColor = "#3F83F8",
  focusedBorderColor = "#3F83F8",
}: CustomInputWithLabelInterface) => {
  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
      marginBottom: "10px",
      fontWeight: "600",
      fontSize: "16px",
      color: "#FF5A1F",
    },
    "& .MuiInputBase-input": {
      borderRadius: "6px",
      position: "relative",
      backgroundColor: "transparent",
      border: `1px solid ${borderColor}`,
      fontSize: "14px",
      width,
      padding: "10px 15px",
      marginTop: "10px",
      color: "#4B5563",
      height,
      "&:focus": {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: focusedBorderColor,
      },
    },
  }));

  const styles = {
    formItem: {
      marginBottom: "10px",
    },
    textFieldLabel: {
      marginBottom: "10px",
      fontWeight: "600",
      fontSize: "16px",
      color,
    },
  };

  return (
    <Box sx={styles.formItem}>
      <FormControl variant="standard">
        <InputLabel shrink color={labelColor} sx={styles.textFieldLabel}>
          {label}
        </InputLabel>

        <BootstrapInput
          id={name}
          name={name}
          autoFocus={autoFocus}
          required={required}
          fullWidth
          size="small"
          type={type}
          onChange={handleChange}
          value={value}
          disabled={disabled}
        />
      </FormControl>
    </Box>
  );
};
