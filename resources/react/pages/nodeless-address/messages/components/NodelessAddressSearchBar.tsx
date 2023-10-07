import React from "react";
import {
  Box,
  Typography,
  InputBase,
  IconButton,
  MenuItem,
  Stack,Menu,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import  { MenuProps } from "@mui/material/Menu";
import CustomCheckbox from "../../../components/custom-components/Checkbox";
import { NodelessAddressMessageContext } from "../../../../contexts/nodeless-address/NodelessAddressMessageContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid #D1D5DB",
  backgroundColor: "#FFFFFF",
  "&:hover": {
    backgroundColor: "#FFFFFF",
  },
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: "15px 75px 15px 75px",
    transition: theme.transitions.create("width"),
    borderRadius: "8px",
    width: "100%",
    color: "#374151",
    fontWeight: "600",
    fontSize: "16px",
    [theme.breakpoints.down("md")]: {
      fontSize: "13px",
    },
  },
}));

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const FILTER_OPTIONS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Read",
    value: "read",
  },
  {
    label: "Unread",
    value: "unread",
  },
  {
    label: "Starred",
    value: "starred",
  },
];

const SearchBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [activeOption, setActiveOption] = React.useState(
    FILTER_OPTIONS[0].value
  );
  const { messages, isLoading } = React.useContext(
    NodelessAddressMessageContext
  );

  if (isLoading || messages.length < 1) {
    return;
  }

  return (
    <Box sx={styles.container}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon
            //@ts-ignore
            color="gray"
            fontSize="medium"
          />
        </SearchIconWrapper>

        <StyledInputBase
          placeholder="Search for user or email address"
          inputProps={{ "aria-label": "search" }}
        />

        <IconButton sx={styles.endAdornment} size="small" onClick={handleClick}>
          <TuneIcon
            //@ts-ignore
            color="gray"
          />
        </IconButton>

        <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {FILTER_OPTIONS.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => {
                setActiveOption(option.value);
                handleClose();
              }}
            >
              <Stack direction="row" sx={{ alignItems: "center" }}>
                <CustomCheckbox checked={activeOption === option.value} />
                <Typography
                  sx={
                    activeOption === option.value
                      ? styles.activeMenuText
                      : styles.inactiveMenuText
                  }
                >
                  {option.label}
                </Typography>
              </Stack>
            </MenuItem>
          ))}
        </StyledMenu>
      </Search>
    </Box>
  );
};

const styles = {
  container: {
    background: "#F9FAFB",
    padding: "25px",
    width: "100%",
    borderRadius: "5px",
  },
  endAdornment: {
    position: "absolute",
    top: 10,
    right: 14,
  },
  activeMenuText: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#FF5A1F",
    marginLeft: "10px",
  },
  inactiveMenuText: {
    fontSize: "14px",
    fontWeight: "600",
    marginLeft: "10px",
    color: "#6B7280",
  },
};

export default SearchBar;
