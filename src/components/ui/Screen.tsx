import React from 'react';
import { StyleSheet, View, ViewStyle, StatusBar } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { colors } from '@/theme';

interface ScreenProps {
  children: React.ReactNode;
  style?: ViewStyle;
  edges?: Edge[];
  backgroundColor?: string;
}

export function Screen({
  children,
  style,
  edges = ['top', 'left', 'right'],
  backgroundColor = colors.background,
}: ScreenProps) {
  return (
    <SafeAreaView edges={edges} style={[styles.safeArea, { backgroundColor }]}>
      <StatusBar barStyle="dark-content" backgroundColor={backgroundColor} />
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
