import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Screen, Button } from '@/components/ui';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';

export default function SuccessScreen() {
  const { t } = useTranslation();

  return (
    <Screen edges={['top', 'bottom', 'left', 'right']}>
      <View style={styles.container}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>🎉</Text>
        </View>
        <Text variant="titleMedium" align="center" style={styles.title}>
          {t('success.title')}
        </Text>
        <Text variant="bodyMedium" color="#6B7280" align="center" style={styles.subtitle}>
          {t('success.subtitle')}
        </Text>
        <Button
          title={t('success.backToCatalog')}
          onPress={() => router.replace('/(tabs)/shop')}
          style={styles.button}
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
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 36,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 32,
    maxWidth: 280,
  },
  button: {
    width: '100%',
  },
});
