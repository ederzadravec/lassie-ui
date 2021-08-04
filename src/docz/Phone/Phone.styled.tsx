import styled from "styled-components/native";

export const Container = styled.View`
  position: relative;
  width: 340px;
  height: 680px;

  background: red;
  border: 12px solid #000;
  border-radius: 44px;
  overflow: auto;
  z-index: 1;
`;

export const Notch = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  align-items: center;
  z-index: 2;
`;

export const NotchContent = styled.View`
  width: 120px;
  height: 20px;
  background: #000;
  z-index: 2;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

export const Bottom = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  align-items: center;
  z-index: 2;
`;

export const BottomContent = styled.View`
  margin-bottom: 4px;
  width: 90px;
  height: 4px;
  border-radius: 4px;
  background: #000;
`;

export const Content = styled.View`
  flex: 1;
  background: #fff;
  z-index: 1;
  padding: 32px 12px 20px 12px;
`;
