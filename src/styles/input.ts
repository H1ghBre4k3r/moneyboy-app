import { createColors } from '@styles/colors';
import { StylingProps } from '@styles/stylingProps';

export const createInputStyles = (props?: StylingProps) => {
  const colors = createColors(props);
  return {
    label: {
      color: colors.shades.dark,
    },
    border: {
      color: colors.shades.veryLight,
    },
    placeholder: {
      color: colors.shades.mediumDark,
    },
  };
};
