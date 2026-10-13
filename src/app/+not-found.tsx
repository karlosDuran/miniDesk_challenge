import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Screen, Button } from '@/components/ui';
import { router } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <Screen edges={['top', 'bottom', 'left', 'right']}>
      <View style={styles.container}>
        <Text variant="titleMedium">404 - Pantalla no encontrada</Text>
        <Button
          title="Volver al inicio"
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
  button: {
    marginTop: 16,
  },
});
