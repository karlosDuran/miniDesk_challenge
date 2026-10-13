import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Skeleton } from '@/components/ui';
import { colors, radius, spacing } from '@/theme';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - spacing.md * 3) / 2;

export function ProductSkeletonGrid() {
  const dummyItems = Array.from({ length: 6 }, (_, i) => i);

  return (
    <View style={styles.grid}>
      {dummyItems.map((key) => (
        <View key={key} style={styles.card}>
          <Skeleton width="100%" height={140} borderRadius={radius.md} />
          <View style={styles.body}>
            <Skeleton width="50%" height={10} style={styles.category} />
            <Skeleton width="90%" height={14} style={styles.titleLine} />
            <Skeleton width="70%" height={14} style={styles.titleLine} />
            <View style={styles.footer}>
              <Skeleton width="45%" height={16} />
              <Skeleton width="35%" height={26} borderRadius={radius.sm} />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  card: {
    width: ITEM_WIDTH,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.sm,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  body: {
    paddingTop: spacing.sm,
  },
  category: {
    marginBottom: spacing.xs,
  },
  titleLine: {
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
});
