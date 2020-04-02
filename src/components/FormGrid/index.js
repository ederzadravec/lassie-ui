import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Row } from './Row';

const Container = styled.View`
  height: auto;
`;

export const FormGrid = ({ config }) => {
  return (
    <Container>
      {config.map(row => (
        <Row config={row} />
      ))}
    </Container>
  );
};

FormGrid.defaultProps = {
  config: [],
};

FormGrid.proptypes = {
  config: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        size: PropTypes.oneOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
        offset: PropTypes.oneOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
        props: PropTypes.func.isRequired,
        type: PropTypes.node.isRequired,
        hide: PropTypes.func,
      })
    )
  ).isRequired,
};
