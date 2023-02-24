import React, { forwardRef } from "react";
import { CircularProgress, CircularProgressProps } from "@tbi/components";

type Props = {} & CircularProgressProps;

export const CircularLoadingSpinner = forwardRef(({ ...rest }: Props, ref) => {
  return <CircularProgress role="progressbar" {...rest} ref={ref} />;
});
