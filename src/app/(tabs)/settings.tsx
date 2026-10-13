import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Screen, SegmentedControl } from '@/components/ui';
import { useTranslation } from 'react-i18next';
import { colors } from '@/theme';

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lang: 'es' | 'en') => {
    void i18n.changeLanguage(lang);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text variant="titleMedium" style={styles.headerTitle}>
          {t('settings.title')}
        </Text>

        <View style={styles.section}>
          <Text variant="titleSmall" style={styles.sectionTitle}>
            {t('settings.language')}
          </Text>
          <SegmentedControl<'es' | 'en'>
            value={i18n.language.startsWith('es') ? 'es' : 'en'}
            options={[
              { value: 'es', label: 'Español' },
              { value: 'en', label: 'English' },
            ]}
            onChange={handleLanguageChange}
          />
        </View>

        <View style={styles.section}>
          <Text variant="titleSmall" style={styles.sectionTitle}>
            {t('settings.currency')}
          </Text>
          <SegmentedControl<'USD' | 'MXN'>
            value="USD"
            options={[
              { value: 'USD', label: 'USD ($)' },
              { value: 'MXN', label: 'MXN ($)' },
            ]}
            onChange={() => {}}
          />
        </View>

        <View style={styles.footer}>
          <Text variant="bodySmall" color={colors.textMuted}>
            {t('settings.version')}: 1.0.0
          </Text>
        </View>
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
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingVertical: 16,
  },
});
