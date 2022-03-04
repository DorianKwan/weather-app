import { useTheme } from '@emotion/react';
import { Theme } from '../theme/theme';

export const useTypedTheme = () => {
  const theme = useTheme();

  return theme as Theme;
};
