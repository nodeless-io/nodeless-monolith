import React, { useContext } from "react";
import {
  Box,
  Typography,
  Divider,
  Container,
  Tooltip,
  IconButton,
} from "@mui/material";
import { PublicPaywallContext } from "../../../contexts/paywall/PublicPaywallContext";
import { formatter, copyToClipboard } from "../../../utils/Utils";
import PublicPaywallLoader from "./PublicPaywallLoader";
import PublicPaywallRequestExpired from "./PublicPaywallRequestExpired";
import PublicPaywallRequestFailure from "./PublicPaywallRequestFailure";
import PublicPaywallRequestSuccess from "./PublicPaywallRequestSuccess";
import PublicPaywallRequestPending from "./PublicPaywallRequestPending";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { LinkButton } from "../../components/custom-components/Button";

const PublicPaywallContent = () => {
  const { publicPaywall, loading, status, publicPaywallRequest } = useContext(
    PublicPaywallContext
  );

  if (loading) {
    return <PublicPaywallLoader />;
  }

  return (
    <Container maxWidth="lg" sx={styles.container}>
      <Box>
        <Typography color="secondary" sx={styles.header}>
          {publicPaywall?.name}
        </Typography>

        <Divider sx={styles.divider} />

        <Box>
          <Typography sx={styles.label}>Paywall ID</Typography>
          <Typography sx={styles.value}>{publicPaywall?.uuid}</Typography>
        </Box>

        <Box sx={styles.amount}>
          <Typography sx={styles.amountLabel}>Amount</Typography>
          <Typography sx={styles.amountValue} color="secondary">
            {formatter(publicPaywall?.price)} sats
          </Typography>
        </Box>

        <Divider sx={styles.divider} />
      </Box>

      <Box>
        {status && status == "paid" && (
          <PublicPaywallRequestSuccess paywallRequest={publicPaywallRequest} />
        )}
        {status && status == "cancelled" && <PublicPaywallRequestFailure />}
        {status && status == "expired" && <PublicPaywallRequestExpired />}
        {status &&
          (status == "pending_confirmation" || status == "pending") && (
            <PublicPaywallRequestPending />
          )}

        {status == "new" && (
          <Box sx={styles.content}>
            <div>
              <a href={publicPaywallRequest?.lightning_link}>
                <img
                  src={publicPaywallRequest?.lightning_qr_code}
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
              link={publicPaywallRequest?.lightning_link}
            />

            <Box sx={styles.inputBox}>
              <Typography sx={styles.amountBox}>
                {
                  publicPaywallRequest?.paywall_request?.lightning_invoice
                    ?.payment_request
                }
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
                      copyToClipboard(
                        publicPaywallRequest?.paywall_request?.lightning_invoice
                          ?.payment_request,
                        "Invoice copied to clipboard"
                      )
                    }
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

const styles = {
  container: {
    height: "100vh",
    padding: {
      xs: "30px 15px 60px 15px",
      md: "60px 30px",
    },
    textAlign: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: "20px",
    fontWeight: "600",
  },
  divider: {
    margin: "10px 0",
  },
  label: {
    color: "#9CA3AF",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "5px",
  },
  value: {
    color: "#4B5563",
    fontSize: "16px",
    fontWeight: "600",
  },
  amount: {
    marginTop: "15px",
  },
  amountLabel: {
    color: "#9CA3AF",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "5px",
  },
  amountValue: {
    fontSize: "22px",
    fontWeight: "600",
  },
  tabsDivider: {
    marginTop: "-16px",
  },
  tabContainer: {
    width: "100%",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  activeTab: {
    color: "#111928",
    fontWeight: "600",
    borderBottom: "1px solid #111928",
    textTransform: "none",
    fontSize: "15px",
    background: "white",
    padding: "5px 25px",
    "&:hover": {
      border: "1px solid white",
      background: "white",
      borderBottom: "2px solid #111928",
    },
  },
  openWithWalletButton: {
    width: "180px",
    margin: "10px 0 30px 0",
    height: "50px",
    fontSize: "13px",
  },
  inactiveTab: {
    color: "#4B5563",
    fontSize: "15px",
    textTransform: "none",
    background: "white",
    padding: "5px 25px",
    "&:hover": {
      border: "1px solid white",
      background: "white",
      borderBottom: "2px solid #111928",
    },
  },
  inputBox: {
    display: "flex",
    justifyContent: "space-between",
    border: "1px solid #9CA3AF",
    borderRadius: "6px",
    alignItems: "center",
    margin: "0 auto",
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
    paddingBottom: "10px",
  },
};

export default PublicPaywallContent;
