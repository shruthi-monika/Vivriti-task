import React from "react";
import { Box, Typography } from "@mui/material";

const Banner = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to right, black, red)", 
        color: "white", 
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", 
        display: "flex",
        alignItems: "left",
        justifyContent: "space-between",
        marginBottom: "20px",
        marginTop: "20px"
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        Lorem Ipsum
      </Typography>
      <Typography variant="body1">
        Slash Sales begins in June. Get up to 80% Discount on all products{" "}
        <span style={{ fontWeight: "bold", cursor: "pointer", textDecoration: "underline" }}>
          Read More
        </span>
      </Typography>
    </Box>
  );
};

export default Banner;
