import styled from 'styled-components/native';
import RNIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RNCamera } from 'react-native-camera';

export const Modal = styled.Modal`
  flex: 1;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const CameraComponent = styled(RNCamera)`
  position: relative;
  flex: 1;
`;

export const PhotoContainer = styled.View`
  position: relative;
  background: #000;
  flex: 1;
`;

export const Photo = styled.Image`
  position: absolute;
  flex: 1;
  width: 100%;
  height: 100%;
`;

export const Content = styled.View`
  flex: 1;
`;

export const Footer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: auto;
  padding-top: 16px;
  padding-bottom: 24px;
  background: ${({ theme }) => theme.palette.primary.main};
`;

export const CameraButton = styled(RNIcon)`
  color: #fff;
  align-self: center;
  font-size: 44px;
`;

export const CheckButton = styled(RNIcon)`
  color: #fff;
  align-self: center;
  font-size: 44px;
`;

export const RetryButton = styled(RNIcon)`
  color: #fff;
  align-self: center;
  font-size: 44px;
`;
