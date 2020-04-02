import React from "react";
import { PixelRatio, Dimensions } from "react-native";
import styled from "styled-components";

const Row = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const ColComponent = styled.View`
  width: ${({ size }) => (100 / 12) * size}%;
`;

const Col = ({ children, ...props }) => {
  const size = react.useMemo(() => {
    const { width } = Dimensions.get("window");
    const realWidth = PixelRatio.roundToNearestPixel(width);

    if (realWidth <= 480) return "phone";
    return "tablet";
  }, [props]);

  return (
    <ColComponent size={props[size]} {...props}>
      {children}
    </ColComponent>
  );
};

export const Grid = ({ container, ...props }) =>
  container ? <Row {...props} /> : <Col {...props} />;

Col.defaultProps = {
  phone: 12,
  tablet: 12,
  size: 12
};
