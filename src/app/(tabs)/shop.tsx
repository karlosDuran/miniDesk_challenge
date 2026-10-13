import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Screen } from '@/components/ui';
import { useTranslation } from 'react-i18next';

export default function ShopScreen() {
  const { t } = useTranslation();

  return (
    <Screen>
      <View style={styles.container}>
        <Text variant="titleMedium">{t('shop.title')}</Text>
        <Text variant="bodyMedium" color="#6B7280" style={styles.subtitle}>
          Catálogo de productos (Fase 1)
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  subtitle: {
    marginTop: 8,
  },
});
