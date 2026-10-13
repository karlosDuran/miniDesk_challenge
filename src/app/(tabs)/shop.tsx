import React, { useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ListRenderItem,
} from 'react-native';
import { Screen, ErrorState, Text } from '@/components/ui';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { useProducts } from '@/features/products/hooks/useProducts';
import { ProductCard } from '@/features/products/components/ProductCard';
import { ProductSkeletonGrid } from '@/features/products/components/ProductSkeletonGrid';
import { Product } from '@/api/types';
import { getErrorMessageKey } from '@/api/errors';
import { colors, spacing } from '@/theme';

export default function ShopScreen() {
  const { t } = useTranslation();
  const { data: products, isLoading, isError, error, refetch, isRefetching } = useProducts();

  const handleProductPress = useCallback((product: Product) => {
    router.push({
      pathname: '/products/[id]',
      params: { id: String(product.id) },
    });
  }, []);

  const renderItem: ListRenderItem<Product> = useCallback(
    ({ item }) => <ProductCard product={item} onPress={handleProductPress} />,
    [handleProductPress],
  );

  const keyExtractor = useCallback((item: Product) => String(item.id), []);

  return (
    <Screen>
      <View style={styles.header}>
        <Text variant="titleMedium">{t('shop.title')}</Text>
        <Text variant="bodySmall" color={colors.textSecondary}>
          {products ? t('shop.itemCount', { count: products.length }) : ''}
        </Text>
      </View>

      {isLoading && <ProductSkeletonGrid />}

      {isError && !products && (
        <ErrorState
          title={t('errors.unknown')}
          message={t(getErrorMessageKey(error))}
          onRetry={() => refetch()}
          retryText={t('shop.retry')}
        />
      )}

      {products && (
        <FlatList
          data={products}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  listContent: {
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.xxxl,
  },
});
