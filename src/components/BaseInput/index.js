import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.View`
  position: relative;
  min-height: ${({ theme }) => theme.spacing.unit * 8};
  min-width: 100%;
  padding-bottom: ${({ theme }) => theme.spacing.unit * 2};
`;

const Error = styled.Text`
  position: absolute;
  bottom: 0;
  color: ${({ theme }) => theme.palette.error.main};
  font-size: 12;
`;

export const BaseInput = ({ error, children, ...props }) => {
  return (
    <Container {...props}>
      {children}
      <Error>{error}</Error>
    </Container>
  );
};

BaseInput.defaultProps = {
  error: '',
};

BaseInput.proptypes = {
  error: PropTypes.string,
  children: PropTypes.node.isRequired,
};
