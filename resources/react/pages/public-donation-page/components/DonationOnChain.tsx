import React from "react";
import { Box, Typography, IconButton, Divider, Tooltip } from "@mui/material";
import { LinkButton } from "../../components/custom-components/Button";
import { copyToClipboard } from "../../../utils/Utils";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { PublicDonationPageContext } from "../../../contexts/donation-page/PublicDonationPageContext";

const DonationOnChain = () => {
  const { newDonation } = React.useContext(PublicDonationPageContext);

  return (
    <Box sx={styles.content}>
      <div>
        <a href={newDonation?.onchain_link}>
          <img
            src={newDonation?.onchain_qr_code}
            width={250}
            height={250}
            alt="Lightning QR Code"
            className="mx-auto"
          />
        </a>
      </div>

      <LinkButton
        styles={styles.openWithWalletButton}
        text="Open With Wallet"
        link={newDonation?.onchain_link}
      />

      <Box sx={styles.inputBox}>
        <Typography sx={styles.amountBox}>
          {newDonation?.donation?.bitcoin_address?.address}
        </Typography>

        <Typography
          sx={{ fontSize: "30px", marginTop: "-15px", marginLeft: "5px" }}
        >
          {" "}
          ...
        </Typography>

        <Box sx={{ display: "flex", marginLeft: "10px" }}>
          <Box>
            <Divider orientation="vertical" />
          </Box>

          <Tooltip title="Copy to clip board">
            <IconButton
              sx={styles.copy}
              onClick={() =>
                copyToClipboard(newDonation?.donation?.bitcoin_address?.address)
              }
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  inputBox: {
    display: "flex",
    justifyContent: "space-between",
    border: "1px solid #9CA3AF",
    borderRadius: "6px",
    alignItems: "center",
    margin: "30px auto",
    height: "45px",
    padding: "10px 20px",
    width: {
      xs: "100%",
      sm: "80%",
      md: "450px",
    },
    overflow: "hidden",
  },
  copy: {
    marginLeft: "10px",
  },
  amountBox: {
    color: "#454545",
    fontSize: "14px",
    fontWeight: "600",
    width: "80%",
    height: "100%",
    margin: "auto 0",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "1",
    lineClamp: 1,
  },
  content: {
    marginTop: "20px",
    textAlign: "center",
    justifyContent: "center",
    paddingBottom: "30px",
  },
  openWithWalletButton: {
    width: "180px",
    margin: "30px 0",
    height: "45px",
    fontSize: "13px",
  },
};

export default DonationOnChain;
