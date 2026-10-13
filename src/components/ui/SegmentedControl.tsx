import React from 'react';
import { StyleSheet, View, Pressable, ViewStyle } from 'react-native';
import { Text } from './Text';
import { colors, radius, spacing } from '@/theme';

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  style?: ViewStyle;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  style,
}: SegmentedControlProps<T>) {
  return (
    <View style={[styles.container, style]}>
      {options.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            style={[styles.segment, isSelected && styles.selectedSegment]}
          >
            <Text
              variant="bodySmall"
              color={isSelected ? colors.primary : colors.textSecondary}
              style={[styles.label, isSelected && styles.selectedLabel]}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.borderLight,
    padding: spacing.xs,
    borderRadius: radius.md,
  },
  segment: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm,
  },
  selectedSegment: {
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    fontWeight: '500',
  },
  selectedLabel: {
    fontWeight: '700',
  },
});
