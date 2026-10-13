import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Text } from '@/components/ui';
import { colors, radius, spacing } from '@/theme';
import { Product } from '@/api/types';
import { useTranslation } from 'react-i18next';
import { useFormatPrice } from '@/features/preferences/hooks/useFormatPrice';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

export const ProductCard = React.memo(function ProductCard({
  product,
  onPress,
}: ProductCardProps) {
  const { t } = useTranslation();
  const { formatPrice } = useFormatPrice();

  // Traduce la categoría si existe en los recursos i18n
  const translatedCategory = t(
    `categories.${product.category}` as unknown as 'categories.electronics',
    { defaultValue: product.category },
  );

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => onPress(product)}
      accessibilityRole="button"
      accessibilityLabel={`${product.title}, ${formatPrice(product.price)}`}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          contentFit="contain"
          transition={200}
        />
        <View style={styles.ratingBadge}>
          <Text variant="caption" style={styles.ratingText}>
            ★ {product.rating.rate.toFixed(1)}
          </Text>
        </View>
      </View>

      <View style={styles.info}>
        <Text
          variant="caption"
          color={colors.textMuted}
          numberOfLines={1}
          style={styles.category}
        >
          {translatedCategory.toUpperCase()}
        </Text>

        <Text
          variant="bodySmall"
          color={colors.text}
          numberOfLines={2}
          style={styles.title}
        >
          {product.title}
        </Text>

        <View style={styles.priceRow}>
          <Text variant="titleSmall" color={colors.primary}>
            {formatPrice(product.price)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.sm,
    margin: spacing.xs,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  imageContainer: {
    width: '100%',
    height: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '90%',
    height: '90%',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.xs,
  },
  ratingText: {
    color: '#D97706',
    fontWeight: '700',
  },
  info: {
    paddingTop: spacing.xs + 2,
  },
  category: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  title: {
    fontWeight: '600',
    height: 32,
    lineHeight: 16,
    marginBottom: spacing.xs,
  },
  priceRow: {
    marginTop: 2,
  },
});
