import React from "react";
import { Box, BoxProps, CircularLoadingSpinner } from "@tbi/components";

type Props = BoxProps;

export const LoadingSpinner = ({ ...rest }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        width: "100%",
        p: 2,
        ...rest.sx,
      }}
      {...rest}
    >
      <CircularLoadingSpinner />
    </Box>
  );
};
