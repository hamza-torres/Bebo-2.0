import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";


const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="https://image.api.playstation.com/vulcan/ap/rnd/202202/2806/xreKEb65CYM6LKfzgiNLFKlV.png"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Gran Turismo</Typography>
        <Typography color={medium}>playstation.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
      Whether you’re a competitive or casual racer, collector, tuner, livery designer or photographer – find your line with a staggering collection of game modes including fan-favourites like GT Campaign, Arcade and Driving School.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;