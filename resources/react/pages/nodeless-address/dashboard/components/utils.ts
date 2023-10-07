import { getMonth } from "../../../../utils/helpers";
import { months as labels, emptyData } from "../../../../utils/constants";

export const formatGraphData = (
  payload: any
): { labels: string[]; values: any[]; sum: number } => {
  const values = [];

  let sum = 0;

  if (
    !payload ||
    payload == "null" ||
    payload == "undefined" ||
    payload.length == 0
  ) {
    return { labels, values: emptyData, sum };
  }

  Object.entries(payload).forEach(([key, value]) => {
    sum += Number(value);
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
    sum,
  };
};
