// Would have written this in the utils/Utils folder, but I need Typescript's data validation for these functions
import dayjs from "dayjs";
import { months, months as labels } from "./constants";
import { APP_ROUTES } from "../pages/app.routes";

export const getPercentage = (
  numerator: number,
  denominator: number
): number | string => {
  if (numerator == 0 || denominator == 0) {
    return 0;
  }

  return ((numerator / denominator) * 100).toFixed(2);
};

export const getMonth = (payload: number): string => {
  const date = new Date();
  date.setMonth(payload - 1);

  return date.toLocaleString("en-US", { month: "short" });
};

export const formatCreateWebhookData = (data) => {
  const entries = Object.entries(data.events);

  const events = [];

  for (let i = 0; i < entries.length; i++) {
    const currentEntry = entries[i];

    if (currentEntry[1]) {
      events.push(currentEntry[0]);
    }
  }

  return {
    ...data,
    events,
  };
};

export const formatUpdateWebhooksEventState = (data: string[]) => {
  let events = {
    new: false,
    pending_confirmation: false,
    paid: false,
    expired: false,
    overpaid: false,
    underpaid: false,
  };

  for (let i = 0; i < data.length; i++) {
    const event = data[i];
    events[event] = true;
  }

  return events;
};

export const convertSATSToBTC = (sats: number | string | null) => {
  if (sats) return (0.00000001 * Number(sats)).toFixed(5);

  return 0;
};

export const extractString = (str, pattern) =>
  (str.match(pattern) || []).pop() || "";

export const reverseArray = (array: any[]) => {
  if (!array) return [];

  const reversedArray = [];
  for (let i = array.length - 1; i >= 0; i--) {
    const valueAtIndex = array[i];

    reversedArray.push(valueAtIndex);
  }

  return reversedArray;
};

export const formatTimestamp = (labels: string[], format?: "D" | "M" | "Y") => {
  if (!labels || !labels.length) {
    return formatTimestamp(months);
  }

  if (format) {
    switch (format) {
      case "D":
        return labels.map((label) => dayjs(label).format("hA"));
      case "M":
        return labels.map((label) => dayjs(label).format("MMM D"));
      case "Y":
      default:
        return labels.map((label) => dayjs(label).format("MMM"));
    }
  }

  return labels.map((label) => dayjs(label).format("MMM"));
};

const getDateFromMonthAndYear = (dateString) => {
  const [month, year]: any = dateString.split("-");

  const date = new Date(year, month - 1, 1);

  return date;
};

const hourToDate = (dateString) => {
  const date = new Date();
  date.setHours(parseInt(dateString), 0, 0, 0);

  return date;
};

export const formatCustomTimestamp = (
  labels: string[],
  format?: "D" | "M" | "Y"
) => {
  if (!labels || !labels.length) {
    return formatTimestamp(months);
  }

  if (format) {
    switch (format) {
      case "D":
        return labels.map((label) => dayjs(hourToDate(label)).format("hA"));
      case "M":
        return labels.map((label) =>
          dayjs(getDateFromMonthAndYear(label)).format("MMM D")
        );
      case "Y":
      default:
        return labels.map((label) =>
          dayjs(getDateFromMonthAndYear(label)).format("MMM")
        );
    }
  }

  return labels.map((label) =>
    dayjs(getDateFromMonthAndYear(label)).format("MMM")
  );
};

export const currentMonth = new Date().toLocaleString("default", {
  month: "long",
});

export const formatGraphData = (
  payload: any
): { labels: string[]; values: number[] } => {
  const values = [];

  if (
    !payload ||
    payload == "null" ||
    payload == "undefined" ||
    payload.length == 0
  ) {
    return { labels, values };
  }

  Object.entries(payload).forEach(([key, value]) => {
    const month = getMonth(Number(key.split("-")[0]));

    for (let i = 0; i < labels.length; i++) {
      const label = labels[i];

      if (month == label) {
        values.push(Number(value));
      } else {
        values.push(0);
      }
    }
  });

  return {
    labels,
    values,
  };
};

export const generateEmptyData = (length = 30) => Array(length).fill(0);

export const isEmailNodelessAddress = (email: string) => {
  if (
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) &&
    email.endsWith("@nodeless.io")
  )
    return true;

  return false;
};

export const toKebabCase = (sentence: string) => {
  sentence = sentence.toLowerCase();

  sentence = sentence.replace(/[^a-z0-9]/g, "-");

  sentence = sentence.replace(/^-+|-+$/g, "");

  sentence = sentence.replace(/\s+/g, "-");

  return sentence;
};

export const addSpaceBeforeUpperCase = (str) => str.replace(/([A-Z])/g, " $1");

export const sortArrayByDate = (array: any[]) => {
  return array.sort(
    (d1, d2) =>
      new Date(d1.created_at).getTime() - new Date(d2.created_at).getTime()
  );
};

export const getMainRoute = (url: string): string => url.split("/")[1];

export const checkIfRouteCanBeStored = (url: string): boolean => {
  const excludedRoutes = [
    APP_ROUTES.LOGIN,
    APP_ROUTES.SIGNUP,
    APP_ROUTES.FORGOT_PASSWORD,
    APP_ROUTES.HOME,
    APP_ROUTES.RESET_PASSWORD,
    APP_ROUTES.ERROR,
    APP_ROUTES.VULNERABILITY_POLICY,
    APP_ROUTES.TERMS_AND_CONDITIONS,
    APP_ROUTES.API_DOCS,
    APP_ROUTES.SUPPORT_PORTAL,
    APP_ROUTES.PRIVACY_POLICY,
  ];

  if (excludedRoutes.includes(url)) {
    return false;
  } else if (
    getMainRoute(url) == getMainRoute(APP_ROUTES.CHECKOUT_INVOICE_DETAILS) ||
    getMainRoute(url) == getMainRoute(APP_ROUTES.GATED_INBOX_REQUEST)
  ) {
    return false;
  }

  return true;
};

export const isEmptyObject = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

export const convertDataIntoBoolean = (data: any) => Boolean(data);

export const convertSatsToBTC = (sats) => (sats ? sats * 0.00000001 : 0);
