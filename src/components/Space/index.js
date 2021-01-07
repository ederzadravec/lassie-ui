import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.View`
  margin-top: ${({ top, theme }) => theme.spacing.unit * top}px;
  margin-left: ${({ left, theme }) => theme.spacing.unit * left}px;
  margin-bottom: ${({ bottom, theme }) => theme.spacing.unit * bottom}px;
  margin-right: ${({ right, theme }) => theme.spacing.unit * right}px;
`;

export const Space = props => {
  return <Container {...props} />;
};

Space.defaultProps = {
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

Space.proptypes = {
  top: PropTypes.number,
  left: PropTypes.number,
  bottom: PropTypes.number,
  right: PropTypes.number,
};
