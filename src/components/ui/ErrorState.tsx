import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Text } from './Text';
import { Button } from './Button';
import { colors, radius, spacing } from '@/theme';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryText?: string;
  style?: ViewStyle;
}

export function ErrorState({
  title = 'Ha ocurrido un problema',
  message,
  onRetry,
  retryText = 'Reintentar',
  style,
}: ErrorStateProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>⚠️</Text>
      </View>
      <Text variant="titleSmall" align="center" style={styles.title}>
        {title}
      </Text>
      <Text
        variant="bodyMedium"
        color={colors.textSecondary}
        align="center"
        style={styles.message}
      >
        {message}
      </Text>
      {onRetry && (
        <Button
          title={retryText}
          variant="primary"
          size="md"
          onPress={onRetry}
          style={styles.button}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    backgroundColor: colors.errorLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  icon: {
    fontSize: 28,
  },
  title: {
    marginBottom: spacing.xs,
  },
  message: {
    marginBottom: spacing.lg,
    maxWidth: 280,
  },
  button: {
    minWidth: 140,
  },
});
