import React from 'react';
import styled from 'styled-components';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import { Text } from '../Text';

const Container = styled.View`
  padding: ${({ theme }) => theme.spacing.unit * 1.5}px 0;
  background-color: ${({ theme }) => theme.components.header.background};
  flex-direction: row;
`;

const Title = styled.Text`
  flex: 1;
  line-height: 40px;
  margin: 0 ${({ theme }) => theme.spacing.unit * 1}px;
  color: ${({ theme }) => theme.components.header.text};
  font-size: ${({ theme }) => theme.components.header.fontSize}px;
  text-align: ${({ theme }) => theme.components.header.textAlign};
  font-weight: ${({ theme }) => theme.components.header.fontWeight};
`;

const Actions = styled.View`
  justify-content: center;
  min-width: 56px;
  flex-direction: row;
`;

const Action = styled(Icon)`
  height: 40px;
  width: 56px;
  line-height: 40px;
  font-size: 28px;
  text-align: center;
  color: ${({ theme }) => theme.components.header.text};
`;

export const Header = ({ children, left, right, ...props }) => {
  return (
    <Container {...props}>
      <Actions>
        {left.map(({ component: Component, icon: name, ...icon }) =>
          Component ? <Component key={name} /> : <Action key={name} name={name} {...icon} />
        )}
      </Actions>

      <Title as={typeof children === 'string' ? Text : View}>{children}</Title>

      <Actions>
        {right.map(({ component: Component, icon: name, ...icon }) =>
          Component ? <Component key={name} /> : <Action key={name} name={name} {...icon} />
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
