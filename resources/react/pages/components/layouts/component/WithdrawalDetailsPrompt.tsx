import React from "react";
import { notification } from "antd";
import { WithdrawContext } from "../../../../contexts/withdraw/WithdrawContext";
import { APP_ROUTES } from "../../../app.routes";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { isEmptyObject } from "../../../../utils/helpers";

const WithdrawalDetailsPrompt = () => {
  const { withdrawalSettings } = React.useContext(WithdrawContext);

  const navigate = useNavigate();

  const CustomMessage = ({ content, onClick }) => {
    const handleClick = () => {
      onClick();
    };

    return (
      <Button
        onClick={handleClick}
        sx={styles.button}
        startIcon={<PriorityHighIcon />}
      >
        {content}
      </Button>
    );
  };

  const handleOnClick = () => {
    navigate(APP_ROUTES.WITHDRAW_SETTINGS);
  };

  const isNull = (payload: string) =>
    payload == "" || payload == null || payload == undefined;

  React.useEffect(() => {
    if (
      !isEmptyObject(withdrawalSettings) &&
      isNull(withdrawalSettings.lightning_address) &&
      isNull(withdrawalSettings.onchain_address)
    ) {
      notification.open({
        message: (
          <CustomMessage
            content="Please fill in your withdrawal settings"
            onClick={handleOnClick}
          />
        ),
        duration: 0,
        placement: "top",
        closeIcon: null,
        className: "withdraw-prompt",
        key: 1,
      });
    } else {
      notification.destroy();
    }
  }, [withdrawalSettings]);

  return <></>;
};

const styles = {
  button: {
    textTransform: "none",
    background: "#fdf6b2",
    color: "#9f580a",
    padding: "10px",
    fontSize: "15px",
    fontWeight: "400",
    lineHeight: "17px",
    "&:hover": {
      background: "#fdf6b2",
      color: "#c77922",
    },
  },
};

export default WithdrawalDetailsPrompt;
