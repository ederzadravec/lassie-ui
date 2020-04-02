import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Column } from './Column';

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Row = ({ config }) => {
  return (
    <Container>
      {config.map((column, key) => (
        <Column last={config.length - 1 <= key} {...column} />
      ))}
    </Container>
  );
};

Row.defaultProps = {
  config: [],
};

Row.proptypes = {
  config: PropTypes.arrayOf(
    PropTypes.shape({
      size: PropTypes.oneOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
      offset: PropTypes.oneOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
      props: PropTypes.func.isRequired,
      type: PropTypes.node.isRequired,
      hide: PropTypes.func,
    })
  ).isRequired,
};
