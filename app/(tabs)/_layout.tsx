import { Tabs } from 'expo-router';
import { Clock, FileText, Home, Ticket } from 'lucide-react-native';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF',
          borderTopColor: colorScheme === 'dark' ? '#374151' : '#E5E7EB',
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size || 24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="bus_times"
        options={{
          title: 'Bus Times',
          tabBarIcon: ({ color, size }) => <Clock size={size || 24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="myTickets"
        options={{
          title: 'My Tickets',
          tabBarIcon: ({ color, size }) => <Ticket size={size || 24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="complaints"
        options={{
          title: 'Support',
          tabBarIcon: ({ color, size }) => <FileText size={size || 24} color={color} />,
        }}
      />
      {/* Hidden screens - not shown in tab bar */}
      <Tabs.Screen
        name="bookings"
        options={{
          href: null, // This hides it from the tab bar
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          href: null, // This hides it from the tab bar
        }}
      />
      <Tabs.Screen
        name="TicketSuccess"
        options={{
          href: null, // This hides it from the tab bar
        }}
      />
    </Tabs>
  );
}
