import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Screen, Button } from '@/components/ui';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';

export default function CheckoutScreen() {
  const { t } = useTranslation();

  return (
    <Screen edges={['top', 'bottom', 'left', 'right']}>
      <View style={styles.container}>
        <Text variant="titleMedium">{t('checkout.title')}</Text>
        <Text variant="bodyMedium" color="#6B7280" style={styles.notice}>
          {t('checkout.mockNotice')}
        </Text>
        <Button
          title={t('checkout.confirmPayment')}
          onPress={() => router.replace('/success')}
          style={styles.button}
        />
        <Button
          title="Regresar"
          variant="ghost"
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
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notice: {
    marginVertical: 16,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    marginTop: 16,
  },
  backButton: {
    marginTop: 8,
  },
});
