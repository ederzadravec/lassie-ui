import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Row } from './Row';

const Container = styled.ScrollView`
  flex: 1;
`;

export const FormGrid = ({ config, ...props }) => {
  return (
    <Container {...props}>
      {config.map((row) => (
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
        schema: PropTypes.string.isRequired,
        size: PropTypes.oneOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
        offset: PropTypes.oneOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
        props: PropTypes.func.isRequired,
        type: PropTypes.node.isRequired,
        hide: PropTypes.func,
      })
    )
  ).isRequired,
};
