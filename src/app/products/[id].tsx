import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Text, Screen, Button } from '@/components/ui';
import { useTranslation } from 'react-i18next';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();

  return (
    <Screen edges={['top', 'bottom', 'left', 'right']}>
      <View style={styles.container}>
        <Text variant="titleMedium">{t('nav.productDetail')}</Text>
        <Text variant="bodyLarge" style={styles.idText}>
          ID Producto: {id}
        </Text>
        <Button
          title={t('product.backToCatalog')}
          variant="outline"
          onPress={() => router.back()}
          style={styles.backButton}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  idText: {
    marginVertical: 16,
  },
  backButton: {
    marginTop: 12,
  },
});
