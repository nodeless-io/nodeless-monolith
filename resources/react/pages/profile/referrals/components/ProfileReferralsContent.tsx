import React from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Grid,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { CustomInputWithEndAdornment } from "../../../components/custom-components/Input";
import { copyToClipboard, shortenString } from "../../../../utils/Utils";
import { ColorlibConnector, ColorlibStepIcon, steps } from "./styles";
import { UserContext } from "../../../../contexts/user/UserContext";
import useScreenSize from "../../../../hooks/useScreenSize";

const ProfileReferralsContent = () => {
  const { referralData } = React.useContext(UserContext);

  const {
    isExtraLargeScreen,
    isLargeScreen,
    isMediumScreen,
    isSmallScreen,
  } = useScreenSize();

  const getReferralLink = () => {
    let link = referralData?.referral_link;
    switch (true) {
      case isSmallScreen &&
        isMediumScreen &&
        isLargeScreen &&
        isExtraLargeScreen:
        link = shortenString(referralData?.referral_link, 24);
        break;
      case !isSmallScreen &&
        !isMediumScreen &&
        isLargeScreen &&
        isExtraLargeScreen:
        link = shortenString(referralData?.referral_link, 27);
        break;
      case !isSmallScreen &&
        isMediumScreen &&
        isLargeScreen &&
        isExtraLargeScreen:
        link = shortenString(referralData?.referral_link, 30);
        break;
      default:
        link = referralData?.referral_link;
        break;
    }
    return link;
  };

  return (
    <Grid container spacing={2} sx={styles.container}>
      <Grid item xs={12} md={3}>
        <Box
          sx={{
            padding: {
              xs: "0 20px",
            },
            width: "100%",
          }}
        >
          <Typography sx={styles.header}>Referrals</Typography>
        </Box>
      </Grid>

      <Grid item xs={12} md={9}>
        <Box>
          <Box sx={styles.steps}>
            <Stepper
              alternativeLabel
              activeStep={2}
              connector={<ColorlibConnector />}
              variant="outlined"
            >
              {steps.map(({ header, subHeader }, index) => (
                <Step key={index}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    <Box>
                      <Typography sx={styles.headerText}>{header}</Typography>
                      <Typography sx={styles.subHeaderText}>
                        {subHeader}
                      </Typography>
                    </Box>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          <Box sx={styles.section}>
            <Box sx={styles.item}>
              <Typography sx={styles.label}>Total referral count</Typography>
              <Typography sx={styles.value}>
                {referralData?.total_referrals}
              </Typography>
            </Box>
            <Divider sx={styles.divider} />

            <Box sx={styles.item}>
              <Typography sx={styles.label}>Total SATS earned</Typography>
              <Typography sx={styles.value}>
                {referralData?.total_referral_fees} SATS
              </Typography>
            </Box>
            <Divider sx={styles.divider} />

            <Box sx={styles.item}>
              <Typography sx={styles.label}>Referral link</Typography>

              <Box sx={{ width: "100%" }}>
                <CustomInputWithEndAdornment
                  label=""
                  name="link"
                  value={getReferralLink()}
                  type="text"
                  endAdornment={
                    <span
                      style={{
                        color: "#F04200",
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                      role="button"
                      onClick={() =>
                        copyToClipboard(
                          referralData?.referral_link,
                          "Link copied to clip board"
                        )
                      }
                    >
                      Copy link
                    </span>
                  }
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

const styles = {
  steps: {
    marginBottom: "40px",
    textAlign: "center",
  },
  container: {
    padding: {
      xs: "0px",
      md: "10px 30px",
    },
  },
  header: {
    color: "#111928",
    fontSize: {
      xs: "14px",
      md: "16px",
    },
    fontWeight: "600",
    marginBottom: {
      xs: "20px",
      md: "10px",
    },
  },
  headerText: {
    color: "#374151",
    fontWeight: "600",
    fontSize: {
      xs: "14px",
      md: "15px",
    },
    marginBottom: "12px",
  },
  subHeaderText: {
    color: "#9CA3AF",
    fontWeight: "600",
    fontSize: {
      xs: "12px",
      md: "14px",
    },
  },
  section: {
    background: "#F7F7F7",
    padding: "30px",
    marginTop: {
      xs: "20px",
      md: "60px",
    },
    borderRadius: "10px",
  },
  item: {
    marginBottom: "20px",
    width: "100%",
  },
  label: {
    color: "#9CA3AF",
    fontSize: {
      xs: "13px",
      md: "14px",
    },
    fontWeight: "600",
    marginBottom: "20px",
  },
  value: {
    color: "#4B5563",
    fontSize: {
      xs: "15px",
      md: "16px",
    },
    fontWeight: "600",
  },
  divider: {
    marginBottom: "20px",
  },
  copyLink: {
    color: "#F04200",
    fontSize: "14px",
    "&:hover": {
      background: "transparent",
      color: "red",
    },
  },
};

export default ProfileReferralsContent;
