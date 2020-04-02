import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.View`
  padding-right: ${({ last, theme }) => (last ? 0 : theme.spacing.unit)};
  margin-left: ${({ offset }) => (100 / 12) * offset}%;
  width: ${({ size }) => (100 / 12) * size}%;

  padding-vertical: 8;
`;

export const Column = ({ type, schema, props, size, offset, last, hide }) => {
  const Component = !hide()
    ? React.createElement(type, {
        name: schema,
        ...props(schema),
      })
    : null;

  return (
    <Container last={last} offset={offset} size={size}>
      {Component}
    </Container>
  );
};

Column.defaultProps = {
  size: 12,
  offset: 0,
  last: false,
  props: () => ({}),
  type: () => {},
  hide: () => false,
};

Column.proptypes = {
  size: PropTypes.oneOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
  offset: PropTypes.oneOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
  props: PropTypes.func.isRequired,
  type: PropTypes.node.isRequired,
  hide: PropTypes.func,
};
