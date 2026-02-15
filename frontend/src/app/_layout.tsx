import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* (tabs) 폴더 안의 레이아웃을 불러옵니다. 헤더는 숨깁니다. */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}