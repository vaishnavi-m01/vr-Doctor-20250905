import React from 'react';
import { View, Text } from 'react-native';

export const SplashScreen: React.FC = () => {
  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: '#0e4336', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <Text style={{ 
        color: 'white', 
        fontSize: 32, 
        fontWeight: 'bold',
        marginBottom: 20
      }}>
        VR Doctor
      </Text>
      <Text style={{ 
        color: 'white', 
        fontSize: 16, 
        opacity: 0.8
      }}>
        Loading...
      </Text>
    </View>
  );
};
