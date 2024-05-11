import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import * as Styled from "./styled";
import { FieldError } from "react-hook-form";

interface SimpleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | ReactNode;
  error?: FieldError | undefined;
  width?: string;
  viewMode?: boolean;
}

const SimpleInput = forwardRef<HTMLInputElement, SimpleInputProps>(
  ({ label, error, width, viewMode, ...rest }, ref) => {
    return (
      <Styled.Container width={width} viewMode={viewMode}>
        <Styled.Label>{label}</Styled.Label>
        <Styled.Input type="text" ref={ref} {...rest} viewMode={viewMode} />
        {error && <Styled.Error>{error.message}</Styled.Error>}
      </Styled.Container>
    );
  }
);

export default SimpleInput;
