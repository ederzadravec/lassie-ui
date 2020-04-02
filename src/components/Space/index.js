import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.View`
  margin-top: ${({ top, theme }) => theme.spacing.unit * top}
  margin-left:  ${({ left, theme }) => theme.spacing.unit * left}
`;

export const Space = props => {
  return <Container {...props} />;
};

Space.defaultProps = {
  top: 0,
  left: 0,
};

Space.proptypes = {
  top: PropTypes.number,
  left: PropTypes.number,
};
