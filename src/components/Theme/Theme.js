import React from 'react';
import { ThemeProvider } from 'styled-components';

import { getTheme } from '../../helpers';

export const Theme = ({ children, theme }) => {
  return (
    <ThemeProvider theme={getTheme(theme)}>
      {children}
    </ThemeProvider>
  );
};

Theme.defaultProps = {
  theme: {},
};
