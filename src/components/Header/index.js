import React from 'react';
import styled from 'styled-components';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import { Text } from '../';

const Container = styled.View`
  padding-vertical: ${({ theme }) => theme.spacing.unit * 1.5};
  background-color: ${({ theme }) => theme.components.header.background};
  flex-direction: row;
`;

const Title = styled.Text`
  flex: 1;
  line-height: 40;
  margin-horizontal: ${({ theme }) => theme.spacing.unit * 1};
  color: ${({ theme }) => theme.components.header.text};
  font-size: ${({ theme }) => theme.components.header.fontSize};
  text-align: ${({ theme }) => theme.components.header.textAlign};
  font-weight: ${({ theme }) => theme.components.header.fontWeight};
`;

const Actions = styled.View`
  justify-content: center;
  min-width: 56;
  flex-direction: row;
`;

const Action = styled(Icon)`
  height: 40;
  width: 56;
  line-height: 40;
  font-size: 28;
  text-align: center;
  color: ${({ theme }) => theme.components.header.text};
`;

export const Header = ({ children, left, right, ...props }) => {
  return (
    <Container {...props}>
      <Actions>
        {left.map(({ component: Component, icon: name, ...icon }) =>
          Component ? <Component /> : <Action name={name} {...icon} />
        )}
      </Actions>

      <Title as={typeof children === 'string' ? Text : View}>{children}</Title>

      <Actions>
        {right.map(({ component: Component, icon: name, ...icon }) =>
          Component ? <Component /> : <Action name={name} {...icon} />
        )}
      </Actions>
    </Container>
  );
};

Header.defaultProps = {
  left: [],
  right: [],
};

Header.prototypes = {
  children: PropTypes.oneOf([PropTypes.string, PropTypes.node]),
  left: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      onPress: PropTypes.func,
      component: PropTypes.node,
    })
  ),
  right: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      onPress: PropTypes.func,
      component: PropTypes.node,
    })
  ),
};
