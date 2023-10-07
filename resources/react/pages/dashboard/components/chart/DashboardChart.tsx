import * as React from "react";
import { Box, Typography, Stack, Divider } from "@mui/material";
import { UserContext } from "../../../../contexts/user/UserContext";
import { DashboardContext } from "../../../../contexts/dashboard/DashboardContext";
import { Line } from "react-chartjs-2";
import { generateEmptyData } from "../../../../utils/helpers";
import { formatGraphData, generateLastThirtyDays } from "./helpers";
import { formatter } from "../../../../utils/Utils";
import DashboardChartLoader from "./DashboardChartLoader";

const DashboardChart = () => {
  const { user } = React.useContext(UserContext);
  const { dashboardData, isLoading } = React.useContext(DashboardContext);

  const [data, setData] = React.useState({
    labels: generateLastThirtyDays(),
    datasets: [
      {
        label: "Sats",
        backgroundColor: "#FF5A1F",
        borderColor: "#FF5A1F",
        data: generateEmptyData(),
        borderJoinStyle: "round",
      },
    ],
  });

  React.useEffect(() => {
    if (dashboardData) {
      const { labels, values } = formatGraphData(dashboardData?.revenue_by_day);

      setData({
        ...data,
        labels,
        datasets: [{ ...data.datasets[0], data: values }],
      });
    }
  }, [dashboardData]);

  if (isLoading) {
    return (
      <Box className="chart-container-section-one">
        <DashboardChartLoader />
      </Box>
    );
  }

  return (
    <Box className="chart-container-section-one">
      <Typography sx={styles.header}>Balance</Typography>

      <Stack
        direction="row"
        sx={{ alignItems: "center", marginBottom: "10px" }}
      >
        <Typography sx={styles.headerValue}>
          {formatter(user?.available_balance)}
        </Typography>

        <Typography sx={styles.currency}>SATS</Typography>
      </Stack>

      <Box sx={styles.chart}>
        <Line
          //@ts-ignore
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            elements: {
              line: {
                // tension: 1, // smooth lines
              },
              point: {
                radius: 0,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                ticks: {
                  maxTicksLimit: 1,
                  autoSkip: true,
                },
              },
              y: {
                beginAtZero: true,
                display: false,
              },
            },
          }}
        />
      </Box>

      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          marginBottom: "5px",
          width: {
            xs: "100%",
            md: "80%",
          },
          justifyContent: "space-between",
          marginTop: "30px",
          borderTop: {
            xs: "1px solid #E5E7EB",
            md: "none",
          },
          padding: {
            xs: "20px 20px 10px 20px",
            md: 0,
          },
        }}
      >
        <Box>
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Typography sx={styles.smallHeaderValue}>
              {formatter(dashboardData?.revenue_today)}
            </Typography>
            <Typography sx={styles.smallCurrency}>SATS</Typography>
          </Stack>

          <Typography sx={styles.label}>Revenue Today</Typography>
        </Box>

        <Box>
          <Divider
            orientation="vertical"
            flexItem
            variant="middle"
            sx={{
              width: "1px",
              height: "50px",
              background: {
                xs: "#D1D5DB",
                md: "#374151",
              },
            }}
          />
        </Box>

        <Box>
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Typography sx={styles.smallHeaderValue}>
              {formatter(dashboardData?.revenue_last_thirty_days)}
            </Typography>
            <Typography sx={styles.smallCurrency}>SATS</Typography>
          </Stack>

          <Typography sx={styles.label}>Revenue 30 days</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

const styles = {
  chart: {
    height: "100px",
    position: "relative",
    marginTop: "30px",
  },
  header: {
    color: "#374151",
    fontWeight: "600",
    fontSize: "14px",
    marginBottom: "5px",
  },
  headerValue: {
    color: "#374151",
    fontWeight: "600",
    fontSize: {
      xs: "24px",
      md: "30px",
    },
    marginRight: "10px",
  },

  smallHeaderValue: {
    color: "#374151",
    fontWeight: "600",
    fontSize: {
      xs: "18px",
      md: "20px",
    },
    marginRight: "10px",
  },
  currency: {
    color: "#6B7280",
    fontWeight: "500",
    fontSize: {
      xs: "24px",
      md: "30px",
    },
  },
  smallCurrency: {
    color: "#6B7280",
    fontWeight: "500",
    fontSize: {
      xs: "18px",
      md: "20px",
    },
  },
  label: {
    color: {
      xs: "#6B7280",
      md: "#374151",
    },
    fontWeight: "600",
    fontSize: {
      xs: "13px",
      md: "14px",
    },
    marginTop: "5px",
  },
};

export default DashboardChart;
