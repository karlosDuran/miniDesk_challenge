import React from 'react';
import {
  Pressable,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  PressableProps,
} from 'react-native';
import { Text } from './Text';
import { colors, radius, spacing } from '@/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
  onPress,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const getContainerStyle = (pressed: boolean): ViewStyle => {
    let base: ViewStyle = { ...styles.base, ...sizeStyles[size] };

    switch (variant) {
      case 'primary':
        base = {
          ...base,
          backgroundColor: isDisabled
            ? colors.border
            : pressed
              ? colors.primaryDark
              : colors.primary,
        };
        break;
      case 'secondary':
        base = {
          ...base,
          backgroundColor: isDisabled
            ? colors.borderLight
            : pressed
              ? '#E0E7FF'
              : colors.primaryLight,
        };
        break;
      case 'outline':
        base = {
          ...base,
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: isDisabled ? colors.border : colors.primary,
        };
        break;
      case 'ghost':
        base = {
          ...base,
          backgroundColor: pressed ? colors.borderLight : 'transparent',
        };
        break;
    }

    return base;
  };

  const getTextColor = (): string => {
    if (disabled) return colors.textMuted;
    switch (variant) {
      case 'primary':
        return '#FFFFFF';
      case 'secondary':
      case 'outline':
      case 'ghost':
        return colors.primary;
    }
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [getContainerStyle(pressed), style]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? '#FFFFFF' : colors.primary}
        />
      ) : (
        <>
          {icon}
          <Text
            variant={size === 'sm' ? 'bodySmall' : 'button'}
            style={[
              styles.text,
              { color: getTextColor(), marginLeft: icon ? spacing.xs : 0 },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
  },
  text: {
    fontWeight: '600',
  },
});

const sizeStyles: Record<ButtonSize, ViewStyle> = {
  sm: {
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    minHeight: 36,
  },
  md: {
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.lg,
    minHeight: 46,
  },
  lg: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    minHeight: 52,
  },
};
