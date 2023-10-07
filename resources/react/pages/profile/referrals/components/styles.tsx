import React from "react";
import { styled } from "@mui/material/styles";
import { StepConnector } from "@mui/material";
import { stepConnectorClasses } from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import AddUserIcon from "../../../assets/svg/referrals/add-user.svg";
import CheckIcon from "../../../assets/svg/referrals/check.svg";
import SendIcon from "../../../assets/svg/referrals/send.svg";

export const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`& .${stepConnectorClasses.line}`]: {
    backgroundColor: "#fff",
    borderRadius: 1,
    width: "50%",
    margin: "auto",
    marginTop: "20px",
    borderTop: "1px dotted #6B7280",
    borderSpacing: "25px",
  },
}));

export const ColorlibStepIconRoot = styled("div")(({ theme }) => ({
  backgroundColor: "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 65,
  height: 65,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid #D1D5DB",
  background: "white",
  [theme.breakpoints.down("sm")]: {
    width: 55,
    height: 55,
  },
  [theme.breakpoints.down("md")]: {
    width: 50,
    height: 50,
  },
}));

export const ColorlibStepIcon = (props: StepIconProps) => {
  const icons: { [index: string]: React.ReactElement } = {
    1: <img src={SendIcon} />,
    2: <img src={AddUserIcon} />,
    3: <img src={CheckIcon} />,
  };

  return (
    <ColorlibStepIconRoot>{icons[String(props.icon)]}</ColorlibStepIconRoot>
  );
};

export const steps = [
  {
    header: "Share Link",
    subHeader: "Send your referral links with friends",
  },
  {
    header: "Registration",
    subHeader: "Your friends register using your referral link",
  },
  {
    header: "Get Paid",
    subHeader: "Get 10% of their fees directly into your account",
  },
];
