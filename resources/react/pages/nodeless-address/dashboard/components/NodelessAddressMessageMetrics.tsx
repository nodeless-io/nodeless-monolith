import React from "react";
import {
  Box,
  Typography,
  Divider,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { NodelessAddressMetricsContext } from "../../../../contexts/nodeless-address/NodelessAddressMetricsContext";
import NoDataLogo from "../../../assets/svg/no-metrics-data.svg";

const NodelessAddressMessageMetrics = () => {
  const [selected, setSelected] = React.useState("paid");
  const { metricsData } = React.useContext(NodelessAddressMetricsContext);

  const [data, setData] = React.useState<{
    total_paid: number | string;
    total_unpaid: number | string;
    total_requests: number | string;
    earnings: any;
  }>({
    total_paid: 0,
    total_unpaid: 0,
    total_requests: 0,
    earnings: {},
  });

  const handleLabelSelection = (label: "paid" | "unpaid") => {
    setSelected(label);
    switch (label) {
      case "unpaid":
        setData({
          ...data,
          earnings: {
            ...data.earnings,
            datasets: [
              {
                ...data.earnings.datasets[0],
                backgroundColor: ["#E5E7EB", "#F04200"],
              },
            ],
          },
        });

        break;
      case "paid":
      default:
        setData({
          ...data,
          earnings: {
            ...data.earnings,
            datasets: [
              {
                ...data.earnings.datasets[0],
                backgroundColor: ["#F04200", "#E5E7EB"],
              },
            ],
          },
        });
    }
  };

  React.useEffect(() => {
    if (metricsData) {
      setData({
        earnings: {
          labels: ["Paid", "Unpaid"],
          datasets: [
            {
              backgroundColor: ["#F04200", "#E5E7EB"],
              borderColor: "#FFFFFF",
              hoverBorderColor: "#FFFFFF",
              data: [
                metricsData?.total_paid,
                metricsData?.total_requests - metricsData?.total_paid,
              ],
              borderWidth: 1,
            },
          ],
        },

        total_paid: metricsData?.total_paid,
        total_requests: metricsData?.total_requests,
        total_unpaid: metricsData?.total_requests - metricsData?.total_paid,
      });
    }
  }, [metricsData]);

  //   const percentageText = {
  //     id: "percentageText",
  //     beforeDatasetsDraw(chart) {
  //       const { ctx } = chart;

  //       ctx.save();
  //       ctx.font = "bolder 100px";
  //       ctx.fillStye = "#374151";
  //       ctx.textAlign = "center";
  //       ctx.textBaseline = "middle";
  //       ctx.fillText(
  //         `${percentage} %`,
  //         chart.getDatasetMeta(0).data[0].x,
  //         chart.getDatasetMeta(0).data[0].y
  //       );
  //     },
  //   };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Typography sx={styles.label}>
          {selected === "paid" ? "Paid" : "Unpaid"}
        </Typography>
        <Divider orientation="vertical" flexItem />
        <Typography sx={styles.value}>
          {selected === "paid" ? data.total_paid : data.total_unpaid}{" "}
          <span>Msg</span>
        </Typography>
      </Box>

      <Divider />

      <Box sx={styles.cContainer}>
        {data.total_requests == 0 ? (
          <Box sx={styles.noDataContainer}>
            <img src={NoDataLogo} />
          </Box>
        ) : (
          <Box sx={styles.chartContainer}>
            <Doughnut
              data={data.earnings}
              options={{
                maintainAspectRatio: true,
                cutout: 125,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                radius: 80,
              }}
              // plugins={[percentageText]}
            />
          </Box>
        )}

        <Box sx={styles.selector}>
          <RadioGroup>
            <FormControlLabel
              value="paid"
              control={
                <Radio
                  color="secondary"
                  size="small"
                  checked={selected === "paid"}
                  onChange={() => handleLabelSelection("paid")}
                />
              }
              label={
                <Typography sx={styles.selectLabel}>
                  Paid <span>({data.total_paid}) </span>
                </Typography>
              }
            />

            <FormControlLabel
              value="unpaid"
              control={
                <Radio
                  color="secondary"
                  size="small"
                  checked={selected === "unpaid"}
                  onChange={() => handleLabelSelection("unpaid")}
                />
              }
              label={
                <Typography sx={styles.selectLabel}>
                  Unpaid <span>({data.total_unpaid}) </span>
                </Typography>
              }
            />
          </RadioGroup>
        </Box>
      </Box>

      <Divider
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
          margin: "0 0 10px 0",
        }}
      />
    </Box>
  );
};

const styles = {
  noDataContainer: {
    width: {
      xs: "50%",
      md: "100%",
    },
    textAlign: "center",
    marginTop: "50px",
    marginBottom: "30px",
  },
  cContainer: {
    display: {
      xs: "flex",
      md: "block",
    },
    width: "100%",
    alignItems: "center",
    justifyContent: {
      xs: "left",
    },
  },
  chartContainer: {
    margin: {
      xs: "unset",
      md: "auto",
    },
    position: "relative",
    marginTop: {
      xs: "unset",
      md: "-50px",
    },
  },
  selector: {
    paddingLeft: {
      xs: "unset",
      md: "30px",
    },
    paddingRight: {
      xs: "20px",
    },
    paddingBottom: {
      md: "30px",
    },
  },
  container: {
    border: {
      xs: "unset",
      md: "1px solid #E5E7EB",
    },
    borderRadius: {
      xs: "unset",
      md: "10px",
    },
    width: {
      xs: "100%",
      md: "30%",
    },
  },
  header: {
    display: "flex",
    alignItems: {
      xs: "left",
      md: "center",
    },
    width: "100%",
    margin: "22px 0",
    "& hr": {
      mx: 2,
    },
    justifyContent: {
      xs: "left",
      md: "center",
    },
    paddingLeft: {
      xs: "40px",
      md: "unset",
    },
  },
  label: {
    color: "#111928",
    fontSize: {
      xs: "14px",
      md: "15px",
    },
    fontWeight: "600",
  },
  value: {
    color: "#111928",
    fontSize: {
      xs: "14px",
      md: "15px",
    },
    fontWeight: "600",
    "& span": {
      color: "#9CA3AF",
    },
  },
  selectLabel: {
    color: "#111928",
    fontSize: "13px",
    fontWeight: "600",
    "& span": {
      color: "#9CA3AF",
    },
  },
};

export default NodelessAddressMessageMetrics;
