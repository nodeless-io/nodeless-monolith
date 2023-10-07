import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Logo from "../components/logo/Logo";
import { APP_ROUTES } from "../app.routes";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
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
          Terms and Conditions (Terms of Use)
        </Typography>

        <Typography sx={styles.text} variant="body2">
          Welcome to our service! By using our platform, you agree to the
          following terms and conditions which include our cookie policy:
          <br />
          If you do not accept these terms and conditions or you do not meet or
          comply with their provisions, you may not use this website or its
          applications.
        </Typography>

        <Typography sx={styles.subHeaderText} variant="h2">
          Overview
        </Typography>

        <Typography sx={styles.text} variant="body2">
          Your use of this website is expressly conditioned upon your accepting
          and agreeing to these terms of use.
          <br />
          For users who are not registered with this website, your use of the
          website will be deemed to be acceptance of the terms of use.
          <br />
          If these terms of use are not completely acceptable to you, you must
          immediately terminate your use of this website.
        </Typography>

        <Typography sx={styles.subHeaderText} variant="h2">
          Changes to Terms
        </Typography>

        <Typography sx={styles.text} variant="body2">
          <a
            href="https://nodeless.io/"
            style={{ color: "#FF7847", fontWeight: "600" }}
          >
            Nodeless.io.
          </a>{" "}
          may, at any time, for any reason and without notice, make changes to
          <br />
          (i) this website, including its look, feel, format, and content, as
          well as
          <br /> (ii) the products and/or services as described in this website.
          <br />
          Any modifications will take effect when posted to the website.
          Therefore, each time you access the website, you need to review the
          Terms of Use upon which access and use of this website is conditioned.
          By your continuing use of the website after changes are posted, you
          will be deemed to have accepted such changes.
        </Typography>

        <Typography sx={styles.subHeaderText} variant="h2">
          Scope of Use and User E-Mail/Chat
        </Typography>

        <Typography sx={styles.text} variant="body2">
          You may not store, modify, reproduce, transmit, reverse engineer or
          distribute a significant portion of the Content on this website, or
          the design or layout of the website or individual sections of it, in
          any form or media. The systematic retrieval of data from the website
          is also prohibited.
          <br />
          E-mail submissions over the Internet may not be secure and are subject
          to the risk of interception by third parties. Please consider this
          fact before e-mailing any information. Also, please consult our
          <a
            href="https://nodeless.io/app/privacy-policy"
            style={{ color: "#FF7847", fontWeight: "600", marginLeft: "3px" }}
          >
            Privacy Policy.
            <br />
          </a>{" "}
          You agree not to submit or transmit any e-mails or materials through
          the website that: <br />
          (i) are defamatory, threatening, obscene or harassing, <br />
          (ii) contain a virus, worm, Trojan horse or any other harmful
          component, <br />
          (iii) incorporate copyrighted or other proprietary material of any
          third party without that party’s permission or <br />
          (iv) otherwise violate any applicable laws.
          <br />
          <br />
          <a
            href="https://nodeless.io/"
            style={{ color: "#FF7847", fontWeight: "600" }}
          >
            Nodeless.io.
          </a>{" "}
          shall not be subject to any obligations of confidentiality regarding
          any information or materials that you submit online except as
          specified in these Terms of Use, or as set forth in any additional
          terms and conditions relating to specific products or services, or as
          otherwise specifically agreed or required by law.
          <br />
          The commercial use, reproduction, transmission or distribution of any
          information, software or other material available through the website
          without the prior written consent of Nodeless.io is strictly
          prohibited.
        </Typography>

        <Typography sx={styles.subHeaderText} variant="h2">
          No Unlawful or Prohibited Use
        </Typography>

        <Typography sx={styles.text} variant="body2">
          As a condition of your use of the website, you warrant to{" "}
          <a
            href="https://nodeless.io/"
            style={{ color: "#FF7847", fontWeight: "600" }}
          >
            Nodeless.io.
          </a>{" "}
          that you will not use the website for any purpose that is unlawful or
          prohibited by these terms, conditions, and notices. You may not use
          the website in any manner that could damage, disable, overburden, or
          impair the Site or interfere with any other party’s use and enjoyment
          of the website. You may not obtain or attempt to obtain any materials
          or information through any means not intentionally made available or
          provided for through the Site.
        </Typography>

        <Typography sx={styles.subHeaderText} variant="h2">
          Account Suspension
        </Typography>

        <Typography sx={styles.text} variant="body2">
          We reserve the right to suspend or terminate your account at any time
          if we suspect that you have violated these terms and conditions, or if
          we believe that your use of our service may be harmful to other users
          or to our platform.
        </Typography>

        <Typography sx={styles.subHeaderText} variant="h2">
          No Warranties
        </Typography>

        <Typography sx={styles.text} variant="body2">
          The website, and any content, are provided to you on an “as is,” “as
          available” basis without warranty of any kind whether express,
          statutory or implied, including but not limited to any implied
          warranties of merchantability, fitness for a particular purpose, quiet
          enjoyment, systems integration, accuracy, and non-infringement, all of
          which nodeless.io expressly disclaims.
          <br />
          <a
            href="https://nodeless.io/"
            style={{ color: "#FF7847", fontWeight: "600" }}
          >
            Nodeless.io.
          </a>{" "}
          does not endorse and makes no warranty as to the accuracy,
          completeness, currency, or reliability of the content, and nodeless.io
          will not be liable or otherwise responsible for any failure or delay
          in updating the website or any content. We have no duty to update the
          content of the website.
          <br />
          <a
            href="https://nodeless.io/"
            style={{ color: "#FF7847", fontWeight: "600" }}
          >
            Nodeless.io.
          </a>{" "}
          makes no representations or warranties that use of the content will be
          uninterrupted or error-free. You are responsible for any results or
          other consequences of accessing the website and using the content, and
          for taking all necessary precautions to ensure that any content you
          may access, download or otherwise obtain is free of viruses or any
          other harmful components. This warranty disclaimer may be different in
          connection with specific products and services offered by{" "}
          <a
            href="https://nodeless.io/"
            style={{ color: "#FF7847", fontWeight: "600" }}
          >
            Nodeless.io.
          </a>{" "}
        </Typography>

        <Typography sx={styles.subHeaderText} variant="h2">
          User Submissions And Communications; Public Areas
        </Typography>

        <Typography sx={styles.text} variant="body2">
          You acknowledge that you own, solely responsible or otherwise control
          all of the rights to the content that you post; that the content is
          accurate; that use of the content you supply does not violate these
          Terms of Use and will not cause injury to any person or entity; and
          that you will indemnify{" "}
          <a
            href="https://nodeless.io/"
            style={{ color: "#FF7847", fontWeight: "600" }}
          >
            Nodeless.io.
          </a>{" "}
          or its affiliates for all claims resulting from content you supply.
          <br />
          If you make any submission to an area of the website accessed or
          accessible by the public (“Public Area”) or if you submit any business
          information, idea, concept or invention to Nodeless.io by email, you
          automatically represent and warrant that the owner of such content or
          intellectual property has expressly granted Nodeless.io a
          royalty-free, perpetual, irrevocable, world-wide nonexclusive license
          to use, reproduce, create derivative works from, modify, publish,
          edit, translate, distribute, perform, and display the communication or
          content in any media or medium, or any form, format, or forum now
          known or hereafter developed. Nodeless.io may sublicense its rights
          through multiple tiers of sublicenses. If you wish to keep any
          business information, ideas, concepts or inventions private or
          proprietary, you must not submit them to the Public Areas or to
          Nodeless.io by email. We try to answer every email in a timely manner,
          but are not always able to do so
          <br />
          Some of the forums (individual bulletin boards and posts on the social
          network, for instance) on the website are not moderated or reviewed.
          Accordingly, Users will be held directly and solely responsible for
          the content of messages that are posted. While not moderating the
          forums, the Site reviewer will periodically perform an administrative
          review for the purpose of deleting messages that are old, have
          received few responses, are off topic or irrelevant, serve as
          advertisements or seem otherwise inappropriate. Nodeless.io has full
          discretion to delete messages. Users are encouraged to read the
          specific forum rules displayed in each discussion forum first before
          participating in that forum.
          <br />
          By using our service, you agree to abide by these terms and
          conditions. If you do not agree with any of these terms, please do not
          use our service. We reserve the right to update or modify these terms
          and conditions at any time, and it is your responsibility to review
          them periodically.
        </Typography>

        <Typography sx={styles.subHeaderText} variant="h2">
          Limitation of Liability
        </Typography>

        <Typography sx={styles.text} variant="body2">
          Your use of the content is at your own risk. Nodeless.io specifically
          disclaims any liability, whether based in contract, tort, negligence,
          strict liability or otherwise, for any direct, indirect, incidental,
          punitive, consequential, or special damages arising out of or in any
          way connected with access to, use of or reliance on the content (even
          if Nodeless.io Has been advised of the possibility of such damages) or
          that arise in connection with mistakes or omissions in, or delays in
          transmission of, information to or from the user, any failure of
          performance, error, omission, interruption, deletion, defect, delay in
          operation or transmission or delivery, computer virus, communication
          line failure, theft or destruction or unauthorised access to,
          alteration of, or use of records, programs or files, interruptions in
          telecommunications connections to the website or viruses, whether
          caused in whole or in part by negligence, acts of god,
          telecommunications failure, theft or destruction of, or unauthorised
          access to the website or the content. This limitation of liability may
          be different in connection with specific products and services offered
          by Nodeless.io. Some jurisdictions do not allow the limitation of
          liability, so this limitation may not apply to you
        </Typography>

        <Typography sx={styles.subHeaderText} variant="h2">
          Cookie Policy
        </Typography>

        <Typography sx={styles.text} variant="body2">
          This Cookie Policy explains what cookies are and how we use them. You
          should read this policy to understand what cookies are, how we use
          them, the types of cookies we use i.e, the information we collect
          using cookies and how that information is used and how to control the
          cookie preferences. For further information on how we use, store and
          keep your personal data secure, see our{" "}
          <a
            href="https://nodeless.io/app/privacy-policy"
            style={{ color: "#FF7847", fontWeight: "600", marginLeft: "3px" }}
          >
            Privacy Policy.
          </a>{" "}
          <br />
          You can at any time change or withdraw your consent from the Cookie
          Declaration on our website.
          <br />
          Learn more about who we are, how you can contact us and how we process
          personal data in our{" "}
          <a
            href="https://nodeless.io/app/privacy-policy"
            style={{ color: "#FF7847", fontWeight: "600", marginLeft: "3px" }}
          >
            Privacy Policy.
            <br />
          </a>{" "}
          <br />
          Your consent applies to the following domains:{" "}
          <a
            href="https://nodeless.io/"
            style={{ color: "#FF7847", fontWeight: "600" }}
          >
            Nodeless.io.
          </a>{" "}
          <br />
          <br />
          <span style={{ fontWeight: "600" }}>What are cookies ?</span>
          <br />
          Cookies are small text files that are used to store small pieces of
          information. The cookies are stored on your device when the website is
          loaded on your browser. These cookies help us make the website
          function properly, make the website more secure, provide better user
          experience, and understand how the website performs and to analyze
          what works and where it needs improvement.
          <br />
          <br />
          <span style={{ fontWeight: "600" }}>How do we use cookies ?</span>
          <br />
          As most of the online services, our website uses cookies first-party
          and third-party cookies for a number of purposes. The first-party
          cookies are mostly necessary for the website to function the right
          way, and they do not collect any of your personally identifiable data.
          <br />
          The third-party cookies used on our websites are used mainly for
          understanding how the website performs, how you interact with our
          website, keeping our services secure, and all in all providing you
          with a better and improved user experience and help speed up your
          future interactions with our website.
          <br />
          <br />
          <span style={{ fontWeight: "600" }}>
            What types of cookies do we use ?
          </span>
          <br />
          <span style={{ fontWeight: "600" }}>Essential Only: </span>
          Some cookies are essential for you to be able to experience the full
          functionality of our site. They allow us to maintain user sessions and
          prevent any security threats. They do not collect or store any
          personal information. For example, these cookies allow you to log-in
          to your account and add products to your basket and checkout securely.
          We do not use any advertising and/or tracking cookies whatsoever.
          <br />
        </Typography>

        <Typography sx={styles.subHeaderText} variant="h2">
          Severability
        </Typography>

        <Typography sx={styles.text} variant="body2">
          In case any provision in this document shall be held invalid, illegal
          or unenforceable, the validity, legality and enforceability of the
          remaining provisions shall not in any way be affected or impaired.
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

export default TermsAndConditions;
