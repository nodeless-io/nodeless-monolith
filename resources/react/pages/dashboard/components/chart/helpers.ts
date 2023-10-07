import { formatDate } from "../../../../utils/Utils";

export const generateLastThirtyDays = () => {
  let last30Days = [];

  for (let i = 29; i >= 0; i--) {
    let date = new Date();
    date.setDate(date.getDate() - i);

    last30Days.push(date);
  }

  return last30Days;
};

export const formatGraphData = (
  payload: any
): { labels: string[]; values: number[] } => {
  const values = [];
  const labels = [];

  if (
    !payload ||
    payload == "null" ||
    payload == "undefined" ||
    payload.length == 0
  ) {
    return { labels, values };
  }

  let currentDate = new Date();

  for (let i = 29; i >= 0; i--) {
    let date = new Date();
    date.setDate(currentDate.getDate() - i);

    let revenue = payload[date.toISOString().slice(0, 10)] || 0;

    values.push(revenue);
    labels.push(formatDate(date.toISOString(), "MMM D"));
  }

  return {
    labels,
    values,
  };
};
