import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.Text`
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  color: ${({ theme }) => theme.typography.text.color};
  font-size: ${({ theme }) => theme.typography.text.fontSize}px;
`;

export const Text = ({ children, ...props }) => <Container {...props}>{children}</Container>;

Text.defaultProps = {
  bold: false,
};

Text.prototypes = {
  children: PropTypes.oneOf([PropTypes.string, PropTypes.node]),
  bold: PropTypes.bool,
};
