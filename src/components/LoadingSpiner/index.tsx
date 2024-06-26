import React, { FC } from "react";
import * as Styled from "./styled";

type LoadingSpinnerProps = {
  size?: "smaller" | "small" | "medium" | "big" | "bigger";
  color?: "light" | "dark";
};

enum ESize {
  "smaller" = 16,
  "small" = 25,
  "medium" = 40,
  "big" = 70,
  "bigger" = 120,
}

enum EThinness {
  "smaller" = 1,
  "small" = 2,
  "medium" = 3,
  "big" = 4,
  "bigger" = 5,
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({
  size = "small",
  color = "dark",
}) => {
  return (
    <Styled.Container>
      <Styled.Spinner
        size={ESize[size]}
        thinness={EThinness[size]}
        color={color}
      />
    </Styled.Container>
  );
};

export default LoadingSpinner;
