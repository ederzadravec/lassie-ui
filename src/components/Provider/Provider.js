import React from 'react';
import { ThemeProvider } from 'styled-components';

import { getTheme } from '../../helpers';
import { Alert } from '../Alert/Alert'

export const Provider = ({ children, theme }) => {
  return (
    <ThemeProvider theme={getTheme(theme)}>
      <Alert.Component />

      {children}
    </ThemeProvider>
  );
};

Provider.defaultProps = {
  theme: {},
};
