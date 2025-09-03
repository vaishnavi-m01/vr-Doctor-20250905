import React, { useEffect, useRef } from 'react';
import { Pressable, Text, View, Platform, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/types';
import { Feather } from '@expo/vector-icons';

type BottomDockProps = {
  activeScreen: keyof RootStackParamList;
};

export default function BottomDock({ activeScreen }: BottomDockProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Calculate the position for the animated line based on active screen
  const getActiveTabIndex = () => {
    switch (activeScreen) {
      case 'Home': return 0;
      case 'Participants': return 1;
      case 'Reports': return 2;
      default: return 0;
    }
  };

  // Animate the line position when active screen changes
  useEffect(() => {
    const targetPosition = getActiveTabIndex();
    Animated.spring(animatedValue, {
      toValue: targetPosition,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
  }, [activeScreen, animatedValue]);

  type DockItemProps = {
    label: string;
    active: boolean;
    screenName: keyof RootStackParamList;
    iconName: string;
    index: number;
  };

  const Item = ({ label, active, screenName, iconName, index }: DockItemProps) => (
    <Pressable
      className="flex-1 items-center justify-center py-3 relative"
      onPress={() => navigation.navigate(screenName)}
      accessible={true}
      accessibilityLabel={`${label} tab`}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
    >
      <View className="flex-row items-center gap-2">
        <Feather
          name={iconName as any}
          size={20}
          color={active ? '#fff' : 'rgba(255,255,255,0.7)'}
        />
        <Text
          style={{
            color: active ? '#fff' : 'rgba(255,255,255,0.7)',
            fontWeight: active ? '700' : '500',
            letterSpacing: 0.5,
            fontSize: 12,
            textTransform: 'uppercase',
          }}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View className="absolute bottom-4 w-full items-center z-50">
      <View className="w-[94%] max-w-[600px] bg-brand-dark-green rounded-3xl flex-row items-center justify-center py-3 px-4 shadow-xl relative overflow-hidden">
        {/* Animated Bottom Line */}
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '33.33%',
            height: 4,
            backgroundColor: '#4FC264',
            borderRadius: 2,
            transform: [{
              translateX: animatedValue.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [0, '33.33%', '66.66%'],
              })
            }],
            zIndex: 10,
          }}
        />

        {/* Profile Floating Button */}
        <View className="absolute -left-8 top-1/2 -mt-7 z-10">
          <View className="w-14 h-14 rounded-full bg-white items-center justify-center shadow-lg">
            <Pressable
              className="w-12 h-12 rounded-full bg-brand-accent-green items-center justify-center border-2 border-white"
              onPress={() => navigation.navigate('Profile')}
              accessible={true}
              accessibilityLabel="Profile and settings"
              accessibilityRole="button"
            >
              <Feather name="user" size={24} color="#fff" />
            </Pressable>
          </View>
        </View>

        {/* Tab Items */}
        <Item 
          label="HOME" 
          screenName="Home" 
          active={activeScreen === 'Home'} 
          iconName="home" 
          index={0}
        />
        <Item 
          label="PATIENTS" 
          screenName="Participants" 
          active={activeScreen === 'Participants'} 
          iconName="users" 
          index={1}
        />
        <Item 
          label="REPORTS" 
          screenName="Reports" 
          active={activeScreen === 'Reports'} 
          iconName="file-text" 
          index={2}
        />

        {/* Floating Plus Button */}
        <View className="absolute -right-8 top-1/2 -mt-7 z-10">
          <View className="w-14 h-14 rounded-full bg-white items-center justify-center shadow-lg">
            <Pressable
              className="w-12 h-12 rounded-full bg-brand-accent-green items-center justify-center border-2 border-white"
              onPress={() =>
                navigation.navigate('SocioDemographic', {
                  // patientId: Date.now(),
                  // age: age
                })
              }
              accessible={true}
              accessibilityLabel="Add new participant"
              accessibilityRole="button"
            >
              <Feather name="plus" size={26} color="#fff" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}