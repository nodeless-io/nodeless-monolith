import React from "react";
import { Box, Typography, Button, Divider, ButtonGroup } from "@mui/material";
import { PaywallMetricsContext } from "../../../contexts/paywall/PaywallMetricsContext";
import { Line } from "react-chartjs-2";
import PaywallSkeleton from "./PaywallSkeleton";
import { months as labels, emptyData } from "../../../utils/constants";
import {
  reverseArray,
  formatTimestamp,
  formatCustomTimestamp,
} from "../../../utils/helpers";
import { formatter } from "../../../utils/Utils";

const PaywallDashboardContent = () => {
  const {
    currentTab,
    isLoading,
    revenueData,
    setCurrentTab,
  } = React.useContext(PaywallMetricsContext);

  const [data, setData] = React.useState({
    labels: formatTimestamp(labels, currentTab),
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

  const [tickLimit, setTickLimit] = React.useState(12);

  React.useEffect(() => {
    if (currentTab === "D") {
      setTickLimit(8);
    } else if (currentTab === "M") {
      setTickLimit(10);
    } else {
      setTickLimit(12);
    }
  }, [currentTab]);

  React.useEffect(() => {
    if (revenueData) {
      setData({
        ...data,
        labels: formatCustomTimestamp(
          reverseArray(revenueData?.labels),
          currentTab
        ),
        datasets: [
          {
            ...data.datasets[0],
            data: reverseArray(
              revenueData?.revenue_by_month ||
                revenueData?.revenue_by_day ||
                revenueData?.revenue_by_hour
            ),
          },
        ],
      });
    }
  }, [revenueData]);

  return isLoading ? (
    <Box sx={styles.container}>
      <PaywallSkeleton />
    </Box>
  ) : (
    <Box sx={styles.container}>
      <Box sx={styles.graph}>
        <Box sx={styles.header}>
          <Box sx={styles.headerText}>
            <Typography sx={styles.label}>Revenue</Typography>

            <Divider orientation="vertical" flexItem sx={styles.divider} />

            <Typography sx={styles.value}>
              {formatter(revenueData?.total)}
            </Typography>

            <Typography sx={styles.currency}>SATS</Typography>
          </Box>
        </Box>

        <Divider sx={styles.headerDivider} />

        <Box sx={styles.chartContainer}>
          <Box sx={styles.chartContainerHeader}>
            <ButtonGroup variant="text">
              {["D", "M", "Y"].map((tab, index) => (
                <Button
                  key={index}
                  sx={
                    tab === currentTab
                      ? styles.activeChartToggleButton
                      : styles.chartToggleButton
                  }
                  onClick={() => setCurrentTab(tab)}
                >
                  {tab}
                </Button>
              ))}
            </ButtonGroup>
          </Box>

          <Box sx={styles.graphContainer}>
            <Line
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
                  x: {
                    ticks: {
                      maxTicksLimit: tickLimit,
                    },
                  },
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    width: "100%",
    height: "100%",
    padding: {
      xs: 0,
      sm: "10px",
      md: "0 20px",
    },
  },
  graphContainer: {
    height: {
      xs: "200px",
      md: "300px",
    },
    width: "100%",
  },
  graph: {
    border: "1px solid #E5E7EB",
    borderRadius: "10px",
    padding: "20px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
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
    fontSize: "16px",
    fontWeight: "600",
  },
  value: {
    color: "#111928",
    letterSpacing: "0.04em",
    fontSize: "16px",
    fontWeight: "600",
    marginRight: "10px",
  },
  currency: {
    color: "#9CA3AF",
    fontSize: "16px",
    fontWeight: "600",
  },
  activeButton: {
    height: "33px",
  },
  button: {
    color: "#6B7280",
    border: "1px solid #6B7280",
    height: "33px",
    "&:hover": {
      color: "#6B7280",
      border: "1px solid #6B7280",
    },
  },
  headerDivider: {
    marginTop: "15px",
  },
  chartContainer: {
    marginTop: "10px",
  },
  chartContainerHeader: {
    display: "flex",
    flexDirection: "row-reverse",
  },
  activeChartToggleButton: {
    color: "#233876",
    fontSize: "16px",
  },
  chartToggleButton: {
    color: "#9CA3AF",
    fontSize: "16px",
  },
};

export default PaywallDashboardContent;
