import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Expo 기본 아이콘

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#007AFF' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '경기',
          tabBarIcon: ({ color }) => <Ionicons name="baseball" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="standings"
        options={{
          title: '순위',
          tabBarIcon: ({ color }) => <Ionicons name="list" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}