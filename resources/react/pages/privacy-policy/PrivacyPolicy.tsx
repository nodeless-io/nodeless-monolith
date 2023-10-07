import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Logo from "../components/logo/Logo";
import { APP_ROUTES } from "../app.routes";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Logo />

        <Button
          sx={styles.signupButton}
          variant="outlined"
          component={Link}
          to={APP_ROUTES.SIGNUP}
        >
          Sign Up
        </Button>
      </Box>

      <Box sx={styles.content}>
        <Typography sx={styles.headerText} variant="h1">
          Privacy Policy
        </Typography>

        <Typography
          sx={{
            ...styles.subHeaderText,
            fontSize: "16px",
            fontStyle: "italic",
            color: "#6B7280",
          }}
          variant="h2"
        >
          Effective and Last Updated: March 7th, 2023
        </Typography>

        <Typography sx={styles.text} variant="body2">
          This Privacy Policy document contains types of information that is
          collected and recorded by us and how we use it.
          <br /> This website is owned and operated by{" "}
          <a
            href="https://nodeless.io/"
            style={{ color: "#FF7847", fontWeight: "600" }}
          >
            Nodeless.io
          </a>{" "}
          We are committed to protecting the privacy of our visitors while they
          interact with the content, products and services on this site (the
          “Site”). <br />
          This Privacy Policy applies to the Site only. It does not apply to
          other websites to which we link. Because we gather certain types of
          information about our users, we want you to understand what
          information we collect about you, how we collect it, how that
          information is used, and how you can control our disclosure of it.
          <br /> You agree that your use of the Site signifies your assent to
          this Privacy Policy. If you do not agree with this Privacy Policy,
          please do not use the Site.
        </Typography>

        <Typography sx={styles.subHeaderText} variant="h2">
          Voluntary Registration Information
        </Typography>

        <Typography sx={styles.text} variant="body2">
          In order to fully access this Site, you must first complete the
          registration process, during which we will collect your email address.
          By registering with us, you consent to the use and method of
          disclosure as described in this Privacy Policy.
        </Typography>

        <Typography sx={styles.subHeaderText} variant="h2">
          Cookies
        </Typography>

        <Typography sx={styles.text} variant="body2">
          Our site uses “cookies“. Cookies enable us to serve secure pages to
          our users without asking them to sign in repeatedly. Most browsers
          allow you to control cookies, including whether or not to accept them
          and how to remove them. If a user’s system is idle for a defined time,
          the cookie will expire, forcing the user to sign in again to continue
          their session. This prevents unauthorized access to the user’s
          information while they are away from their computer. You may set most
          browsers to notify you if you receive a cookie, or you may choose to
          block cookies with your browser.
        </Typography>

        <Typography sx={styles.subHeaderText} variant="h2">
          How We Use Your Information
        </Typography>

        <Typography sx={styles.text} variant="body2">
          <a
            href="https://nodeless.io/"
            style={{ color: "#FF7847", fontWeight: "600" }}
          >
            Nodeless.io
          </a>{" "}
          only uses your personal information for the original purposes it was
          given. Your personal information will not be sold or otherwise
          transferred to unaffiliated third parties without your approval at the
          time of collection.
          <span style={{ fontWeight: "600", marginLeft: "5px" }}>
            WE ARE NOT LIABLE OR RESPONSIBLE FOR THE PERSONALLY IDENTIFIABLE OR
            OTHER INFORMATION YOU CHOOSE TO SUBMIT IN FORUMS SUCH AS A BULLETIN
            BOARD, PUBLIC CHAT ROOM, 3rd PARTY STORE, DONATION PAGES, OR ANY
            OTHER PUBLICLY ACCESSIBLE AREA OF THE SITE.
          </span>
        </Typography>

        <Typography sx={styles.subHeaderText} variant="h2">
          How We Protect Your Information
        </Typography>

        <Typography sx={styles.text} variant="body2">
          We are committed to protecting the information we receive from you. We
          take appropriate security measures to protect your information against
          unauthorized access to or unauthorized alteration, disclosure or
          destruction of data. To prevent unauthorized access, maintain data
          accuracy, and ensure the correct use of information, we maintain
          appropriate physical, electronic, and managerial procedures to
          safeguard and secure the information and data stored on our system.
          While no computer system is completely secure, we believe the measures
          we have implemented reduce the likelihood of security problems to a
          level appropriate to the type of data involved.
        </Typography>

        <Typography sx={styles.subHeaderText} variant="h2">
          Accessing and Updating Your Personal Information and Preferences
        </Typography>

        <Typography sx={styles.text} variant="body2">
          We provide mechanisms for updating and correcting your personal
          information for many of our services. You may modify or remove any of
          your personal information at any time by logging into your account and
          accessing features such as edit and account.
        </Typography>

        <Typography sx={styles.subHeaderText} variant="h2">
          Age of Majority
        </Typography>

        <Typography sx={styles.text} variant="body2">
          We do not solicit any personal information from children. If you are
          not 18 or older, you are not authorized to use the Site.
        </Typography>

        <Typography sx={styles.subHeaderText} variant="h2">
          Disclaimer to Security
        </Typography>

        <Typography sx={styles.text} variant="body2">
          By consenting to the Terms and Conditions of the Site and hence the
          Privacy Policy, you consent that no data transmission over the
          Internet is completely secure. We cannot guarantee or warrant the
          security of any information you provide to us and you transmit such
          information to us at your own risk.
        </Typography>

        <Typography sx={styles.subHeaderText} variant="h2">
          Notification of Changes
        </Typography>

        <Typography sx={styles.text} variant="body2">
          Nodeless.io reserves the right to change this Privacy Policy from time
          to time at its sole discretion. If at some point in the future, there
          is a change to our Privacy Policy, unless we obtain your express
          consent, such change will only apply to information collected after
          the revised Privacy Policy took effect. Your continued use of the Site
          indicates your assent to the Privacy Policy as posted.
        </Typography>
      </Box>
    </Box>
  );
};

const styles = {
  text: {
    fontSize: {
      xs: "14px",
      md: "16px",
    },
    color: "#6B7280",
    lineHeight: "30px",
    letterSpacing: "0.03em",
    marginBottom: {
      xs: "10px",
      md: "20px",
    },
  },
  headerText: {
    color: "#FF7847",
    fontSize: {
      xs: "18px",
      md: "30px",
    },
    fontWeight: "600",
    marginBottom: {
      xs: "20px",
      md: "30px",
    },
  },
  subHeaderText: {
    color: "#FF7847",
    fontSize: {
      xs: "16px",
      md: "20px",
    },
    fontWeight: "600",
    marginBottom: {
      xs: "20px",
      md: "30px",
    },
    marginTop: "10px",
  },
  content: {
    marginTop: {
      md: "30px",
    },
    padding: {
      xs: "20px",
      md: "30px",
    },
    width: {
      xs: "100%",
      md: "85%",
    },
  },
  container: {
    background: "#fafafa",
    width: "100vw",
    height: "100%",
    padding: {
      xs: "20px",
      md: "30px",
    },
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  signupButton: {
    color: "#FF5A1F",
    textTransform: "none",
    fontSize: "16px",
    borderRadius: "7px",
    height: "40px",
    width: {
      xs: "100px",
      md: "120px",
    },
    backgroundColor: "transparent",
    border: "1px solid #FF5A1F",
    "&:hover": {
      background: "rgba(26, 86, 219, 0.04)",
      color: "#FF956B",
      border: "1px solid #FF956B",
    },
  },
};

export default PrivacyPolicy;
