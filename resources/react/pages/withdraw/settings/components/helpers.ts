export const DefaultWithdrawalType = [
  {
    label: "Lightning Address",
    value: "lightning",
  },
  {
    label: "On chain",
    value: "onchain",
  },
];

export const formatData = (data) => {
  switch (data) {
    case "onchain":
      return "On chain";

    case "lightning":
      return "Lightning Address";

    case 0:
    case false:
    case "false":
      return "Off";

    case 1:
    case true:
    case "true":
      return "On";
    default:
      return null;
  }
};
