import React from 'react';
import { ThemeProvider } from 'styled-components';

import { getTheme } from '../../helpers';

export const Provider = ({ children, theme }) => {
  return (
    <ThemeProvider theme={getTheme(theme)}>
      {children}
    </ThemeProvider>
  );
};

Provider.defaultProps = {
  theme: {},
};
