import dayjs from "dayjs";
import { message } from "antd";

export const hexToRGB = (h) => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }
  return `${+r},${+g},${+b}`;
};

export const formatValue = (value) =>
  Intl.NumberFormat("en-US", {
    style: "decimal",
    maximumSignificantDigits: 3,
    notation: "compact",
  }).format(value);

export const formatThousands = (value) =>
  Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 3,
    notation: "compact",
  }).format(value);

export const formatDate = (date, format = "MMM D, YYYY  hh:mm:ss A") =>
  dayjs(date).format(format);

export const formatter = (value) =>
  value
    ? new Intl.NumberFormat("en-US", {
        style: "decimal",
        maximumFractionDigits: 0,
        maximumSignificantDigits: 8,
      }).format(value)
    : value;

export const generateSecret = (length = 32) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export const capitalizeWord = (word) =>
  word ? word.charAt(0).toUpperCase() + word.slice(1) : word;

export const formatUuid = (uuid, length = 6) => {
  return uuid ? `#${uuid.slice(0, length)}` : "";
};

export const shortenString = (name, length = 40) => {
  if (name && name.length > length) {
    return `${name.slice(0, length)}...`;
  }

  return name;
};

export const copyToClipboard = (
  text,
  alertMessage = "Copied to clip board"
) => {
  window.navigator.clipboard.writeText(text);
  message.success(alertMessage);
};
