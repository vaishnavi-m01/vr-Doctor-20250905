import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/types';
import { Feather } from '@expo/vector-icons';
import { HomeIcon, UserGroupIcon, ChartPieIcon } from 'react-native-heroicons/outline';

type BottomDockProps = {
  activeScreen: keyof RootStackParamList;
};

export default function BottomDock({ activeScreen }: BottomDockProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  type DockItemProps = {
    label: string;
    active: boolean;
    screenName: keyof RootStackParamList;
    IconComponent: React.ComponentType<{ color: string; size: number }>;
  };

  const Item = ({ label, active, screenName, IconComponent }: DockItemProps) => (
    <Pressable
      className={`flex-1 items-center gap-1 px-3 py-2 relative ${active ? 'opacity-100' : 'opacity-80'}`}
      onPress={() => navigation.navigate(screenName)}
      accessible={true}
      accessibilityLabel={`${label} tab`}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
    >
      <IconComponent size={24} color={active ? 'white' : '#FFFFFFB3'} />
      <Text className={`text-xs font-zen-medium ${active ? 'text-white' : 'text-white/80'}`}>
        {label}
      </Text>
      {active && (
        <View className="absolute bottom-0 w-16 h-1 bg-[#0ea06c] rounded-full" />
      )}
    </Pressable>
  );

  return (
    <View className="absolute bottom-4 w-full px-4">
      <View className="relative bg-brand-dark-green rounded-3xl shadow-2xl flex-row items-center px-2 py-1 w-full max-w-[600px] mx-auto">
        <Item
          label="HOME"
          screenName="Home"
          active={activeScreen === 'Home'}
          IconComponent={HomeIcon}
        />
        <Item
          label="PARTICIPANTS"
          screenName="Participants"
          active={activeScreen === 'Participants'}
          IconComponent={UserGroupIcon}
        />
        <Item
          label="REPORTS"
          screenName="Reports"
          active={activeScreen === 'Reports'}
          IconComponent={ChartPieIcon}
        />

        {/* Profile Button */}
        <Pressable
          className="absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-2 border-[#0ea06c] items-center justify-center shadow-xl"
          onPress={() => navigation.navigate('Profile')}
          accessible={true}
          accessibilityLabel="Profile and settings"
          accessibilityRole="button"
          accessibilityHint="Navigate to profile and settings"
        >
          <Text className="text-2xl">👤</Text>
        </Pressable>

        {/* Floating Button */}
        <Pressable
          className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-brand-accent-green items-center justify-center shadow-xl"
          onPress={() => {
            // Navigate to SocioDemographic form
            navigation.navigate('SocioDemographic', { patientId: 1 });
          }}
          accessible={true}
          accessibilityLabel="Add new participant"
          accessibilityRole="button"
          accessibilityHint="Navigate to create new participant form"
        >
          <Feather name="plus" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  );
}
 