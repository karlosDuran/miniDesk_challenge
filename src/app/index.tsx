import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Text, Button } from '@/components/ui';
import { colors, spacing, radius } from '@/theme';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';

const HERO_IMAGE_URL =
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80';

export default function WelcomeScreen() {
  const { t } = useTranslation();

  const handleEnterStore = () => {
    // replace para que al pulsar 'atrás' en Android no regrese a la pantalla de bienvenida
    router.replace('/(tabs)/shop');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: HERO_IMAGE_URL }}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        priority="high"
      />
      <View style={[StyleSheet.absoluteFill, styles.overlay]} />

      <View style={styles.content}>
        <View style={styles.badge}>
          <Text variant="caption" color={colors.primary} style={styles.badgeText}>
            FAKE STORE
          </Text>
        </View>

        <Text variant="titleLarge" color="#FFFFFF" style={styles.title}>
          {t('welcome.title')}
        </Text>

        <Text variant="bodyLarge" color="#D1D5DB" style={styles.subtitle}>
          {t('welcome.subtitle')}
        </Text>

        <Button
          title={t('welcome.cta')}
          size="lg"
          variant="primary"
          onPress={handleEnterStore}
          style={styles.ctaButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  overlay: {
    backgroundColor: 'rgba(15, 23, 42, 0.72)',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.xl,
    paddingBottom: spacing.xxxl + 16,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    marginBottom: spacing.md,
  },
  badgeText: {
    fontWeight: '700',
    letterSpacing: 1,
  },
  title: {
    marginBottom: spacing.sm,
    fontSize: 32,
    lineHeight: 38,
  },
  subtitle: {
    marginBottom: spacing.xxl,
    lineHeight: 24,
  },
  ctaButton: {
    width: '100%',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
});
