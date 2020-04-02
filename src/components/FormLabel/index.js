import React from 'react';
import styled from 'styled-components';

import { Text } from '../';

const Label = styled.Text`
  font-weight: bold;
  margin-top: ${({ theme }) => theme.spacing.unit * 3};
  margin-bottom: ${({ theme }) => theme.spacing.unit};
`;

export const FormLabel = ({ label }) => {
  return <Label as={Text}>{label}</Label>;
};
