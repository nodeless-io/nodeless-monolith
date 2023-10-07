import React from "react";
import {
  Box,
  Typography,
  Divider,
  Menu,
  MenuItem,
  MenuList,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import { APP_ROUTES } from "../../../app.routes";
import { useFetch } from "../../../../hooks/useFetch";
import { UserContext } from "../../../../contexts/user/UserContext";
import { formatter } from "../../../../utils/Utils";
import { Link, useLocation } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import { useQueryClient } from "react-query";
import WithdrawalDetailsPrompt from "./WithdrawalDetailsPrompt";

const Sidebar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const queryClient = useQueryClient();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await useFetch("/logout", null, "POST");
    queryClient.clear();
    window.location.href = APP_ROUTES.LOGIN;
  };

  const { pathname } = useLocation();
  const path = pathname.split(APP_ROUTES.PROFILE);

  const isSimilarPath = path.length > 1 && path[1] != "";

  const isActive = pathname === APP_ROUTES.PROFILE || isSimilarPath;

  const { user } = React.useContext(UserContext);

  return (
    <Box sx={styles.container}>
      <WithdrawalDetailsPrompt />

      <Box sx={styles.balance}>
        <Typography sx={styles.balanceLabel}>Balance:</Typography>
        <Typography sx={styles.balanceValue}>
          {formatter(user?.available_balance)} SATS
        </Typography>
      </Box>

      <Divider orientation="vertical" flexItem sx={styles.divider} />

      <IconButton sx={{ borderRadius: "10px" }} onClick={handleClick}>
        <Box sx={styles.user}>
          <PersonIcon sx={styles.userIcon} fontSize="small" />
          <Typography sx={styles.userName}>{user?.email} </Typography>

          <KeyboardArrowDownIcon />
        </Box>
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuList sx={{ width: 220 }}>
          <MenuItem component={Link} to={APP_ROUTES.PROFILE_ACCOUNT}>
            <ListItemIcon>
              <SettingsIcon
                fontSize="small"
                sx={{ color: isActive ? "#FF7847" : "#6B7280" }}
              />
            </ListItemIcon>

            <ListItemText>
              <Typography
                sx={{
                  color: isActive ? "#FF7847" : "#6B7280",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Profile
              </Typography>
            </ListItemText>
          </MenuItem>

          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" sx={{ color: "#6B7280" }} />
            </ListItemIcon>
            <ListItemText>
              <Typography
                sx={{
                  color: "#6B7280",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Logout
              </Typography>
            </ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

const styles = {
  container: {
    width: "100%",
    borderBottom: "0.8px solid #D1D5DB",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: {
      xs: 0,
      sm: "10px",
      md: "15px 40px",
    },
    paddingBottom: "10px",
    display: {
      xs: "none",
      sm: "flex",
    },
  },
  divider: {
    marginRight: "10px",
  },
  balance: {
    display: "flex",
    alignItems: "center",
    marginRight: "15px",
  },
  balanceLabel: {
    color: "#374151",
    fontSize: "15px",
    fontWeight: "400",
    marginRight: "5px",
  },
  balanceValue: {
    color: "#374151",
    fontSize: "16px",
    fontWeight: "700",
  },
  user: {
    display: "flex",
    alignItems: "center",
  },
  userIcon: {
    background: "#E5E7EB",
    color: "#130F26",
    borderRadius: "50%",
    padding: "3px",
    height: "25px",
    width: "25px",
    marginRight: "10px",
  },
  userName: {
    fontSize: "15px",
    color: "#6B7280",
    lineHeight: "16px",
    fontWeight: "600",
  },
};

export default Sidebar;
