import React from "react";
import { Box } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { formatGraphData } from "./helpers";
import { WithdrawContext } from "../../../../contexts/withdraw/WithdrawContext";
import { months as labels, emptyData } from "../../../../utils/constants";

const WithdrawMetricsChart = () => {
  const { withdrawalMetrics } = React.useContext(WithdrawContext);

  const [data, setData] = React.useState({
    labels,
    datasets: [
      {
        label: "Sats",
        backgroundColor: "#FF5A1F",
        borderColor: "#FF5A1F",
        data: emptyData,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
    ],
  });

  React.useEffect(() => {
    if (withdrawalMetrics) {
      const { labels, values } = formatGraphData(
        withdrawalMetrics?.withdrawals_by_month
      );
      setData({
        ...data,
        labels,
        datasets: [{ ...data.datasets[0], data: values }],
      });
    }
  }, [withdrawalMetrics]);

  return (
    <Box sx={styles.container}>
      <Bar
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                maxTicksLimit: 10,
              },
            },
          },
        }}
      />
    </Box>
  );
};

const styles = {
  container: {
    marginTop: "50px",
    height: {
      xs: "200px",
      md: "300px",
    },
  },
};

export default WithdrawMetricsChart;
