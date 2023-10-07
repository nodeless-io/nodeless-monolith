import React from "react";
import { Typography, Box, IconButton, Tooltip, Button } from "@mui/material";
import ImageIcon from "../../assets/svg/Image.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import { message } from "antd";

const FileUpload = ({ setFile, file }) => {
  const [preview, setPreview] = React.useState(null);

  const MAX_FILE_SIZE = 10240; // 10MB

  const selectFile = (e) => {
    const selectedFile = e.target.files[0];

    const fileSizeKiloBytes = selectedFile.size / 1024;

    if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      message.error("File size is greater than 10mb");
      return;
    }

    setFile(selectedFile);
  };

  React.useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <Box>
      {file ? (
        <img
          src={preview}
          alt="Donation Page Image"
          className="uploaded-image"
        />
      ) : (
        <Button
          variant="contained"
          component="label"
          sx={styles.uploadButton}
          disableElevation
        >
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <img src={ImageIcon} />
            <Typography
              sx={{
                color: "#374151",
                fontSize: {
                  xs: "13px",
                  md: "14px",
                },
                fontWeight: "600",
              }}
            >
              Add Image
            </Typography>
            <Typography
              sx={{
                color: "#9CA3AF",
                fontSize: {
                  xs: "12px",
                  md: "13px",
                },
                fontWeight: "600",
              }}
            >
              png, jpg, gif, webp
            </Typography>
          </Box>

          <input hidden accept="image/*" type="file" onChange={selectFile} />
        </Button>
      )}

      {file && (
        <Box sx={styles.footer}>
          <Tooltip title="Remove Image">
            <IconButton size="small" onClick={() => setFile(null)}>
              <DeleteIcon fontSize="small" color="error" />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

const styles = {
  footer: {
    width: "100%",
    display: "flex",
    justifyContent: "right",
    // marginTop: "30px",
  },
  uploadButton: {
    width: "100%",
    height: "150px",
    border: "1px solid #D1D5DB",
    textTransform: "none",
    "&:hover": {
      background: "#E5E7EB",
    },
    marginBottom: "30px",
  },
};

export default FileUpload;
