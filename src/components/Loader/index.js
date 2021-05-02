import React from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Modal } from 'react-native';

import { Text } from '../Text';

const Container = styled.View`
  justify-content: center;
  flex: 1;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Image = styled.ActivityIndicator`
  margin-bottom: ${({ theme }) => theme.spacing.unit * 2}px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: bold;
  font-size: 16px;
`;

export const Loader = ({ show, transparent, title }) => {
  const theme = React.useContext(ThemeContext);

  if (!show) return null;

  return (
    <Modal transparent={transparent} visible={show}>
      <Container>
        <Image size="large" color={theme.palette.primary.main} />

        <Title as={Text}>{title}</Title>
      </Container>
    </Modal>
  );
};

export const LoaderIcon = () => {
  const theme = React.useContext(ThemeContext);

  return (
    <Container>
      <Image size="large" color={theme.palette.primary.main} />
    </Container>
  );
};

Loader.defaultProps = {
  show: true,
  title: 'Aguarde...',
  transparent: false,
};
