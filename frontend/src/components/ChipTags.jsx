import React from "react";
import { Box, Chip } from "@mui/material";

const defaultProps = {
  adult: "NONE",
  medical: "NONE",
  spoofed: "NONE",
  violence: "NONE",
  racy: "NONE",
};


const ChipTags = ({ tags = defaultProps }) => {
  const colorMap = {
    VERY_UNLIKELY: "#00FF00", // Green
    UNLIKELY: "#00FFFF", // Cyan
    POSSIBLE: "#FFFF00", // Yellow
    LIKELY: "#FFA500", // Orange
    VERY_LIKELY: "#FF0000", // Red
    NONE: "#FFFFFF", // White
  };

  return (
    <Box padding="0.5rem" display="flex" gap="0.5rem">
      {Object.entries(tags).map(([key, value]) => (
        <Chip
          padding={"0.5rem"}
          key={key}
          label={key}
          style={{
            borderColor: colorMap[value],
            borderWidth: '1px',
            borderStyle: 'solid',
          }}
        />
      ))}
    </Box>
  );
};

export default ChipTags;
