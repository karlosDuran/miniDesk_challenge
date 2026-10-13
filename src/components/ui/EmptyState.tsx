import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Text } from './Text';
import { Button } from './Button';
import { colors, radius, spacing } from '@/theme';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionTitle?: string;
  onAction?: () => void;
  style?: ViewStyle;
}

export function EmptyState({
  icon = '🛒',
  title,
  description,
  actionTitle,
  onAction,
  style,
}: EmptyStateProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <Text variant="titleSmall" align="center" style={styles.title}>
        {title}
      </Text>
      {description && (
        <Text
          variant="bodyMedium"
          color={colors.textSecondary}
          align="center"
          style={styles.description}
        >
          {description}
        </Text>
      )}
      {actionTitle && onAction && (
        <Button
          title={actionTitle}
          variant="secondary"
          size="md"
          onPress={onAction}
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
    width: 72,
    height: 72,
    borderRadius: radius.full,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  icon: {
    fontSize: 32,
  },
  title: {
    marginBottom: spacing.xs,
  },
  description: {
    marginBottom: spacing.lg,
    maxWidth: 260,
  },
  button: {
    minWidth: 160,
  },
});
