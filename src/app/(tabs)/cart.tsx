import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Screen, EmptyState } from '@/components/ui';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';

export default function CartScreen() {
  const { t } = useTranslation();

  return (
    <Screen>
      <View style={styles.container}>
        <Text variant="titleMedium" style={styles.headerTitle}>
          {t('cart.title')}
        </Text>
        <EmptyState
          icon="🛒"
          title={t('cart.emptyTitle')}
          description={t('cart.emptyDescription')}
          actionTitle={t('cart.exploreProducts')}
          onAction={() => router.navigate('/(tabs)/shop')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerTitle: {
    marginBottom: 16,
  },
});
