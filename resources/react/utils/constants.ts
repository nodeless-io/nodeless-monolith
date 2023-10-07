export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const emptyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const ActivityTypes = {
  Donation: "Donation",
  StoreInvoice: "StoreInvoice",
  GatedMessage: "GatedMessage",
  LightningAddressPayment: "LightningAddressPayment",
  PaywallRequest: "PaywallRequest",
  Withdrawal: "Withdrawal",
};

export const TRANSACTION_FILTER_TYPE_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Fees", value: "fees" },
  { label: "Transactions", value: "transactions" },
];

export const TRANSACTION_FILTER_STATUS_OPTIONS = [
  { label: "Paid", value: "paid" },
  { label: "Unpaid", value: "unpaid" },
];

export const TRANSACTION_FILTER_COLUMNS = [
  "ID",
  "category",
  "amount",
  "date",
  "type",
];

export const queryInitialState = {
    text: "",
    type: TRANSACTION_FILTER_TYPE_OPTIONS[0].value,
    startDate: null,
    endDate: null,
  };
