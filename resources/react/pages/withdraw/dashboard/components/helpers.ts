import { getMonth } from "../../../../utils/helpers";
import { months as labels } from "../../../../utils/constants";

const MONTHS = [
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

export function months(config) {
  var cfg = config || {};
  var count = cfg.count || 12;
  var section = cfg.section;
  var values = [];
  var i, value;

  for (i = 0; i < count; ++i) {
    value = MONTHS[Math.ceil(i) % 12];
    values.push(value.substring(0, section));
  }

  return values;
}

const monthNames = Array.from({ length: 12 }, (_, index) => {
  const date = new Date();
  date.setMonth(index);
  return date.toLocaleString("en-us", { month: "short" });
});

export const formatGraphData = (
  payload: any
): { labels: string[]; values: number[] } => {
  const months = [];
  const values = [];

  if (
    !payload ||
    payload == "null" ||
    payload == "undefined" ||
    payload.length == 0
  ) {
    return { labels, values };
  }

  monthNames.forEach((monthName) => {
    const monthKey = monthNames.findIndex(
      (name) =>
        new Date(`${monthName} 1, 2000`).getMonth() ===
        new Date(`${name} 1, 2000`).getMonth()
    );

    const monthYearKey = `${("0" + (monthKey + 1)).slice(
      -2
    )}-${new Date().getFullYear()}`;
    const value = payload[monthYearKey] || 0;

    months.push(monthName);
    values.push(value);
  });

  return {
    labels: months,
    values,
  };
};
