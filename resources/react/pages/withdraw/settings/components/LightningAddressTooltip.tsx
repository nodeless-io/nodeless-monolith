import React from "react";
import { Box, Dialog, DialogContent, Typography, Popover } from "@mui/material";

const LightningAddressTooltip = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <span onClick={handleOpen} style={{ cursor: "pointer" }}>
        {children}
      </span>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
          <DialogContent>
            <Box>
              <Typography sx={styles.label}>
                A lightning address looks like this example@nodeless.io you can
                get one at{" "}
                <a href="https://www.walletofsatoshi.com/" target="_blank">
                  WoS
                </a>
                ,{" "}
                <a href="https://getalby.com/" target="_blank">
                  Alby
                </a>{" "}
                or read more about how to use it{" "}{" "}
                <a
                  href="https://blog.nodeless.io/how-to-get-a-bitcoin-lightning-address/"
                  target="_blank"
                >
                  here
                </a>
              </Typography>
            </Box>
          </DialogContent>
        </Dialog>
      </Popover>
    </>
  );
};

const styles = {
  label: {
    color: "#9CA3AF",
    marginBottom: "15px",
    fontSize: {
      xs: "13px",
      md: "14px",
    },
    fontWeight: "600",
    a: {
      color: "#FF5A1F",
      margin: "0 2px",
    },
  },
};

export default LightningAddressTooltip;
