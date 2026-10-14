import React, { useCallback } from 'react';
import { View, StyleSheet, Pressable, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui';
import { colors, radius, spacing } from '@/theme';
import { CartProduct } from '../types';
import { useCartItemQuantity, useCartActions } from '../hooks/useCart';
import { useTranslation } from 'react-i18next';

export interface QuantityStepperProps {
  product: CartProduct;
  size?: 'sm' | 'md';
}

const triggerHaptic = () => {
  if (Platform.OS !== 'web') {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  }
};

export const QuantityStepper = React.memo(function QuantityStepper({
  product,
  size = 'sm',
}: QuantityStepperProps) {
  const { t } = useTranslation();
  const quantity = useCartItemQuantity(product.id);
  const { increment, decrement } = useCartActions();

  const handleIncrement = useCallback(() => {
    triggerHaptic();
    increment(product);
  }, [increment, product]);

  const handleDecrement = useCallback(() => {
    triggerHaptic();
    decrement(product.id);
  }, [decrement, product.id]);

  const isMd = size === 'md';

  // Si la cantidad es 0:
  if (quantity === 0) {
    if (isMd) {
      return (
        <Pressable
          style={({ pressed }) => [styles.addButtonMd, pressed && styles.pressed]}
          onPress={handleIncrement}
          accessibilityRole="button"
          accessibilityLabel={`${t('product.addToCart')}: ${product.title}`}
        >
          <Ionicons name="cart-outline" size={18} color="#FFFFFF" style={styles.addIcon} />
          <Text variant="button" color="#FFFFFF">
            {t('product.addToCart')}
          </Text>
        </Pressable>
      );
    }

    return (
      <Pressable
        style={({ pressed }) => [styles.addButtonSm, pressed && styles.pressed]}
        onPress={handleIncrement}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        accessibilityRole="button"
        accessibilityLabel={`${t('product.addToCart')}: ${product.title}`}
      >
        <Ionicons name="add" size={16} color={colors.primary} />
        <Text variant="caption" color={colors.primary} style={styles.addTextSm}>
          {t('product.addToCart')}
        </Text>
      </Pressable>
    );
  }

  // Si la cantidad es > 0, mostramos el stepper [ − ] [ cantidad ] [ + ]
  return (
    <View style={[styles.stepperContainer, isMd ? styles.stepperMd : styles.stepperSm]}>
      <Pressable
        style={({ pressed }) => [
          styles.stepButton,
          isMd ? styles.stepButtonMd : styles.stepButtonSm,
          pressed && styles.pressed,
        ]}
        onPress={handleDecrement}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        accessibilityRole="button"
        accessibilityLabel={`Reducir cantidad de ${product.title}`}
      >
        <Ionicons
          name={quantity === 1 ? 'trash-outline' : 'remove'}
          size={isMd ? 18 : 14}
          color={quantity === 1 ? colors.error : colors.text}
        />
      </Pressable>

      <View style={styles.quantityWrapper}>
        <Text
          variant={isMd ? 'titleSmall' : 'bodySmall'}
          color={colors.text}
          style={styles.quantityText}
        >
          {quantity}
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.stepButton,
          isMd ? styles.stepButtonMd : styles.stepButtonSm,
          pressed && styles.pressed,
        ]}
        onPress={handleIncrement}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        accessibilityRole="button"
        accessibilityLabel={`Aumentar cantidad de ${product.title}`}
      >
        <Ionicons name="add" size={isMd ? 18 : 14} color={colors.primary} />
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  addButtonSm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  addTextSm: {
    fontWeight: '700',
    marginLeft: 2,
    fontSize: 11,
  },
  addButtonMd: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    minHeight: 48,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addIcon: {
    marginRight: spacing.xs,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.borderLight,
    borderRadius: radius.full,
  },
  stepperSm: {
    padding: 2,
  },
  stepperMd: {
    padding: 4,
    borderRadius: radius.md,
  },
  stepButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1,
    elevation: 1,
  },
  stepButtonSm: {
    width: 24,
    height: 24,
  },
  stepButtonMd: {
    width: 38,
    height: 38,
  },
  quantityWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
    minWidth: 26,
  },
  quantityText: {
    fontWeight: '700',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
});
