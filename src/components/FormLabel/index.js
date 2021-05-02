import React from 'react';
import styled from 'styled-components';

import { Text } from '../Text';

const Label = styled.Text`
  font-weight: bold;
  margin-top: ${({ theme }) => theme.spacing.unit * 3}px;
  margin-bottom: ${({ theme }) => theme.spacing.unit}px;
`;

export const FormLabel = ({ label }) => {
  return <Label as={Text}>{label}</Label>;
};
