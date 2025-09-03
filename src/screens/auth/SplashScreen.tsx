import React from 'react';
import { View, Text } from 'react-native';

export const SplashScreen: React.FC = () => {
  return (
    <View className="flex-1 bg-brand-dark-green justify-center items-center">
      <Text className="text-white text-3xl font-bold mb-5 font-zen-bold">
        VR Doctor
      </Text>
      <Text className="text-white text-base opacity-80 font-zen">
        Loading...
      </Text>
    </View>
  );
};
