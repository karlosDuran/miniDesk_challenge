import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
} from 'react-native';
import { colors, typography } from '@/theme';

type TypographyVariant = keyof typeof typography;

export interface TextProps extends RNTextProps {
  variant?: TypographyVariant;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export function Text({
  children,
  variant = 'bodyMedium',
  color = colors.text,
  align = 'left',
  style,
  ...props
}: TextProps) {
  const typoStyle = typography[variant];

  return (
    <RNText
      style={[typoStyle, { color, textAlign: align }, style]}
      {...props}
    >
      {children}
    </RNText>
  );
}
