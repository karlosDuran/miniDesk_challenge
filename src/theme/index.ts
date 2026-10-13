export const colors = {
  primary: '#4F46E5', // Índigo vibrante
  primaryDark: '#4338CA',
  primaryLight: '#EEF2FF',
  background: '#F9FAFB',
  surface: '#FFFFFF',
  text: '#111827',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  success: '#10B981',
  successLight: '#D1FAE5',
  warning: '#F59E0B',
  rating: '#FBBF24',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
} as const;

export const typography = {
  titleLarge: { fontSize: 26, fontWeight: '700' as const, lineHeight: 32 },
  titleMedium: { fontSize: 20, fontWeight: '700' as const, lineHeight: 26 },
  titleSmall: { fontSize: 16, fontWeight: '600' as const, lineHeight: 22 },
  bodyLarge: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
  bodyMedium: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
  bodySmall: { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },
  caption: { fontSize: 11, fontWeight: '500' as const, lineHeight: 14 },
  button: { fontSize: 15, fontWeight: '600' as const },
} as const;
