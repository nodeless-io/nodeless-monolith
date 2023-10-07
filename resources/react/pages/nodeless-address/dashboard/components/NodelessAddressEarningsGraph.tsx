import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { NodelessAddressMetricsContext } from "../../../../contexts/nodeless-address/NodelessAddressMetricsContext";
import { formatGraphData } from "./utils";
import { months as labels, emptyData } from "../../../../utils/constants";
import { formatValue, formatter } from "../../../../utils/Utils";

const NodelessAddressEarningsGraph = () => {
  const { metricsData } = React.useContext(NodelessAddressMetricsContext);
  const [earningsSum, setEarningsSum] = React.useState(0);
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
    if (metricsData) {
      const { labels, values, sum } = formatGraphData(
        metricsData?.earnings_by_month
      );

      setData({
        ...data,
        labels,
        datasets: [{ ...data.datasets[0], data: values }],
      });
      setEarningsSum(sum);
    }
  }, [metricsData]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Box sx={styles.headerText}>
          <Typography sx={styles.label}>Earnings</Typography>

          <Divider orientation="vertical" flexItem sx={styles.divider} />

          <Typography sx={styles.value}>{formatter(earningsSum)}</Typography>

          <Typography sx={styles.currency}>SATS</Typography>
        </Box>
      </Box>

      <Divider sx={styles.headerDivider} />

      <Box
        sx={{
          height: {
            xs: "250px",
            md: "300px",
          },
        }}
      >
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
                  callback: function (value, index, ticks) {
                    return formatValue(value);
                  },
                  maxTicksLimit: 10,
                },
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    border: {
      md: "1px solid #E5E7EB",
    },
    borderRadius: "10px",
    width: {
      xs: "100%",
      md: "70%",
    },
    padding: {
      xs: "10px",
      md: "20px",
    },
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: {
      xs: "20px",
      md: "none",
    },
  },
  headerText: {
    display: "flex",
  },
  divider: {
    marginRight: "10px",
    marginLeft: "10px",
  },
  label: {
    color: "#111928",
    letterSpacing: "0.04em",
    fontSize: {
      xs: "14px",
      md: "16px",
    },
    fontWeight: "600",
  },
  value: {
    color: "#111928",
    letterSpacing: "0.04em",
    fontSize: {
      xs: "14px",
      md: "16px",
    },
    fontWeight: "600",
    marginRight: "10px",
  },
  currency: {
    color: "#9CA3AF",
    fontSize: {
      xs: "14px",
      md: "16px",
    },
    fontWeight: "600",
  },
  headerDivider: {
    margin: "15px 0",
  },
};

export default NodelessAddressEarningsGraph;
